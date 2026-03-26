import Link from "next/link"
import { PageHeader } from "@/components/layout/PageHeader"
import { ArrowRight, MessageSquareQuote, Target } from "lucide-react"

const MOCK_TOPICS = [
  {
    id: "civic",
    title: "K-문명과 새로운 상상력",
    description: "한류를 넘어 세계 보편의 문화 대안으로 나아가는 K-문명의 철학과 정책 과제를 탐구합니다.",
    answerCount: 34,
    link: "/answers?topic=civic"
  },
  {
    id: "local",
    title: "지역소멸 방어와 문화 분권",
    description: "인구 감소 위기에 대응하는 진정한 의미의 지역 자생력 확보와 문화 자산 연계를 다룹니다.",
    answerCount: 12,
    link: "/answers?topic=local"
  },
  {
    id: "policy",
    title: "미래 문화예술 정책망",
    description: "창작자의 권리 보호, AI 시대의 예술, 그리고 국가 예산의 올바른 투입 방향성을 정리합니다.",
    answerCount: 28,
    link: "/answers?topic=policy"
  }
]

export default function TopicsPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-20">
      <PageHeader 
        breadcrumbs={[{ label: "아젠다 톺아보기" }]}
        title="문화 정책 아젠다 톺아보기"
        description="네트워크가 집중적으로 탐구하고 정답을 축적 중인 핵심 논제를 확인하세요."
      />

      <main className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TOPICS.map((topic) => (
            <Link 
              key={topic.id} 
              href={topic.link}
              className="group bg-white flex flex-col p-8 rounded-3xl border border-line-default shadow-sm hover:border-brand-500 hover:shadow-md transition-all h-full"
            >
              <div className="w-12 h-12 bg-surface-soft rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-050 transition-colors">
                <Target className="w-6 h-6 text-neutral-600 group-hover:text-brand-700" />
              </div>
              
              <h2 className="text-[20px] font-bold text-neutral-900 mb-3">{topic.title}</h2>
              <p className="text-body-sm text-neutral-600 mb-8 flex-1 leading-relaxed">
                {topic.description}
              </p>
              
              <div className="pt-6 border-t border-line-default flex items-center justify-between mt-auto">
                <span className="flex items-center text-caption text-neutral-500 gap-1.5 font-medium">
                  <MessageSquareQuote className="w-4 h-4" />
                  {topic.answerCount} Answers
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
