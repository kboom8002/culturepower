import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function JoinBenefitsPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="회원 혜택"
        defaultDescription="정기구독 콘텐츠, 행사 초청 등 특별한 혜택을 확인하세요"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">회원 혜택 상세 안내 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
