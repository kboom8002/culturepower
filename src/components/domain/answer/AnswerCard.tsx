import * as React from "react"
import Link from "next/link"
import { Chip } from "@/components/ui/chip"
import { Clock, ArrowRight } from "lucide-react"

export interface AnswerCardProps {
  topic: string
  pillar?: string
  title: string
  query: string
  snippet: string
  updatedAt: string
  isReviewed?: boolean
  href?: string
}

export function AnswerCard({
  topic,
  pillar,
  title,
  query,
  snippet,
  updatedAt,
  isReviewed = false,
  href
}: AnswerCardProps) {
  const InnerContent = (
    <>
      {/* Top Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Chip variant="primary">{topic}</Chip>
        {pillar && <span className="text-caption px-2 py-0.5 border border-line-default rounded-sm">{pillar}</span>}
        {isReviewed && <Chip variant="reviewed">검수 완료</Chip>}
      </div>
      
      {/* Title */}
      <h3 className="text-[22px] leading-[1.35] font-bold text-neutral-900 mb-4 group-hover:text-brand-700 transition-colors">
        {title}
      </h3>

      {/* Query & Snippet Box */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-start gap-2 text-[16px] leading-[1.55] font-medium text-neutral-700">
          <span className="text-brand-600 font-bold shrink-0">Q.</span>
          <p className="line-clamp-1">{query}</p>
        </div>
        <div className="text-body-sm text-neutral-600 bg-surface-answer rounded-md p-3 line-clamp-2">
          {snippet}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-line-default">
        <div className="flex items-center gap-1.5 text-caption text-neutral-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{new Date(updatedAt).toLocaleDateString("ko-KR")}</span>
        </div>
        
        {href && (
          <div className="flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:translate-x-1 transition-transform">
            정답 보기 <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </>
  )

  const cardClasses = "group flex flex-col bg-white border border-line-default rounded-xl p-6 min-h-[220px] shadow-sm hover:shadow-md hover:border-brand-600 transition-all cursor-pointer"

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {InnerContent}
      </Link>
    )
  }

  return (
    <div className={cardClasses}>
      {InnerContent}
    </div>
  )
}
