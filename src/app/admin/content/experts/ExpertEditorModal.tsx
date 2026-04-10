"use client"

import { useState, useEffect } from "react"
import { Plus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { upsertExpert, Expert } from "@/lib/actions/content"
import { useRouter } from "next/navigation"
import { ImageUploader } from "@/components/domain/publishing/ImageUploader"

export function ExpertEditorModal({ expert, children }: { expert?: Expert, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(expert?.name || "")
  const [organization, setOrganization] = useState(expert?.organization || "")
  const [role, setRole] = useState(expert?.role || "")
  const [bio, setBio] = useState(expert?.bio || "")
  const [imageUrl, setImageUrl] = useState<string | null>(expert?.profile_image_url || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden'
      // Optional: Prevent layout shift by adding padding equal to scrollbar width
      // document.body.style.paddingRight = '15px' 
    } else {
      document.body.style.overflow = 'unset'
      // document.body.style.paddingRight = '0px'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return alert("이름은 필수입니다.")
    setIsSubmitting(true)
    
    const payload = {
      name,
      organization,
      role,
      bio,
      profile_image_url: imageUrl,
      is_active: true
    }
    
    const res = await upsertExpert(expert?.id || "new", payload)
    setIsSubmitting(false)
    if (res.success) {
      alert("적용되었습니다.")
      setIsOpen(false)
      if (!expert) {
         setName("")
         setOrganization("")
         setRole("")
         setBio("")
         setImageUrl(null)
      }
      router.refresh()
    } else {
      alert("적용 실패: " + res.error)
    }
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block w-full h-full">
        {children}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-neutral-900/50 backdrop-blur-sm p-4 sm:p-6 md:p-12 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl h-fit my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 px-6 border-b border-line-soft">
              <h2 className="font-bold text-lg text-neutral-900">{expert ? '전문가 정보 수정' : '새 전문가 등록'}</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 shrink-0">
                      <label className="text-sm font-bold text-neutral-700 mb-2 block">프로필 사진</label>
                      <ImageUploader 
                         value={imageUrl} 
                         onChange={setImageUrl} 
                         bucket="curation_assets" 
                         compact={true}
                         aspectRatio="aspect-square"
                         rounded="rounded-full"
                      />
                  </div>
                  
                  <div className="flex-1 w-full flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-neutral-700">이름 (Name)</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={e => setName(e.target.value)} 
                          placeholder="예: 홍길동"
                          className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
                          required 
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-neutral-700">소속 (Organization)</label>
                        <input 
                          type="text" 
                          value={organization} 
                          onChange={e => setOrganization(e.target.value)} 
                          placeholder="예: 한국문화예술위원회"
                          className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-neutral-700">직책/역할 (Role)</label>
                        <input 
                          type="text" 
                          value={role} 
                          onChange={e => setRole(e.target.value)} 
                          placeholder="예: 연구위원"
                          className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
                        />
                      </div>
                  </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-neutral-700">약력 (Bio)</label>
                <textarea 
                  value={bio} 
                  onChange={e => setBio(e.target.value)} 
                  placeholder="짧은 약력 소개..."
                  rows={4}
                  className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500 resize-none text-sm leading-relaxed"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-line-soft">
                <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>취소</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "적용하기"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
