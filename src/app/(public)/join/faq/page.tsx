import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function JoinFaqPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="자주 묻는 질문"
        defaultDescription="가입, 후원, 혜택 관련 상세한 답변"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">FAQ 검색 시스템 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
