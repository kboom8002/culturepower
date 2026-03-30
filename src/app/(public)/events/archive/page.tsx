import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function EventArchivePage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="지난 행사 / 결과 보기"
        defaultDescription="행사 발표 자료와 결과 영상 아카이브"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">지난 행사 결과 보고서 아카이브입니다.</p>
        </div>
      </div>
    </div>
  )
}
