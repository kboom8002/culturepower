import { MessageCircleQuestion } from "lucide-react"

export interface QuestionBubbleProps {
  question: string
}

export function QuestionBubble({ question }: QuestionBubbleProps) {
  return (
    <div className="flex items-start gap-4 p-6 bg-surface-muted rounded-2xl border border-line-default mb-6 relative">
      <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-line-default">
        <MessageCircleQuestion className="w-5 h-5 text-brand-700" />
      </div>
      <div>
        <span className="block text-brand-700 font-bold mb-1">Q. 사용자 질문</span>
        <h2 className="text-h3 text-neutral-900">
          {question}
        </h2>
      </div>
    </div>
  )
}
