export interface DeckBlockProps {
  deck: string
}

export function DeckBlock({ deck }: DeckBlockProps) {
  return (
    <div className="mb-10 text-[20px] leading-[1.65] text-neutral-600 font-medium">
      <p>{deck}</p>
    </div>
  )
}
