import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { StoryMetaStrip } from "@/components/domain/story/StoryMetaStrip"
import { DeckBlock } from "@/components/domain/story/DeckBlock"
import { WhyThisMattersBox } from "@/components/domain/story/WhyThisMattersBox"
import { BasedOnAnswersList } from "@/components/domain/story/BasedOnAnswersList"
import { StoryBodyRichText } from "@/components/domain/story/StoryBodyRichText"
import { TrustStrip } from "@/components/domain/trust/TrustStrip"

// MOCK DATA
const MOCK_STORY = {
  section: "정책 하이라이트",
  storyType: "기획 기사",
  authorName: "김편집 편집장",
  updatedAt: "2026-03-24T12:00:00Z",
  title: "K-건축, 전 세계가 한옥의 철학을 주목하는 이유 3가지",
  deck: "기후 변화와 거주 환경의 위기 속에서 서구식 콘크리트 건축의 대안을 찾는 목소리가 높아지고 있습니다. 우리 고유의 방식이 어떻게 글로벌 스탠다드로 발전할 수 있는지 집중 조명합니다.",
  whyThisMatters: "단순히 '전통적인 옛집'을 홍보하는 차원을 넘어, 탄소 중립과 자연 친화적 거주 방식이라는 인류 보편의 과제에 대해 K-건축이 하나의 대안적 정답이 될 수 있음을 증명하는 핵심 사례입니다. 이는 K-문명의 담론 확장성에 중요한 지표가 됩니다.",
  basedOnAnswers: [
    {
      id: "a1",
      title: "K-문명이라는 개념은 언제 처음 공식화되었나요?",
      href: "/answers/k-civilization-origin"
    },
    {
      id: "a2",
      title: "한국 전통문화의 글로벌 진출 방향성은?",
      href: "/answers/traditional-culture-global"
    }
  ],
  bodyHTML: `
    <h2>1. 공간과 자연이 끊기지 않는 순환 구조</h2>
    <p>한옥의 진정한 가치는 기와의 곡선이나 나무 기둥의 형태에 머물지 않습니다. 서구의 건축이 외부 환경(추위, 더위)과 내부 공간을 완벽히 차단하고 통제하는 데 집중했다면, 한옥은 처마와 대청마루를 통해 외부의 빛과 바람을 어떻게 조절하고 끌어들일 것인가에 집중했습니다.</p>
    <p>이러한 <strong>차경(借景)</strong>과 자연을 거스르지 않는 철학은 냉난방 에너지를 줄이고 탄소 발생을 억제해야 하는 현대 건축의 가장 큰 숙제를 해결할 열쇠로 세계 유수 건축가들의 이목을 끌고 있습니다.</p>
    
    <blockquote>
      "한옥은 집을 짓는 기술이 아니라 환경에 적응하는 태도입니다. 콘크리트로 똑같은 형태를 만든다고 한옥이 되는 것이 아닙니다." 
      <br/>- 최현석 건축가 (2025 글로벌 건축 포럼 발제문 중)
    </blockquote>
    
    <h2>2. 조립식 모듈러 발전의 가능성</h2>
    <p>한옥은 애초에 기둥과 보를 짜맞추는 방식(결구법)을 사용해왔기 때문에 현대식 '프리패브(Prefab) 모듈러 건축' 방식과 기술적으로 맞닿아 있습니다.</p>
    <p>문화강국네트워크는 기존에 수작업에 의존하던 전통 결구 방식을 철골과 현대식 집성목재를 활용한 모듈 구조로 표준화하는 국토부의 R&D 사업이 글로벌 상품성이 높다고 분석합니다. 이는 한국형 주거 문화가 K-콘텐츠의 배경을 넘어 그 자체로 인프라 수출의 축이 될 수 있음을 시사합니다.</p>
    
    <h2>3. 맺음말: 형태가 아닌 철학의 수출</h2>
    <p>결국 K-문명으로서의 건축 담론은 '우리 것이 아름답다'는 홍보에 머물러서는 안 됩니다. 전 세계가 직면한 기후 위기와 단절된 주거 환경에 대해, 자연과의 공존과 마을 공동체(마당)의 회복이라는 메시지를 던져야만 비로소 보편적 가치체계로 인정받을 수 있습니다.</p>
  `,
  trust: {
    reviewerName: "이건축 (자문위원)",
    reviewerRole: "외부 자문단",
    authorName: "김편집 편집장",
    updatedAt: "2026-03-24T12:00:00Z"
  }
}

export default function StoryDetailPage() {
  const data = MOCK_STORY

  return (
    <div className="w-full bg-surface-page py-10 md:py-16">
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl bg-white p-6 md:p-12 md:py-16 rounded-3xl shadow-sm border border-line-default">
        
        {/* Navigation & Meta */}
        <Breadcrumb 
          items={[
            { label: "문강 RIO", href: "/webzine/stories" },
            { label: data.section },
            { label: "상세" }
          ]} 
        />
        
        <StoryMetaStrip 
          section={data.section}
          storyType={data.storyType}
          authorName={data.authorName}
          updatedAt={data.updatedAt}
        />
        
        {/* Title & Deck */}
        <h1 className="text-h2 md:text-[44px] leading-[1.2] text-neutral-900 mb-6 text-balance tracking-tight font-bold">
          {data.title}
        </h1>
        
        <DeckBlock deck={data.deck} />

        {/* Core Importance Box */}
        <WhyThisMattersBox content={data.whyThisMatters} />

        {/* Foundation & Context Navigation */}
        <BasedOnAnswersList answers={data.basedOnAnswers} />

        {/* Main Editorial Content */}
        <StoryBodyRichText contentRichText={data.bodyHTML} />

        {/* Trust & Meta Footer */}
        <div className="pt-10 border-t border-line-strong flex flex-col gap-8 mt-16">
          <TrustStrip 
            reviewerName={data.trust.reviewerName}
            reviewerRole={data.trust.reviewerRole}
            authorName={data.trust.authorName}
            updatedAt={data.trust.updatedAt}
          />
        </div>
        
      </article>
    </div>
  )
}
