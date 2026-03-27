"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { processReviewTask } from "@/lib/actions/review"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

type Props = {
  taskId: string
  action: 'Approve' | 'Return'
}

export function ReviewProcessBtn({ taskId, action }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleProcess = () => {
    let comment = ""
    if (action === 'Return') {
      const msg = prompt("반려 사유(코멘트)를 입력하세요.")
      if (msg === null) return // Canceled
      comment = msg
    } else {
      if (!confirm("이 콘텐츠를 승인하시겠습니까? 승인 시 발행 대기열(Queue)로 이동합니다.")) return
      comment = "승인되었습니다."
    }

    startTransition(async () => {
      const res = await processReviewTask(taskId, action, comment)
      if (!res.success) {
        alert("처리 실패: " + res.error)
      } else {
        alert(action === 'Approve' ? "승인되어 퍼블리싱 대기열로 이동했습니다!" : "반려 처리되었습니다.")
      }
    })
  }

  if (action === 'Approve') {
    return (
      <Button 
        variant="tool" 
        size="sm" 
        onClick={handleProcess}
        disabled={isPending}
        className="px-3 bg-success-50 text-success-700 hover:bg-success-100 border-none"
      >
        {isPending ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1.5" />}
        Approve
      </Button>
    )
  }

  return (
    <Button 
      variant="tool" 
      size="sm" 
      onClick={handleProcess}
      disabled={isPending}
      className="px-3 bg-danger-50 text-danger-700 hover:bg-danger-100 border-none"
    >
      {isPending ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <XCircle className="w-4 h-4 mr-1.5" />}
      Return
    </Button>
  )
}
