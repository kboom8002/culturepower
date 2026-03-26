import { Lightbulb } from "lucide-react"

export interface WhyThisMattersBoxProps {
  content: string
}

export function WhyThisMattersBox({ content }: WhyThisMattersBoxProps) {
  return (
    <div className="p-6 md:p-8 bg-surface-muted rounded-2xl border border-line-strong mb-10">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-brand-700" />
        <span className="text-[16px] font-bold text-brand-900 tracking-tight">왜 이것이 중요한가</span>
      </div>
      <p className="text-body text-neutral-700 font-medium whitespace-pre-wrap">
        {content}
      </p>
    </div>
  )
}
