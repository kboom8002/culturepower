"use client"

import { useState, useRef } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { UploadCloud, X, Loader2, ImagePlus } from "lucide-react"

type ImageMeta = {
  url: string
  width: number
  height: number
  filename: string
  size: number
}

type Props = {
  value?: ImageMeta[]
  onChange: (images: ImageMeta[]) => void
  bucket?: string
  maxFiles?: number
}

export function MultiImageUploader({ value = [], onChange, bucket = "curation_assets", maxFiles = 50 }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Compress and resize image
  const optimizeImage = (file: File): Promise<{ blob: Blob, width: number, height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const MAX_WIDTH = 1200 // Max display width
          let width = img.width
          let height = img.height

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width)
            width = MAX_WIDTH
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          if (!ctx) return reject(new Error("No canvas context"))
          
          ctx.drawImage(img, 0, 0, width, height)
          
          // Compressing to WebP with 0.8 quality
          canvas.toBlob((blob) => {
            if (blob) resolve({ blob, width, height })
            else reject(new Error("Canvas toBlob failed"))
          }, "image/webp", 0.8)
        }
        img.onerror = reject
      }
      reader.onerror = reject
    })
  }

  const uploadFiles = async (files: File[]) => {
    if (value.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}장까지만 업로드 가능합니다.`)
      return
    }

    setIsUploading(true)
    const newImages: ImageMeta[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue

      try {
        const { blob, width, height } = await optimizeImage(file)
        const fileExt = "webp"
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
        const filePath = `galleries/${fileName}` // Subfolder

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, blob, {
            contentType: 'image/webp',
            upsert: false
          })

        if (error) throw error

        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath)
        
        newImages.push({
          url: publicData.publicUrl,
          width,
          height,
          filename: file.name,
          size: blob.size
        })
      } catch (err) {
        console.error("Upload failed for", file.name, err)
      }
    }

    onChange([...value, ...newImages])
    setIsUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(Array.from(e.target.files))
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = (idxToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== idxToRemove))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Target Area */}
      <div 
        className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors ${dragActive ? 'border-brand-500 bg-brand-50/50' : 'border-line-default bg-neutral-50/30 hover:bg-neutral-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
        
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
          {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
        </div>
        
        <h4 className="font-bold text-neutral-900 mb-1">
          {isUploading ? "이미지 처리 및 업로드 중..." : "이미지를 이곳으로 드래그 앤 드롭하세요"}
        </h4>
        <p className="text-sm text-neutral-500 max-w-sm text-center">
          SVG, PNG, JPG, GIF 지원. (업로드 시 WebP 포맷으로 자동 최적화됩니다)
        </p>
        
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="mt-4 px-4 py-2 border border-line-strong rounded-lg bg-white text-sm font-semibold hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          로컬 파일 선택
        </button>
      </div>

      {/* Uploaded Gallery Preview */}
      {value.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
             <h4 className="font-bold text-sm text-neutral-700">업로드 됨 ({value.length}장)</h4>
             <span className="text-xs text-neutral-400 font-medium">드래그 앤 드롭으로 순서 변경을 추가할 수 있습니다.</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {value.map((img, idx) => (
              <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-line-soft bg-neutral-100 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.filename || `gallery-img-${idx}`} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                     type="button"
                     onClick={() => removeImage(idx)}
                     className="p-2 bg-danger-500 text-white rounded-full hover:bg-danger-600 transform scale-90 group-hover:scale-100 transition-transform"
                   >
                     <X className="w-4 h-4" />
                   </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-[10px] text-white truncate w-full text-center">{Math.round(img.size / 1024)} KB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
