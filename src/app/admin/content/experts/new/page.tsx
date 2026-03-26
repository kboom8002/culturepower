"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Camera, Plus, X, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function AdminNewExpertPage() {
  const [name, setName] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [expertiseInput, setExpertiseInput] = useState("")
  const [expertise, setExpertise] = useState<string[]>([])

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

  const handleSaveDraft = () => {
    alert("임시저장 되었습니다 (Demo)")
    console.log({ name, affiliation, title, email, bio, expertise, status: 'Draft' })
  }

  const handlePublish = () => {
    if (!name || !affiliation) {
      alert("이름과 소속은 필수입니다.")
      return
    }
    alert("전문가 프로필이 발행 큐에 등록되었습니다. (Demo)")
    console.log({ name, affiliation, title, email, bio, expertise, status: 'Review' })
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {/* Top Banner */}
      <div className="bg-white border-b border-line-default sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/content/experts" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-[20px] font-bold text-neutral-900">새 전문가 등록</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="tertiary" size="sm" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              임시저장
            </Button>
            <Button variant="primary" size="sm" onClick={handlePublish}>
              <FileCheck className="w-4 h-4 mr-2" />
              풀(Pool) 등록
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
        <div className="bg-white p-8 rounded-3xl border border-line-default shadow-sm flex flex-col gap-10">
          
          {/* Profile Header Block */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Upload */}
            <div className="shrink-0 flex flex-col gap-3 items-center">
              <div className="w-32 h-32 rounded-full bg-surface-soft border-2 border-dashed border-line-strong flex flex-col items-center justify-center text-neutral-400 cursor-pointer hover:bg-neutral-50 transition-colors overflow-hidden group">
                 <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                 <span className="text-[11px] font-bold">Upload Photo</span>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">400x400px 권장<br/>JPG, PNG, WebP</p>
            </div>

            {/* Core Info */}
            <div className="flex-1 w-full flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">이름 (Name) <span className="text-danger-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="홍길동" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">이메일 (연락망)</label>
                  <input 
                    type="email" 
                    placeholder="expert@example.com" 
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
                    placeholder="예: 문화강국네트워크" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">직위/직함 (Title)</label>
                  <input 
                    type="text" 
                    placeholder="예: 수석 연구위원" 
                    className="w-full p-3 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-line-soft w-full" />

          {/* Taxonomy & Meta */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-neutral-800">전문 분야 (Expertise Taxonomy)</label>
              <p className="text-xs text-neutral-500 -mt-1">전문가가 활동하는 아젠다 키워드를 입력하고 Enter를 누르세요. 이 키워드는 문강네트워크 3 Pillars와 연동됩니다.</p>
              
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
              <p className="text-xs text-neutral-500 -mt-1">해당 전문가의 주요 이력 사항을 자유 형식으로 기재하세요. 대중에게 공개되는 프로필 본문입니다.</p>
              <textarea 
                rows={6}
                placeholder="한국문화예술위원회 위원 역임..." 
                className="w-full p-4 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            
            <div className="p-5 bg-neutral-50 border border-line-default rounded-2xl flex flex-col gap-2">
               <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-brand-600" />
                 SSoT 연동 권한 안내
               </h4>
               <p className="text-xs text-neutral-600 leading-relaxed">
                 전문가 풀(Pool)에 등록된 인원은 향후 <strong>정답카드(AnswerCard)</strong>의 공식 검수자(Reviewer)로 지정되거나, <strong>문강 RIO(스토리)</strong>의 저자(Creator)로 시스템 상에서 연결될 수 있습니다. 프로덕션 발행을 위해서는 필수 항목(이름, 소속)이 검토되어야 합니다.
               </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}
