import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default function JoinAboutPage() {
  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="회원 소개"
        defaultDescription="누구를 위한 커뮤니티인가? 연대하는 문화인들의 모임"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
          <p className="text-lg font-medium">회원 소개 안내 페이지 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
