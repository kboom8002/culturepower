export interface EventHeroProps {
  title: string
  summary: string
}

export function EventHero({ title, summary }: EventHeroProps) {
  return (
    <div className="mb-8">
      <h1 className="text-h2 md:text-[40px] leading-[1.25] text-neutral-900 mb-6 text-balance tracking-tight font-bold">
        {title}
      </h1>
      <p className="text-[18px] leading-[1.65] text-neutral-600 font-medium">
        {summary}
      </p>
    </div>
  )
}
