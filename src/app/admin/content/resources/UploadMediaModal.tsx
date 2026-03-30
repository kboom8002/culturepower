"use client"

import { useState } from "react"
import { Plus, Loader2, X, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadMediaAssetDb } from "@/lib/actions/content"
import { useRouter } from "next/navigation"
import { ImageUploader } from "@/components/domain/publishing/ImageUploader"

export function UploadMediaModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [altText, setAltText] = useState("")
  const [url, setUrl] = useState<string | null>(null)
  const [assetTypeSlug, setAssetTypeSlug] = useState("inline")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return alert("먼저 파일을 업로드하여 URL을 생성해야 합니다.")
    if (!title) return alert("파일 식별용 제목을 입력해주세요.")
    
    setIsSubmitting(true)
    
    const payload = {
      title,
      alt_text: altText,
      public_url: url,
      asset_type_slug: assetTypeSlug
    }
    
    const res = await uploadMediaAssetDb(payload)
    setIsSubmitting(false)
    if (res.success) {
      alert("미디어 라이브러리에 등록되었습니다.")
      setIsOpen(false)
      setTitle("")
      setAltText("")
      setUrl(null)
      router.refresh()
    } else {
      alert("적용 실패: " + res.error)
    }
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
         <Plus className="w-4 h-4 mr-1" /> 미디어 에셋 업로드
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-line-soft">
              <h2 className="font-bold text-lg text-neutral-900">새 미디어 에셋 라이브러리 등록</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-700 block">파일 업로드 (Storage 로드)</label>
                  <ImageUploader 
                     value={url} 
                     onChange={setUrl} 
                     bucket="curation_assets" 
                     className="w-full" 
                  />
                  <span className="text-xs text-brand-600 mt-1">※ PDF 업로드도 가능합니다. (아이콘으로 표시됨)</span>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-neutral-700">에셋 구분 (Asset Type)</label>
                <select 
                  className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500 appearance-none bg-white"
                  value={assetTypeSlug}
                  onChange={(e) => setAssetTypeSlug(e.target.value)}
                >
                  <option value="inline">기사 본문 삽입용 (Inline Image)</option>
                  <option value="cover">대표 썸네일 (Cover Image)</option>
                  <option value="portrait">전문가 프로필 (Portrait Image)</option>
                  <option value="pdf">다운로드 문서 (PDF)</option>
                </select>
              </div>
                  
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-neutral-700">파일 관리 제목 (Title)</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="예: 2024 한국문화예술 연차보고서 표지"
                  className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
                  required 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-neutral-700">대체 텍스트 (Alt Text) 옵션</label>
                <input 
                  type="text" 
                  value={altText} 
                  onChange={e => setAltText(e.target.value)} 
                  placeholder="이미지인 경우 시각장애인을 위한 설명"
                  className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-line-soft">
                <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>취소</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting || !url}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "라이브러리에 등록하기"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
