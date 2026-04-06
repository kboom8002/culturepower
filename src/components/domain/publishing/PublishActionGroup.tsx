"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { publishImmediately, schedulePublish, returnToReview } from "@/lib/actions/publishing"
import { Rocket, Loader2, Clock, RotateCcw } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

type Props = {
  itemId: string
  contentType: 'Story' | 'Answer' | 'Event' | 'Brief' | 'Page'
}

export function PublishActionGroup({ itemId, contentType }: Props) {
  const [isPending, startTransition] = useTransition()
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [dateStr, setDateStr] = useState("")

  const handlePublish = () => {
    if(!confirm(`해당 ${contentType} 컨텐츠를 지금 즉시 발행(Public)하시겠습니까?`)) return
    startTransition(async () => {
      const res = await publishImmediately(itemId, contentType)
      if (!res.success) alert(res.error)
    })
  }

  const handleReturn = () => {
    if(!confirm(`해당 ${contentType} 컨텐츠를 다시 Review 상태로 반려하시겠습니까?`)) return
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
    <div className="flex items-center gap-2">
      <Button 
        variant="tertiary" 
        size="sm" 
        onClick={handleReturn}
        disabled={isPending}
        className="px-2 text-neutral-500 hover:text-neutral-700"
        title="반려 (Review로 돌아가기)"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>

      <Dialog.Root open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <Dialog.Trigger asChild>
          <Button 
            variant="secondary" 
            size="sm" 
            disabled={isPending}
            className="px-3 min-w-[80px]"
          >
            <Clock className="w-4 h-4 mr-1 text-brand-600" />
            예약
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm z-50">
            <Dialog.Title className="text-xl font-bold text-neutral-900 mb-2">예약 발행 설정</Dialog.Title>
            <Dialog.Description className="text-neutral-500 text-sm mb-6">
              선택한 {contentType} 컨텐츠가 프론트엔드에 자동으로 발행되어 노출될 일시를 지정합니다.
            </Dialog.Description>
            
            <div className="flex flex-col gap-4 mb-8">
              <label className="text-sm font-medium text-neutral-700">발행 일시</label>
              <input 
                type="datetime-local" 
                value={dateStr}
                onChange={e => setDateStr(e.target.value)}
                className="w-full px-4 py-3 border border-line-strong rounded-xl text-neutral-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Dialog.Close asChild>
                <Button variant="tertiary">취소</Button>
              </Dialog.Close>
              <Button variant="primary" onClick={handleScheduleSubmit} disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "예약 생성"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Button 
        variant="primary" 
        size="sm" 
        onClick={handlePublish}
        disabled={isPending}
        className="px-3 min-w-[100px]"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Rocket className="w-4 h-4 mr-1" />}
        {isPending ? "발행 중..." : "즉시 발행"}
      </Button>
    </div>
  )
}
