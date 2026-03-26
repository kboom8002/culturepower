"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AdminEditAnswerPage() {
  const params = useParams()
  const answerId = params.id as string

  // Mock pre-populated data
  const [title, setTitle] = useState("지역 소멸에 대응하는 K-컬처 예산 활용 방안은 어떻게 설계되어 있나요?")
  const [directAnswer, setDirectAnswer] = useState("2024년 기준 지역 소멸에 대응하는 K-컬처 예산은 총 1.2조원 규모로 편성되었으며...")
  const [context, setContext] = useState("이러한 예산 편성은 단순한 일회성 지원을 넘어 지속 가능한 문화 생태계 조성을 목표로 합니다...")
  const [topic, setTopic] = useState("지역문화")

  const handleSaveDraft = () => {
    alert("임시저장 되었습니다 (Demo)")
  }

  const handlePublish = () => {
    if (!title || !directAnswer) {
      alert("질문(제목)과 핵심 정답은 필수입니다.")
      return
    }
    alert("발행 승인 요청이 큐에 등록되었습니다. (Demo)")
  }

  const handleDelete = () => {
    if(confirm("이 정답카드를 삭제하시겠습니까? 연결된 스토리나 근거 자료에 영향을 미칠 수 있습니다.")) {
       alert("정답카드가 삭제되었습니다.")
       // redirect back
       window.location.href = '/admin/content/answers'
    }
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {/* Top Action Bar */}
      <div className="bg-white border-b border-line-default sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/content/answers" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900">정답카드 수정</h1>
               <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-xs font-mono font-bold">{answerId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
              <Trash2 className="w-4 h-4 mr-2" />
              카드 삭제
            </Button>
            <Button variant="tertiary" size="sm" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              변경사항 임시저장
            </Button>
            <Button variant="primary" size="sm" onClick={handlePublish}>
              <FileCheck className="w-4 h-4 mr-2" />
              수정 및 재승인
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 flex gap-8">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[600px] flex flex-col gap-6">
            
            {/* Title (User Query) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-600">사용자 예상 질문 (User Query / Title)</label>
              <textarea 
                rows={2}
                className="w-full text-[24px] font-bold text-neutral-900 p-4 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {/* Direct Answer */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-[11px] text-brand-800">A</span>
                핵심 정답 (Direct Answer)
              </label>
              <textarea 
                rows={4}
                className="w-full text-[16px] text-neutral-800 p-4 rounded-xl border border-brand-200 bg-brand-50/30 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y leading-relaxed"
                value={directAnswer}
                onChange={(e) => setDirectAnswer(e.target.value)}
              />
            </div>
            
            {/* Extended Context */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold text-neutral-600">상세 해설 및 맥락 (Extended Context)</label>
              <textarea 
                rows={8}
                className="w-full h-full text-[16px] text-neutral-700 p-4 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y leading-relaxed"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* Action Panel / Metadata */}
        <div className="w-80 hidden lg:flex flex-col gap-6 shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-5">
            <h3 className="font-bold text-[16px] text-neutral-900 border-b border-line-default pb-3">분류 및 SSoT 설정</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">Topic 분류 (3 Pillars)</label>
              <select className="w-full p-2.5 bg-surface-soft border border-line-default rounded-lg text-sm text-neutral-800 focus:outline-none focus:border-brand-500">
                <option>K-문명</option>
                <option>글로벌 중추국가</option>
                <option>지역문화</option>
                <option>청년/미래</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-5">
            <h3 className="font-bold text-[16px] text-neutral-900 border-b border-line-default pb-3">필수 신뢰 블록 구성</h3>
            <p className="text-xs text-neutral-500 -mt-2">AnswerCard가 퍼블릭 사이트에 공개되려면 신뢰 블록 3대 요소가 모두 만족되어야 합니다.</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-neutral-700">1. 증거 자료 (Evidence)</span>
                <span className="text-danger-600 font-bold text-[11px]">미흡</span>
              </div>
              <Button variant="secondary" size="sm" className="w-full justify-start text-neutral-600">
                + 파일 업로드 또는 링크 추가
              </Button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-line-soft">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-neutral-700">2. 지정 검수자 (Reviewer)</span>
                <span className="text-success-600 font-bold text-[11px]">등록됨</span>
              </div>
              <Button variant="secondary" size="sm" className="w-full justify-start text-neutral-600">
                Edit Reviewer (김에디터)
              </Button>
            </div>
            
          </div>
        </div>

      </main>
    </div>
  )
}
