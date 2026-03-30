"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Camera, Plus, X, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getExpertById, upsertExpert, deleteExpert } from "@/lib/actions/content"

export default function AdminEditExpertPage() {
  const params = useParams()
  const router = useRouter()
  const expertId = params.id as string
  const isNew = expertId === 'new'

  const [name, setName] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [expertiseInput, setExpertiseInput] = useState("")
  const [expertise, setExpertise] = useState<string[]>([])
  const [isActive, setIsActive] = useState(true)

  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      getExpertById(expertId).then(exp => {
        if (exp) {
          setName(exp.name || "")
          setAffiliation(exp.organization || "")
          setTitle(exp.role || "")
          setEmail(exp.contact_email || "")
          setBio(exp.bio || "")
          
          if (exp.social_links && Array.isArray(exp.social_links)) {
             setExpertise(exp.social_links)
          } else {
             setExpertise([])
          }
          setIsActive(exp.is_active ?? true)
        }
        setIsLoading(false)
      })
    }
  }, [expertId, isNew])

  const handleAddExpertise = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && expertiseInput.trim() !== '') {
      e.preventDefault()
      if (!expertise.includes(expertiseInput.trim())) {
        setExpertise([...expertise, expertiseInput.trim()])
      }
      setExpertiseInput("")
    }
  }

  const handleRemoveExpertise = (tag: string) => {
    setExpertise(expertise.filter(e => e !== tag))
  }

  const handleSave = async () => {
    if (!name || !affiliation) {
      alert("이름과 소속은 필수입니다.")
      return
    }
    
    setIsSaving(true)
    const payload = {
      name,
      organization: affiliation,
      role: title,
      contact_email: email,
      bio,
      social_links: expertise, // mapping expertise tags into social_links json for now
      is_active: isActive
    }

    try {
      const res = await upsertExpert(expertId, payload)
      if (res.success) {
        alert(isNew ? "전문가 정보가 생성되었습니다." : "전문가 프로필이 업데이트 되었습니다.")
        router.push("/admin/content/experts")
      } else {
        alert("저장 실패: " + res.error)
      }
    } catch (err: any) {
      alert("에러 발생: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if(confirm("정말로 이 전문가 객체를 삭제하시겠습니까? 연결된 SSoT 기록이 있다면 주의해야 합니다.")) {
       const res = await deleteExpert(expertId)
       if (res.success) {
         alert("전문가가 삭제되었습니다.")
         router.push('/admin/content/experts')
       } else {
         alert("삭제 실패: " + res.error)
       }
    }
  }

  if (isLoading) return <div className="p-24 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <div className="bg-white border-b border-line-default sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/content/experts" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900">{isNew ? "전문가 신규 등록" : "전문가 프로필 수정"}</h1>
               {!isNew && <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-xs font-mono font-bold">{expertId.split('-')[0]}...</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
             {!isNew && (
               <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                <Trash2 className="w-4 h-4 mr-2" /> 전문가 삭제
               </Button>
             )}
            <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isNew ? "등록 완료" : "저장 및 반영"}
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
        <div className="bg-white p-8 rounded-3xl border border-line-default shadow-sm flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0 flex flex-col gap-3 items-center">
              <div className="w-32 h-32 rounded-full bg-neutral-100 border-2 border-dashed border-line-strong flex flex-col items-center justify-center text-neutral-400 cursor-pointer hover:bg-neutral-50 transition-colors overflow-hidden group">
                 <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                 <span className="text-[11px] font-bold">Edit Photo</span>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">400x400px 권장<br/>JPG, PNG, WebP</p>
            </div>

            <div className="flex-1 w-full flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">이름 (Name) <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">이메일 (연락망)</label>
                  <input 
                    type="email" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">소속 기관 (Affiliation) <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">직위/직함 (Title)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-line-soft w-full" />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-neutral-800">전문 분야 (Expertise Taxonomy)</label>
              <div className="w-full p-3 min-h-[52px] rounded-xl border border-line-default bg-surface-soft focus-within:bg-white focus-within:border-brand-500 transition-colors flex flex-wrap gap-2 items-center">
                {expertise.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-bold rounded-lg">
                    {tag}
                    <button onClick={() => handleRemoveExpertise(tag)} className="text-brand-400 hover:text-brand-900 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input 
                  type="text"
                  placeholder="분야 입력 후 Enter..."
                  className="flex-1 min-w-[150px] bg-transparent focus:outline-none text-sm text-neutral-800 disabled:opacity-50"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyDown={handleAddExpertise}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-neutral-800">약력 및 프로필 (Biography)</label>
              <textarea 
                rows={6}
                className="w-full p-4 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500" />
              <label htmlFor="isActive" className="text-sm font-medium text-neutral-800">공개 프로필 활성화 (사용자 페이지 노출)</label>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}
