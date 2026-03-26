import { HeroSearch } from "@/components/domain/home/HeroSearch"
import { FeaturedAnswers } from "@/components/domain/home/FeaturedAnswers"
import { EditorCuration } from "@/components/domain/home/EditorCuration"
import { HomeTrustBlock } from "@/components/domain/home/HomeTrustBlock"
import { JoinCtaBlock } from "@/components/domain/home/JoinCtaBlock"

export const metadata = {
  title: "문화강국네트워크 - 공식 질문형 문화 플랫폼",
  description: "당신의 질문이 문화강국의 답이 됩니다. K-문명, 지역문화 자립, 글로벌 중추국가 아젠다를 정리한 해설 허브."
}

export default function HomePage() {
  return (
    <div className="w-full flex-col flex">
      <HeroSearch />
      <FeaturedAnswers />
      <EditorCuration />
      <HomeTrustBlock />
      <JoinCtaBlock />
    </div>
  )
}
