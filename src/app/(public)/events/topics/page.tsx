import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function EventTopicsPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="주제별 행사"
        defaultDescription="핵심 아젠다별로 분류된 문강 네트워크의 다양한 활동"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">주제별 검색 시스템 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
