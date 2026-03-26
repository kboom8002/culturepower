import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const MOCK_ANSWERS = [
  {
    id: "1",
    topic: "K-문명",
    pillar: "Pillar 1",
    title: "K-문명이라는 개념은 언제 처음 공식화되었나요?",
    query: "최근 자주 언급되는 K-문명의 기원과 공식 정의를 알고 싶습니다.",
    snippet: "K-문명은 단순한 한류의 유행을 넘어, 한국의 문화적 저력이 세계 보편의 대안적 가치 체계로 승화된 단계입니다. 문화강국네트워크는 이를 2025년 기조 연설을 통해 최초로 학술적...",
    updatedAt: "2026-03-20T10:00:00Z",
    isReviewed: true,
    href: "/answers/k-civilization-origin"
  },
  {
    id: "2",
    topic: "지역문화",
    pillar: "Pillar 2",
    title: "지역소멸 위기 속에서 문화 예산은 어떻게 쓰여야 하는가",
    query: "소멸 지역에서 보여주기식 축제가 아닌 자생적 문화를 기르려면?",
    snippet: "행사 중심의 예산 집행을 지양하고, 지역 창작자들의 거점 공간 마련 및 장기 체류형 아티스트 레지던시를 지원하는 방향으로 정책이 재편되어야 합니다. 이는 생활 연결성의 3대 원칙인...",
    updatedAt: "2026-03-24T14:30:00Z",
    isReviewed: true,
    href: "/answers/local-culture-budget"
  },
  {
    id: "3",
    topic: "글로벌 중추",
    pillar: "Pillar 3",
    title: "K-콘텐츠 수출액 증가율과 연계된 정책 효과",
    query: "실제 수출 데이터 기반으로 본 정책적 성공 요인",
    snippet: "핵심 요인은 콘텐츠 IP(지식재산권)의 2차 활용을 독려하는 모태펀드 확대와 글로벌 번역/자막 지원 인프라의 확충이었습니다. 단순 제작을 넘어 법적 체계를 닦은 것이 유효...",
    updatedAt: "2026-03-26T09:12:00Z",
    isReviewed: false,
    href: "/answers/k-content-export"
  }
]

export function FeaturedAnswers() {
  return (
    <section className="py-20 bg-surface-muted">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-h3 text-brand-900 mb-2">최근 업데이트된 정답카드</h2>
            <p className="text-body text-neutral-600">핵심 아젠다에 대한 가장 명확하고 검증된 해설을 제공합니다.</p>
          </div>
          <Button variant="secondary" asChild className="shrink-0">
            <Link href="/answers">
              전체 보기 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ANSWERS.map((ans) => (
            <AnswerCard
              key={ans.id}
              topic={ans.topic}
              pillar={ans.pillar}
              title={ans.title}
              query={ans.query}
              snippet={ans.snippet}
              updatedAt={ans.updatedAt}
              isReviewed={ans.isReviewed}
              href={ans.href}
            />
          ))}
        </div>
        
      </div>
    </section>
  )
}
