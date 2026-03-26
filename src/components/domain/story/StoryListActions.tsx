"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTransition } from "react"
import { deleteStory } from "@/lib/actions/story"
import { useRouter } from "next/navigation"

export function StoryListActions({ storyId, title }: { storyId: string, title: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (confirm(`'${title}' 기사를 정말 삭제하시겠습니까?`)) {
      startTransition(async () => {
        const res = await deleteStory(storyId)
        if (res.success) {
          alert('삭제되었습니다.')
          router.refresh()
        } else {
          alert(`삭제 실패: ${res.error}`)
        }
      })
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/admin/content/stories/${storyId}`}>
        <Button variant="secondary" size="sm" className="px-3" disabled={isPending}>
          Edit
        </Button>
      </Link>
      <Button 
        variant="tertiary" 
        size="sm" 
        className="px-3 text-danger-600 hover:text-danger-700 hover:bg-danger-50" 
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  )
}
