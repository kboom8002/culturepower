"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { schedulePublish, returnToReview } from "@/lib/actions/publishing"
import { Loader2, CalendarDays, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

type Props = {
  itemId: string
  contentType: 'Story' | 'Answer' | 'Event'
  currentDate: string | null | undefined
}

export function ScheduledActions({ itemId, contentType, currentDate }: Props) {
  const [isPending, startTransition] = useTransition()
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [dateStr, setDateStr] = useState("")

  const handleCancel = () => {
    if(!confirm(`해당 ${contentType} 컨텐츠의 등록된 예약을 취소하시겠습니까? (Review 상태로 돌아갑니다)`)) return
    startTransition(async () => {
      const res = await returnToReview(itemId, contentType)
      if (!res.success) alert(res.error)
    })
  }

  const handleScheduleSubmit = () => {
    if(!dateStr) return alert("날짜와 시간을 선택해주세요.")
    const d = new Date(dateStr)
    if(d.getTime() < Date.now()) return alert("현재 시점보다 미래의 시간을 선택해주세요.")
    
    startTransition(async () => {
      const res = await schedulePublish(itemId, contentType, d.toISOString())
      if (!res.success) alert(res.error)
      else setScheduleOpen(false)
    })
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <Dialog.Root open={scheduleOpen} onOpenChange={(open: boolean) => {
        setScheduleOpen(open)
        if (open && currentDate) {
           const d = new Date(currentDate)
           const offset = d.getTimezoneOffset()
           const localTime = new Date(d.getTime() - (offset*60*1000)).toISOString().slice(0, 16)
           setDateStr(localTime)
        }
      }}>
        <Dialog.Trigger asChild>
          <Button 
            variant="secondary" 
            size="sm" 
            disabled={isPending}
            className="px-3"
          >
            시간 수정
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm z-50">
            <Dialog.Title className="text-xl font-bold text-neutral-900 mb-2">예약 시간 수정</Dialog.Title>
            
            <div className="flex flex-col gap-4 mb-8 mt-4">
              <label className="text-sm font-medium text-neutral-700">새로운 발행 일시</label>
              <input 
                type="datetime-local" 
                value={dateStr}
                onChange={e => setDateStr(e.target.value)}
                className="w-full px-4 py-3 border border-line-strong rounded-xl text-neutral-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Dialog.Close asChild>
                <Button variant="tertiary">닫기</Button>
              </Dialog.Close>
              <Button variant="primary" onClick={handleScheduleSubmit} disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "시간 변경"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Button 
        variant="tertiary" 
        size="sm" 
        onClick={handleCancel}
        disabled={isPending}
        className="px-3 text-danger-500 hover:text-danger-600 border border-danger-200 bg-danger-50/50"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <X className="w-4 h-4 mr-1" />}
        {isPending ? "진행 중..." : "예약 취소"}
      </Button>
    </div>
  )
}
