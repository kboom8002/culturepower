import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { AnswerMetaStrip } from "@/components/domain/answer/AnswerMetaStrip"
import { QuestionBubble } from "@/components/domain/answer/QuestionBubble"
import { DirectAnswerBox } from "@/components/domain/answer/DirectAnswerBox"
import { ActionPointsBlock } from "@/components/domain/answer/ActionPointsBlock"
import { ContextBlock } from "@/components/domain/answer/ContextBlock"
import { TrustStrip } from "@/components/domain/trust/TrustStrip"
import { EvidenceList } from "@/components/domain/trust/EvidenceList"
import { ShareButtons } from "@/components/ui/ShareButtons"

// MOCK DATA
const MOCK_ANSWER = {
  title: "K-문명이라는 개념은 언제 처음 공식화되었나요?",
  topic: "K-문명",
  pillar: "Pillar 1",
  isReviewed: true,
  question: "최근 자주 언급되는 K-문명의 기원과 문화강국네트워크에서의 공식 정의를 정확히 알고 싶습니다.",
  directAnswer: "K-문명은 단순한 한류(K-Wave)의 대중적 유행을 넘어, 한국의 문화적 저력이 세계 보편의 대안적 가치 체계로 승화된 단계를 의미합니다. 문화강국네트워크는 이를 2025년 기조 연설을 통해 최초로 학술적/실천적 담론으로 공식화했습니다.",
  actionPoints: [
    {
      id: "a1",
      title: "단어 사용의 정립",
      description: "단순 '대중문화 현상'을 지칭할 때는 K-pop, K-콘텐츠를 사용하고, 철학과 생활 양식이 결합된 총체적 패러다임을 논할 때만 'K-문명'을 사용합니다."
    },
    {
      id: "a2",
      title: "글로벌 중추 의제화",
      description: "글로벌 사우스(Global South) 등 제3세계 국가들과의 문화 외교 시 K-문명이 담고 있는 포용성과 발전 모델을 주요 어젠다로 삼습니다."
    }
  ],
  contextHTML: `
    <h3>1. K-문명의 등장 배경</h3>
    <p>과거 한국 문화는 서구의 영향을 받아 성장하는 수용적 위치에 있었습니다. 하지만 2020년대 이후 한국의 콘텐츠는 전 세계적인 공감을 이끌어내며 일방향적 수용을 넘어섰습니다.</p>
    <p>이러한 현상을 설명하기 위해 단순한 '콘텐츠 수출'을 넘어서는 패러다임이 필요했고, 그것이 바로 <strong>K-문명</strong> 담론의 출발점이 되었습니다.</p>
    <h3>2. 정책적 함의</h3>
    <p>K-문명을 국정 철학과 외교 정책의 근간으로 삼는다는 것은, 더 이상 경제력이나 군사력(Hard Power)에만 의존하지 않고 문화적 매력도(Soft Power)를 무기로 국제 사회를 선도하겠다는 '글로벌 중추국가' 비전과 정확히 맞닿아 있습니다.</p>
  `,
  trust: {
    reviewerName: "김편집",
    reviewerRole: "총괄 에디터",
    authorName: "이정책 리서처",
    updatedAt: "2026-03-24T10:00:00Z"
  },
  evidences: [
    {
      id: "e1",
      title: "2025년 문화강국 비전 선포식 기조연설문",
      sourceType: "공식 발제문",
      date: "2025-11-20T00:00:00Z",
      url: "#"
    },
    {
      id: "e2",
      title: "문강 RIO Vol. 3: K-문명의 조건",
      sourceType: "자체 발행물",
      date: "2026-01-15T00:00:00Z",
      url: "#"
    }
  ]
}

export default function AnswerDetailPage() {
  const data = MOCK_ANSWER

  return (
    <div className="w-full bg-surface-page py-10 md:py-16">
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-line-default">
        
        {/* Navigation & Meta */}
        <Breadcrumb 
          items={[
            { label: "정답카드", href: "/answers" },
            { label: data.topic, href: "/pillars/topics/k-civilization" },
            { label: "상세" }
          ]} 
        />
        
        <AnswerMetaStrip 
          topic={data.topic} 
          pillar={data.pillar} 
          isReviewed={data.isReviewed} 
        />
        
        <h1 className="text-h2 md:text-h1 text-neutral-900 mb-2 text-balance tracking-tight">
          {data.title}
        </h1>

        <ShareButtons title={data.title} description={data.directAnswer} />

        {/* Answer First Block */}
        <QuestionBubble question={data.question} />
        <DirectAnswerBox answer={data.directAnswer} />

        {/* Action Points */}
        <ActionPointsBlock points={data.actionPoints} />

        {/* Context */}
        <ContextBlock contentRichText={data.contextHTML} />

        {/* Evidence & Trust */}
        <div className="pt-10 border-t border-line-strong flex flex-col gap-8">
          <TrustStrip 
            reviewerName={data.trust.reviewerName}
            reviewerRole={data.trust.reviewerRole}
            authorName={data.trust.authorName}
            updatedAt={data.trust.updatedAt}
          />
          <EvidenceList items={data.evidences} />
        </div>
        
      </article>
    </div>
  )
}
