"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { assignReviewTask } from "@/lib/actions/review"
import { UserPlus, Loader2 } from "lucide-react"

export function ReviewAssignBtn({ taskId }: { taskId: string }) {
  const [isPending, setIsPending] = useState(false)

  const handleAssign = async () => {
    setIsPending(true)
    try {
      const res = await assignReviewTask(taskId)
      if (!res.success) {
        alert("할당 실패: " + res.error)
      } else {
        alert("내 보관함으로 할당되었습니다!")
      }
    } catch (e: any) {
      alert("서버 연결 오류: " + e.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button 
      variant="primary" 
      size="sm" 
      onClick={handleAssign}
      disabled={isPending}
      className="px-4"
    >
      {isPending ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <UserPlus className="w-4 h-4 mr-1.5" />}
      나에게 할당
    </Button>
  )
}
