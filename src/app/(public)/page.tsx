import { HeroSearch } from "@/components/domain/home/HeroSearch"
import { HomeAboutSummary } from "@/components/domain/home/HomeAboutSummary"
import { HomeVisionMission } from "@/components/domain/home/HomeVisionMission"
import { HomeActivities } from "@/components/domain/home/HomeActivities"
import { HomeRioIntro } from "@/components/domain/home/HomeRioIntro"
import { FeaturedAnswers } from "@/components/domain/home/FeaturedAnswers"
import { HomeEventsHighlight } from "@/components/domain/home/HomeEventsHighlight"
import { HomeDataTools } from "@/components/domain/home/HomeDataTools"
import { HomeRecentTimeline } from "@/components/domain/home/HomeRecentTimeline"
import { JoinCtaBlock } from "@/components/domain/home/JoinCtaBlock"
import { OrganizationJsonLd } from "@/components/seo/JsonLd"

export const metadata = {
  title: "문화강국네트워크 - 공식 질문형 문화 플랫폼",
  description: "당신의 질문이 문화강국의 답이 됩니다. K-문명, 지역문화 자립, 글로벌 중추국가 아젠다를 정리한 해설 허브."
}

export default function HomePage() {
  return (
    <div className="w-full flex-col flex bg-white overflow-hidden">
      <OrganizationJsonLd />
      <HeroSearch />
      <HomeAboutSummary />
      <HomeVisionMission />
      <HomeActivities />
      <HomeRioIntro />
      <FeaturedAnswers />
      <HomeEventsHighlight />
      <HomeDataTools />
      <HomeRecentTimeline />
      <JoinCtaBlock />
    </div>
  )
}
