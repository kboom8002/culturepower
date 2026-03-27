"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Inbox, Loader2, ArrowRightCircle, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { getInboxItemById, updateInboxItemStatus, convertInboxToAnswer, convertInboxToFixIt, InboxItem } from "@/lib/actions/inbox"

export default function AdminInboxDetailPage() {
  const params = useParams()
  const router = useRouter()
  const inboxId = params.id as string

  const [item, setItem] = useState<InboxItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    getInboxItemById(inboxId).then(data => {
      setItem(data)
      setIsLoading(false)
    })
  }, [inboxId])

  if (isLoading) return <div className="flex justify-center p-24"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
  if (!item) return <div className="p-24 text-center font-bold text-neutral-500">요청한 항목을 찾을 수 없습니다.</div>

  const handleStatusChange = async (status: InboxItem['status'], e?: React.FormEvent) => {
    e?.preventDefault()
    setIsProcessing(true)
    const res = await updateInboxItemStatus(item.id, { status })
    if (res.success) setItem({ ...item, status })
    else alert("업데이트 실패: " + res.error)
    setIsProcessing(false)
  }

  const handlePriorityChange = async (priority: InboxItem['priority'], e?: React.FormEvent) => {
    e?.preventDefault()
    setIsProcessing(true)
    const res = await updateInboxItemStatus(item.id, { priority })
    if (res.success) setItem({ ...item, priority })
    else alert("업데이트 실패: " + res.error)
    setIsProcessing(false)
  }

  const handleConvertToAnswer = async () => {
    if(!confirm("이 질문을 바탕으로 새로운 SSoT 정답카드를 생성하시겠습니까? (상태가 Mapped로 자동 변경됩니다)")) return
    setIsProcessing(true)
    const res = await convertInboxToAnswer(item.id, item.content, item.subject)
    if (res.success) {
      alert("정답카드가 생성되어 매핑되었습니다! Answer Editor로 이동합니다.")
      router.push(`/admin/content/answers/${res.newId}`)
    } else {
      alert("변환 실패: " + res.error)
      setIsProcessing(false)
    }
  }

  const handleConvertToFixIt = async () => {
    if(!confirm("이 제보를 결함 조치(Fix-It) 시스템의 P0 티켓으로 이관하시겠습니까?")) return
    setIsProcessing(true)
    const res = await convertInboxToFixIt(item.id, item.content)
    if (res.success) {
      alert("Fix-It 티켓으로 이관 및 매핑이 완료되었습니다.")
      router.push(`/admin/fixit`)
    } else {
      alert("변환 실패: " + res.error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-50 -my-8 p-8 relative">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-line-soft px-8 py-4 -mx-8 -mt-8 mb-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <Link href="/admin/inbox" className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors bg-neutral-100 hover:bg-neutral-200 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <div className="flex flex-col">
              <div className="flex items-center gap-2">
                 <h1 className="font-bold text-[18px] text-neutral-900">Inbox Ticket 상세 검토</h1>
                 <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-bold tracking-wider uppercase font-mono">
                    {item.id}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        {/* Left Panel: User Original Message */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-line-default shadow-sm overflow-hidden">
             
             {/* Header */}
             <div className="p-8 border-b border-line-soft bg-surface-soft/50 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                   {item.status === 'New' && <Chip variant="issue">New</Chip>}
                   {item.status === 'Triaged' && <Chip variant="primary">Triaged</Chip>}
                   {item.status === 'Mapped' && <Chip variant="reviewed">Mapped</Chip>}
                   {item.status === 'In Progress' && <Chip variant="success">In Progress</Chip>}
                   {item.status === 'Closed' && <Chip variant="default">Closed</Chip>}
                   
                   <Chip variant="default" className="bg-white border-line-strong ml-2">{item.type}</Chip>
                   <span className="text-xs text-neutral-400 ml-auto font-mono">{new Date(item.created_at).toLocaleString()}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-900 mt-2 leading-tight">
                   {item.subject}
                </h2>
             </div>

             {/* Reporter Info */}
             <div className="px-8 py-5 border-b border-line-soft flex gap-8 bg-white">
                <div className="flex flex-col gap-1">
                   <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">제보자 (Reporter)</span>
                   <span className="text-sm font-bold text-neutral-800">{item.reporter_name || '익명'}</span>
                </div>
                {item.reporter_email && (
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">이메일</span>
                     <span className="text-sm text-neutral-600">{item.reporter_email}</span>
                  </div>
                )}
                {item.reporter_phone && (
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">연락처</span>
                     <span className="text-sm text-neutral-600">{item.reporter_phone}</span>
                  </div>
                )}
             </div>

             {/* Message Body */}
             <div className="p-8 bg-white min-h-[300px]">
                <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">접수 내용 원본</h3>
                <div className="text-base text-neutral-800 leading-relaxed whitespace-pre-wrap">
                   {item.content}
                </div>
             </div>
          </div>
        </div>

        {/* Right Panel: Triage & Conversion */}
        <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
          
          {/* Triage Dashboard */}
          <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-6">
             <div className="flex items-center gap-2 border-b border-line-soft pb-4">
                <Inbox className="w-5 h-5 text-neutral-900" />
                <h3 className="font-bold text-[16px] text-neutral-900">분류 및 진행 상태 제어 (Triage)</h3>
             </div>

             <div className="flex flex-col gap-3">
                <label className="text-[12px] font-bold text-neutral-600">긴급도 (Priority)</label>
                <div className="flex bg-neutral-100 rounded-lg p-1 w-full gap-1">
                  {(['P0', 'P1', 'P2'] as const).map(p => (
                     <button
                        key={p}
                        onClick={(e) => handlePriorityChange(p, e)}
                        disabled={isProcessing}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                           item.priority === p 
                           ? (p === 'P0' ? 'bg-danger-500 text-white shadow-sm' : p === 'P1' ? 'bg-warning-500 text-white shadow-sm' : 'bg-neutral-800 text-white shadow-sm') 
                           : 'text-neutral-500 hover:bg-white/50'
                        }`}
                     >
                        {p}
                     </button>
                  ))}
                </div>
             </div>

             <div className="flex flex-col gap-3">
                <label className="text-[12px] font-bold text-neutral-600">진행 상태 (Status)</label>
                <select 
                  className="w-full bg-surface-soft border border-line-strong rounded-lg px-4 py-3 text-sm font-bold text-neutral-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  value={item.status}
                  onChange={(e) => handleStatusChange(e.target.value as InboxItem['status'])}
                  disabled={isProcessing}
                >
                  <option value="New">New (신규 수신)</option>
                  <option value="Triaged">Triaged (내부 확인 및 분류됨)</option>
                  <option value="Mapped">Mapped (자산/결함으로 이관됨)</option>
                  <option value="In Progress">In Progress (작업 진행 중)</option>
                  <option value="Closed">Closed (모든 처리 완료)</option>
                </select>
             </div>
          </div>

          {/* Conversion Actions */}
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl border border-brand-100 shadow-sm p-6 flex flex-col gap-6 relative overflow-hidden">
             
             <div className="flex items-center gap-2 border-b border-brand-100 pb-4 relative z-10">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-[16px] text-brand-900">운영 객체 (자산) 전환</h3>
             </div>

             <p className="text-xs text-brand-700/80 leading-relaxed relative z-10">
                수신된 VOC를 단순 응대로 끝내지 않고 플랫폼의 정답카드 지식(SSoT)이나 구조적 결함 조치(Fix-It)로 영구 편입시킵니다.
             </p>

             {item.status === 'Mapped' && item.mapped_object_type ? (
               <div className="bg-white rounded-xl p-4 border border-brand-200 flex flex-col items-center justify-center gap-3 relative z-10">
                 <CheckCircle2 className="w-8 h-8 text-success-500" />
                 <div className="text-center">
                   <div className="text-[13px] font-bold text-neutral-900">{item.mapped_object_type} 속성으로 매핑됨</div>
                   <div className="text-[11px] font-mono text-neutral-500 mt-1">{item.mapped_object_id}</div>
                 </div>
                 <Link href={item.mapped_object_type === 'Answer' ? `/admin/content/answers/${item.mapped_object_id}` : `/admin/fixit`} className="w-full">
                    <Button variant="secondary" size="sm" className="w-full mt-2 font-bold bg-neutral-50 border-neutral-200">
                       해당 객체로 이동 <ArrowRightCircle className="w-4 h-4 ml-1.5 text-neutral-400" />
                    </Button>
                 </Link>
               </div>
             ) : (
               <div className="flex flex-col gap-3 relative z-10">
                  <Button 
                     variant="primary" 
                     className="w-full justify-between font-bold h-12 shadow-sm shadow-brand-500/20"
                     onClick={handleConvertToAnswer}
                     disabled={isProcessing}
                  >
                     <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> 새 정답카드로 통합</span>
                     <ArrowRightCircle className="w-4 h-4 opacity-50" />
                  </Button>

                  <Button 
                     variant="tertiary" 
                     className="w-full justify-between font-bold h-12 bg-white border border-danger-100 text-danger-700 hover:bg-danger-50"
                     onClick={handleConvertToFixIt}
                     disabled={isProcessing}
                  >
                     <span className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> 정정/결함 (Fix-it) 이관</span>
                     <ArrowRightCircle className="w-4 h-4 opacity-50" />
                  </Button>
               </div>
             )}

             {/* Decorative Background */}
             <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
                <Sparkles className="w-48 h-48" />
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
