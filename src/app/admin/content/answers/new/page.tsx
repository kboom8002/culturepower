"use client"

import { ArrowLeft, Save, Send, AlertCircle, Link as LinkIcon, HelpCircle, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AnswerCardEditorPage() {
  const CATEGORIES = ["K-문명", "지역문화", "문화정책", "문화예산", "SSoT 구축", "글로벌 중추국가", "참여·회원"]
  const [status, setStatus] = useState("Draft")

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pb-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line-soft pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/content/answers" className="p-2 bg-white border border-line-default rounded-xl shadow-sm hover:bg-neutral-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight">Create AnswerCard</h1>
              <span className="bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                {status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-line-strong rounded-xl bg-white text-neutral-700 font-bold text-sm shadow-sm hover:bg-neutral-50 transition-colors">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-900 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-brand-800 transition-colors">
            <Send className="w-4 h-4" />
            Request Review
          </button>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <p className="text-sm text-brand-800 leading-relaxed font-medium">
          정답카드(AnswerCard)는 SSoT의 근간이 되는 가장 중요한 코어 객체입니다. 사용자 관점의 명료한 질문을 정의하고, 파편화되지 않은 단 하나의 보편적 정답을 제시해야 합니다.
        </p>
      </div>

      <form className="flex flex-col gap-8">
        
        {/* IA Classification */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-line-default shadow-sm flex flex-col gap-6">
          <h2 className="text-[18px] font-bold text-neutral-900 border-b border-line-soft pb-3">분류 등록 (Classification)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-900">Category (종속 분류)</label>
              <select className="px-4 py-3 bg-neutral-50 border border-line-strong rounded-xl text-body-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
                <option value="" disabled selected>Select category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-900">Root Cause / Pillar (선택 사항)</label>
              <select className="px-4 py-3 bg-neutral-50 border border-line-strong rounded-xl text-body-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
                <option value="">None</option>
                <option value="Reform">Reform</option>
                <option value="Implementation">Implementation</option>
                <option value="Outcomes">Outcomes</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content Definition */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-line-default shadow-sm flex flex-col gap-6">
          <h2 className="text-[18px] font-bold text-neutral-900 border-b border-line-soft pb-3">핵심 질문 및 정답 (Content Matrix)</h2>
          
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-neutral-900 flex items-center justify-between">
              Question Title (질문)
              <span className="text-xs text-neutral-400 font-normal">Max 100 chars</span>
            </label>
            <input 
              type="text" 
              placeholder="예: 지역 소멸에 대응하는 정책적 해법은 무엇인가요?"
              className="px-4 py-3.5 bg-white border-2 border-line-strong rounded-xl text-[16px] font-bold text-neutral-900 focus:outline-none focus:border-brand-500 focus:ring-0 placeholder:font-medium placeholder:text-neutral-400 transition-colors" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-700 flex items-center justify-between">
              Direct Answer (완전한 정답)
              <span className="text-xs text-neutral-400 font-normal">3-4 Sentences Recommended</span>
            </label>
            <textarea 
              rows={4}
              placeholder="질문에 대한 가장 명확하고 공식적인 확정 답변을 여기에 작성하세요. 퍼블릭 카드에서 파란색 박스로 강조되어 노출됩니다."
              className="px-4 py-3.5 bg-brand-050/50 border-2 border-brand-200 rounded-xl text-body-lg text-neutral-900 focus:outline-none focus:border-brand-500 focus:ring-0 placeholder:text-neutral-400 resize-y transition-colors" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-900 flex items-center justify-between">
              Context & Explanation (상세 해설)
            </label>
            <textarea 
              rows={6}
              placeholder="상세한 배경지식, 역사적 맥락, 추진 현황 등 세부 내용을 자유롭게 기술하세요. 마크다운 또는 HTML 구문을 지원하게 될 예정입니다."
              className="px-4 py-3.5 bg-neutral-50 border border-line-strong rounded-xl text-body-sm text-neutral-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder:text-neutral-400 resize-y transition-colors font-mono" 
            />
          </div>
        </section>

        {/* Action Points / Evidence Graph */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-line-default shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-line-soft pb-3">
            <h2 className="text-[18px] font-bold text-neutral-900">근거 자료 연동 (Evidences graph)</h2>
            <button type="button" className="text-sm text-brand-700 font-bold flex items-center gap-1 hover:text-brand-800">
              <Plus className="w-4 h-4" /> Link Evidence
            </button>
          </div>
          
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-line-strong rounded-xl bg-neutral-50 text-neutral-500 text-sm font-medium">
            연결된 근거 발제문 또는 외부 기사 링크가 없습니다.
          </div>
          <p className="text-xs text-danger-600 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> 최소 1개의 근거(Evidence) 객체를 링크해야 Review 단계로 이관할 수 있습니다.
          </p>
        </section>

      </form>
    </div>
  )
}
