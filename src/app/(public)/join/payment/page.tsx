import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function JoinPaymentPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="가입 및 후원"
        defaultDescription="사단법인 문화강국네트워크의 비전에 동참해 주세요"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">가입 및 CMS 자동결제 연동 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
