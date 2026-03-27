"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { assignReviewTask } from "@/lib/actions/review"
import { UserPlus, Loader2 } from "lucide-react"

export function ReviewAssignBtn({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition()

  const handleAssign = () => {
    startTransition(async () => {
      // In MVP, we use a generic placeholder ID for the reviewer
      const res = await assignReviewTask(taskId, "admin-user")
      if (!res.success) {
        alert("할당 실패: " + res.error)
      } else {
        alert("내 보관함으로 할당되었습니다!")
      }
    })
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
