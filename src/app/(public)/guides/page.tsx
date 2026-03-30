import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function GuidesPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="실무 가이드"
        defaultDescription="예술인과 단체를 위한 실무 지침서 및 Data/Brief/Calendar 활용법"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">실무 가이드 센터 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
