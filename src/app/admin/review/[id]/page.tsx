"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, ShieldAlert, XCircle, AlertTriangle, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ReviewDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  
  const [returnReason, setReturnReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // MOCK DATA
  const objectType = "Story"
  const objectTitle = "K-콘텐츠 파이프라인의 핵심, 웹툰 제작의 모든 것"
  const authorName = "최디렉터"

  const handleApprove = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      alert("승인 처리되었습니다. (Mock)")
      router.push("/admin/review/approved")
    }, 800)
  }

  const handleReturn = () => {
    if (!returnReason.trim()) {
      alert("반려 사유를 작성해 주세요.")
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      alert("반려 처리되었습니다. (Mock)")
      router.push("/admin/review/returned")
    }, 800)
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-24 h-full">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-line-soft pb-4">
        <Link href="/admin/review/needs" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">
              {objectType}
            </span>
            <span className="text-sm font-mono text-neutral-400 font-medium">Task: {id}</span>
          </div>
          <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight leading-tight">
            Review: {objectTitle}
          </h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start h-full">
        {/* Left: Content Snapshot View */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-line-default shadow-sm p-8 min-h-[600px]">
          <h2 className="text-sm font-bold text-neutral-400 mb-6 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Content Snapshot
          </h2>
          
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-600 font-medium mb-8 leading-relaxed">
              웹툰은 단순 스낵컬처를 넘어 영화, 드라마, 게임의 원천 IP로 기능하는 핵심 파이프라인으로 성장했습니다... (Mock Content)
            </p>
            <h3>1. 원천 IP로서의 잠재력</h3>
            <p>한국의 웹툰 스튜디오들은 주간 연재라는 가혹한 시스템 속에서도 전 세계 유례없는 분업화 시스템을 통해 고퀄리티의 결과물을 만들어냅니다.</p>
            <h3>2. 글로벌 플랫폼 장악력</h3>
            <p>네이버와 카카오가 북미, 일본, 동남아 시장을 선점하면서 웹툰 포맷 자체가 글로벌 스탠다드로 자리잡고 있습니다.</p>
          </div>
        </div>

        {/* Right: Review Actions Panel */}
        <div className="w-full xl:w-[400px] flex flex-col gap-6 shrink-0 sticky top-6">
          
          {/* SSoT Linting Results */}
          <div className="bg-white rounded-2xl border border-line-default shadow-sm p-6">
            <h3 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand-600" />
              SSoT Validation
            </h3>
            
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 p-3 bg-success-50 rounded-xl border border-success-100">
                <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-success-900">Evidence Linked</span>
                  <span className="text-xs text-success-700">1+ Answer cards attached.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-success-50 rounded-xl border border-success-100">
                <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-success-900">Thumbnail Image</span>
                  <span className="text-xs text-success-700">Cover image is provided and valid.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-warning-50 rounded-xl border border-warning-100">
                <AlertTriangle className="w-5 h-5 text-warning-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-warning-900">Author Verification</span>
                  <span className="text-xs text-warning-700">{authorName} is an external contributor. Extra scrutiny recommended.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Box */}
          <div className="bg-neutral-800 rounded-2xl border border-neutral-700 shadow-xl p-6 text-white space-y-6">
            <h3 className="text-base font-bold text-white mb-2 flex items-center justify-between">
              Review Decision
              <span className="text-xs font-mono bg-neutral-700 px-2 py-0.5 rounded text-neutral-300">Draft &rarr; Public</span>
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Return Reason (If rejecting)</label>
              <textarea 
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                placeholder="반려(Return) 시 이유를 상세히 적어주세요..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-500 transition-colors min-h-[100px] resize-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-neutral-700">
              <button 
                onClick={handleReturn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl font-bold transition-all disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Return to Draft (반려)
              </button>
              
              <button 
                onClick={handleApprove}
                disabled={isSubmitting}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-900/50 transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Publish (승인)
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
