"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { publishImmediately } from "@/lib/actions/publishing"
import { Rocket, Loader2 } from "lucide-react"

type Props = {
  itemId: string
  contentType: 'Story' | 'Answer'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
}

export function PublishActionBtn({ itemId, contentType, variant = 'primary' }: Props) {
  const [isPending, startTransition] = useTransition()

  const handlePublish = () => {
    if(!confirm(`해당 ${contentType} 컨텐츠를 지금 즉시 발행(Public)하시겠습니까?`)) return
    startTransition(async () => {
      const res = await publishImmediately(itemId, contentType)
      if (!res.success) {
        alert(res.error)
      } else {
         alert("발행 완료되었습니다.")
      }
    })
  }

  return (
    <Button 
      variant={variant as any} 
      size="sm" 
      onClick={handlePublish}
      disabled={isPending}
      className="px-3 min-w-[100px]"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Rocket className="w-4 h-4 mr-1" />}
      {isPending ? "발행 중..." : "지금 발행"}
    </Button>
  )
}
