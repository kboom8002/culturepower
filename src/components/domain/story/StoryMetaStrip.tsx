import { Chip } from "@/components/ui/chip"
import { Clock, User } from "lucide-react"

export interface StoryMetaStripProps {
  section: string
  storyType: string
  authorName: string
  updatedAt: string
}

export function StoryMetaStrip({ section, storyType, authorName, updatedAt }: StoryMetaStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
      <div className="flex items-center gap-2">
        <Chip variant="default">{section}</Chip>
        <span className="text-caption font-medium border border-line-default rounded-sm px-2 py-0.5 text-neutral-600 bg-white">
          {storyType}
        </span>
      </div>
      
      <div className="h-4 w-px bg-line-default hidden sm:block" />
      
      <div className="flex items-center gap-4 text-caption text-neutral-500">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span className="font-medium text-neutral-700">{authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{new Date(updatedAt).toLocaleDateString("ko-KR")}</span>
        </div>
      </div>
    </div>
  )
}
