"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, CheckCircle2, Ban, ShieldQuestion, Clock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { getMemberAppById, updateMemberAppStatus, MemberApplication } from "@/lib/actions/participation"

export default function AdminMemberAppWorkflowPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.id as string

  const [app, setApp] = useState<MemberApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    getMemberAppById(appId).then(data => {
      setApp(data)
      setIsLoading(false)
    })
  }, [appId])

  const handleStatusUpdate = async (status: MemberApplication['status']) => {
    if (!confirm(`회원 상태를 '${status}'(으)로 변경하시겠습니까?`)) return
    setIsProcessing(true)
    const res = await updateMemberAppStatus(appId, status)
    if (res.success) {
      alert("상태가 변경되었습니다.")
      router.push("/admin/participation/members")
    } else {
      alert(`변경 실패: ${res.error}`)
    }
    setIsProcessing(false)
  }

  if (isLoading) return <div className="p-24 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
  if (!app) return <div className="p-24 text-center">신청서를 찾을 수 없습니다.</div>

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-line-default sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">회원 가입 심사 (Screening)</h1>
               <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-[11px] font-mono font-bold tracking-wider">{app.id.slice(0,8)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Applicant Details */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[600px] flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-line-soft pb-6">
             <div>
                <h2 className="text-[28px] font-extrabold text-neutral-900">{app.name} 님의 가입 신청</h2>
                <div className="text-neutral-500 mt-1 font-medium">{app.email}</div>
             </div>
             <div className="text-right">
                <div className="text-xs font-bold text-neutral-400 mb-1">Applied At</div>
                <div className="font-mono text-sm">{new Date(app.created_at).toLocaleString()}</div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">소속 / 기관 (Organization)</label>
              <div className="p-4 bg-neutral-50 border border-line-soft rounded-xl font-bold text-neutral-800">{app.organization || "소속 정보 없음"}</div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">유입 경로 (Source Channel)</label>
              <div className="p-4 bg-neutral-50 border border-line-soft rounded-xl font-medium text-neutral-700">{app.source_channel || "알 수 없음"}</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">가입 동기 / 목적 (Motivation)</label>
            <div className="p-6 bg-surface-soft border border-line-strong rounded-2xl text-neutral-800 leading-relaxed min-h-[240px]">
               {app.motivation || "작성된 가입 동기가 없습니다."}
            </div>
          </div>
        </div>

        {/* Action Panel (Right Sidebar) */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-line-default shadow-sm flex flex-col gap-6">
            <h3 className="font-bold text-[16px] text-neutral-900 tracking-tight border-b border-line-soft pb-4">심사 액션보드 (Workflow)</h3>
            
            <div className="flex flex-col gap-2 border-b border-line-soft pb-6">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">현재 상태</label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-50 border border-brand-100 text-brand-700 font-bold">
                 <ShieldQuestion className="w-5 h-5" />
                 {app.status}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
               <Button 
                 variant="primary" 
                 size="lg" 
                 className="w-full bg-success-500 hover:bg-success-600 shadow-md font-bold justify-start"
                 disabled={isProcessing || app.status === 'Approved'}
                 onClick={() => handleStatusUpdate('Approved')}
               >
                 <CheckCircle2 className="w-5 h-5 mr-3" /> 승인 처리 (Approve)
               </Button>
               
               <Button 
                 variant="tertiary" 
                 size="lg" 
                 className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold border border-line-strong justify-start"
                 disabled={isProcessing || app.status === 'Hold'}
                 onClick={() => handleStatusUpdate('Hold')}
               >
                 <Clock className="w-5 h-5 mr-3" /> 보류 (Hold)
               </Button>
               
               <Button 
                 variant="tertiary" 
                 size="lg" 
                 className="w-full bg-danger-50 hover:bg-danger-100 text-danger-600 font-bold border border-danger-200 justify-start"
                 disabled={isProcessing || app.status === 'Rejected'}
                 onClick={() => handleStatusUpdate('Rejected')}
               >
                 <Ban className="w-5 h-5 mr-3" /> 가입 거절 (Reject)
               </Button>
            </div>
            
            <p className="text-[11px] text-neutral-400 leading-relaxed mt-2 text-center">
              승인 시 해당 회원에게 자동메일이 활성화되며 로그인 권한이 부여됩니다. (알림 연동 예정)
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
