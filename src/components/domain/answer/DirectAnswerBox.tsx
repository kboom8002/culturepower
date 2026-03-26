import { Lightbulb } from "lucide-react"

export interface DirectAnswerBoxProps {
  answer: string
}

export function DirectAnswerBox({ answer }: DirectAnswerBoxProps) {
  return (
    <div className="p-8 bg-surface-answer rounded-2xl border border-[#BFD8F6] mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-brand-700" />
        <span className="text-[18px] font-bold text-brand-900">공식 정답</span>
      </div>
      <p className="text-body-lg text-neutral-900 font-medium whitespace-pre-wrap">
        {answer}
      </p>
    </div>
  )
}
