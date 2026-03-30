import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function BriefsPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="One-Pager 브리프"
        defaultDescription="핵심 문제와 정책 대안을 한 장에 담아 전달하는 요약 보고서"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">One-Pager 브리프 시스템 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
