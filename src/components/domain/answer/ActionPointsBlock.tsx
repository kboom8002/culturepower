import { CheckCircle2 } from "lucide-react"

export interface ActionPoint {
  id: string
  title: string
  description: string
}

export interface ActionPointsBlockProps {
  points: ActionPoint[]
}

export function ActionPointsBlock({ points }: ActionPointsBlockProps) {
  if (!points || points.length === 0) return null

  return (
    <div className="mb-10">
      <h3 className="text-h4 text-neutral-900 mb-4">핵심 실행 방안</h3>
      <div className="flex flex-col gap-3">
        {points.map((pt, i) => (
          <div key={pt.id} className="flex gap-4 p-5 bg-white border border-line-default rounded-xl shadow-sm">
            <div className="shrink-0 mt-0.5">
              <CheckCircle2 className="w-6 h-6 text-brand-700" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">{i + 1}. {pt.title}</h4>
              <p className="text-body text-neutral-600">{pt.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
