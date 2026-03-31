"use client"

import { useState } from "react"
import { UploadCloud, Image as ImageIcon, Loader2, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function ImageUploader({ 
  value, 
  onChange, 
  bucket = "curation_assets",
  className = "",
  compact = false,
  aspectRatio = "aspect-[2/1]",
  rounded = "rounded-xl"
}: { 
  value: string | null
  onChange: (url: string | null) => void
  bucket?: string
  className?: string
  compact?: boolean
  aspectRatio?: string
  rounded?: string
}) {
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return
      setIsUploading(true)
      
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onChange(data.publicUrl)
    } catch (error: any) {
      alert(`이미지 업로드 실패: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {value ? (
        <div className={`relative w-full ${aspectRatio} ${rounded} bg-neutral-100 overflow-hidden border border-line-default group`}>
          <img src={value} alt="Uploaded" className="object-cover w-full h-full" />
          
          {/* Always visible or easily discoverable hover overlay for replacement */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
               type="button"
               onClick={(e) => { e.preventDefault(); onChange(null); }}
               className="bg-white/90 hover:bg-white text-neutral-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
             >
               <UploadCloud className="w-4 h-4" />
               이미지 교체 / 삭제
             </button>
          </div>
        </div>
      ) : (
        <label className={`w-full ${aspectRatio} ${rounded} border-2 border-dashed border-line-strong hover:border-brand-500 flex flex-col items-center justify-center cursor-pointer bg-neutral-50 hover:bg-brand-50/30 transition-colors group overflow-hidden px-2 text-center`}>
          {isUploading ? (
            <div className="flex flex-col items-center text-brand-500">
              <Loader2 className={`${compact ? 'w-5 h-5 mb-1' : 'w-8 h-8 mb-2'} animate-spin`} />
              <span className={`${compact ? 'text-[10px]' : 'text-sm'} font-semibold`}>업로드 중...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-neutral-400 group-hover:text-brand-500 transition-colors">
              <UploadCloud className={`${compact ? 'w-6 h-6 mb-1' : 'w-8 h-8 mb-2'}`} />
              <span className={`${compact ? 'text-[11px] leading-tight' : 'text-sm mb-1'} font-semibold break-keep`}>{compact ? '클릭해 업로드' : '여기를 클릭하여 이미지 업로드'}</span>
              {!compact && <span className="text-xs text-neutral-500">권장 비율 2:1 (JPG, PNG)</span>}
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  )
}
