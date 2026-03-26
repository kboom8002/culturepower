import Link from "next/link"
import { ArrowRight, MessageCircleQuestion } from "lucide-react"

export interface LinkedAnswer {
  id: string
  title: string
  href: string
}

export interface BasedOnAnswersListProps {
  answers: LinkedAnswer[]
}

export function BasedOnAnswersList({ answers }: BasedOnAnswersListProps) {
  if (!answers || answers.length === 0) return null

  return (
    <div className="mb-12 border-t border-line-default pt-8">
      <h3 className="text-h4 text-neutral-900 mb-4">관련 공식 정답</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {answers.map((ans) => (
          <Link 
            key={ans.id} 
            href={ans.href}
            className="flex items-start gap-3 p-4 bg-white border border-line-default rounded-xl hover:border-brand-600 hover:shadow-sm transition-all group"
          >
            <div className="shrink-0 w-8 h-8 bg-surface-muted rounded-full flex items-center justify-center">
              <MessageCircleQuestion className="w-4 h-4 text-brand-700" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-body-sm font-medium text-neutral-900 group-hover:text-brand-700 mb-1 line-clamp-2">
                {ans.title}
              </span>
              <span className="text-caption text-brand-700 flex items-center group-hover:translate-x-1 transition-transform">
                정답카드 보기 <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
