import { Chip } from "@/components/ui/chip"

export interface AnswerMetaStripProps {
  topic: string
  pillar?: string
  isReviewed?: boolean
}

export function AnswerMetaStrip({ topic, pillar, isReviewed }: AnswerMetaStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <Chip variant="primary">{topic}</Chip>
      {pillar && (
        <span className="text-caption font-medium border border-line-default rounded-sm px-2 py-0.5 text-neutral-600 bg-white">
          {pillar}
        </span>
      )}
      {isReviewed && (
        <Chip variant="reviewed">검수 완료</Chip>
      )}
    </div>
  )
}
