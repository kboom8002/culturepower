"use client"

import { useState, useRef } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { UploadCloud, X, Loader2, FileText, Link as LinkIcon } from "lucide-react"

type Props = {
  value: string
  onChange: (url: string) => void
  bucket?: string
}

export function FileUploader({ value, onChange, bucket = "curation_assets" }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Create a unique filename retaining original extension
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`
      const filePath = `documents/${fileName}`

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: false
        })

      if (error) throw error

      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onChange(publicData.publicUrl)
    } catch (err) {
      console.error("Upload failed for", file.name, err)
      alert("파일 업로드에 실패했습니다. " + err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0])
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
      handleUpload(e.target.files[0])
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex bg-neutral-100 p-1 rounded-lg w-fit mb-2">
        <button 
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mode === 'upload' ? 'bg-white shadow-sm text-brand-600' : 'text-neutral-500 hover:text-neutral-900'}`}
        >
          직접 업로드
        </button>
        <button 
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mode === 'url' ? 'bg-white shadow-sm text-brand-600' : 'text-neutral-500 hover:text-neutral-900'}`}
        >
          URL 직접 입력
        </button>
      </div>

      {mode === 'url' ? (
        <div className="flex flex-col gap-2">
           <input 
             type="url" 
             placeholder="https://..." 
             className="w-full p-3 border rounded-xl focus:outline-none focus:border-brand-500"
             value={value} 
             onChange={e => onChange(e.target.value)}
           />
           <p className="text-xs text-neutral-500">외부 파일 저장소나 구글 드라이브 등의 링크를 직접 입력합니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {value && value.includes('supabase.co') && (
            <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-200 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                 <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                 <p className="text-sm font-bold text-brand-800 truncate">업로드된 파일</p>
                 <a href={value} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline truncate block">
                   {value.split('/').pop()}
                 </a>
              </div>
              <button 
                type="button"
                onClick={() => onChange("")}
                className="p-2 text-danger-500 hover:bg-danger-50 rounded-full transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {!value || !value.includes('supabase.co') ? (
            <div 
              className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-colors ${dragActive ? 'border-brand-500 bg-brand-50/50' : 'border-line-default bg-neutral-50/30 hover:bg-neutral-50'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.xls,.xlsx,.hwp,.pdf,.zip" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange}
              />
              
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-brand-500" /> : <UploadCloud className="w-5 h-5" />}
              </div>
              
              <h4 className="font-bold text-sm text-neutral-900 mb-1">
                {isUploading ? "파일 업로드 중..." : "문서 파일을 놓거나 클릭하여 업로드"}
              </h4>
              <p className="text-[11px] text-neutral-500 max-w-sm text-center">
                PDF, DOCX, XLSX, HWP 등 문서 파일 지원
              </p>
              
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-auto"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
