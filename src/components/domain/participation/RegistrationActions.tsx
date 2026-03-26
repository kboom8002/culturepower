"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { updateRegistrationStatus, EventRegistration } from "@/lib/actions/participation"
import { CheckCircle2, Ban } from "lucide-react"
import { useRouter } from "next/navigation"

export function RegistrationActions({ reg }: { reg: EventRegistration }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleAttendance = async (is_attended: boolean) => {
    startTransition(async () => {
      const res = await updateRegistrationStatus(reg.id, { is_attended })
      if (res.success) {
        router.refresh()
      } else {
        alert(res.error)
      }
    })
  }

  const handleCancel = async () => {
    if(!confirm("참석을 취소(Cancelled)하시겠습니까?")) return
    startTransition(async () => {
      const res = await updateRegistrationStatus(reg.id, { status: 'Cancelled' })
      if (res.success) {
        router.refresh()
      } else {
        alert(res.error)
      }
    })
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {!reg.is_attended && reg.status !== 'Cancelled' && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="px-3" 
          onClick={() => handleAttendance(true)}
          disabled={isPending}
        >
          <CheckCircle2 className="w-4 h-4 mr-1 text-success-600" />
          출석체크
        </Button>
      )}
      {reg.is_attended && (
        <Button 
          variant="tertiary" 
          size="sm" 
          className="px-3 text-neutral-500" 
          onClick={() => handleAttendance(false)}
          disabled={isPending}
        >
          출석 취소
        </Button>
      )}
      {reg.status !== 'Cancelled' && (
        <Button 
           variant="tertiary" 
           size="sm" 
           className="px-3 text-danger-500 hover:text-danger-600" 
           onClick={handleCancel}
           disabled={isPending}
        >
          <Ban className="w-4 h-4 mr-1" /> 예약취소
        </Button>
      )}
    </div>
  )
}
