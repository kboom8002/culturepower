import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function ReportsPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="이슈 리포트"
        defaultDescription="정책 동향과 현장 이슈를 깊이 있게 분석한 정기/수시 리포트"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">이슈 리포트 열람 시스템 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
