import { PageHeader } from "@/components/layout/PageHeader"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { ArrowRight, Video, FileText, Calendar } from "lucide-react"
import Link from "next/link"

// Dynamic route pre-generation
export function generateStaticParams() {
  return [
    { id: "reform" },
    { id: "implementation" },
    { id: "outcomes" },
  ]
}

const PILLAR_DATA: Record<string, any> = {
  reform: {
    title: "1. Reform",
    description: "관행적 예산 낭비를 막고 자생적인 문화 생태계를 구축하기 위한 근본적인 구조 개혁 과제입니다.",
    answers: [
      { id: 'ans-1', topic: '문화정책', pillar: 'Reform', title: '예산 분배 구조 혁신 방안은?', query: '기존의 하향식 예산 지급이 아닌...', snippet: '자생력을 갖춘 로컬 크리에이터 중심의 예산 펀딩 SSoT입니다.', updatedAt: '2026-03-20', isReviewed: true, href: '/answers/1' },
      { id: 'ans-2', topic: '지역문화', pillar: 'Reform', title: '지역 소멸 위기에 대응하는 거점 사업은?', query: '수도권 편중을 해소할...', snippet: '메가시티 기반 4대 거점 문화 인프라 확충.', updatedAt: '2026-03-21', isReviewed: false, href: '/answers/2' }
    ],
    stories: [
      { id: 'st-1', section: 'Policy Insight', title: '보조금 체계, 이제는 성과 바탕으로 개편해야', href: '/webzine/stories/1' }
    ]
  },
  implementation: {
    title: "2. Implementation",
    description: "기획된 아젠다를 현실의 문화 현장과 지자체 행정에 적용하는 구체적인 실행 방법론입니다.",
    answers: [
      { id: 'ans-3', topic: 'K-문명', pillar: 'Implementation', title: '글로벌 진출을 위한 산학연 협의체', query: '어떻게 시너지를 낼 것인가?', snippet: '기업과 학계, 창작자가 연계된 SSoT 네트워크를 구성합니다.', updatedAt: '2026-03-22', isReviewed: true, href: '/answers/3' }
    ],
    stories: [
      { id: 'st-2', section: '현장 인터뷰', title: '지역 크리에이터가 말하는 실전 행정 가이드', href: '/webzine/stories/2' }
    ]
  },
  outcomes: {
    title: "3. Outcomes",
    description: "개혁과 실행을 통해 창출된 사회적/경제적 파급 효과와 K-문명의 글로벌 확산 성과를 기록합니다.",
    answers: [
      { id: 'ans-4', topic: '문화강국', pillar: 'Outcomes', title: 'K-콘텐츠 산업 GDP 기여도 변화', query: '지난 3년 간의 경제 효과 측정', snippet: '수출 증가폭과 일자리 창출 효과를 종합한 지표가 마련되었습니다.', updatedAt: '2026-03-25', isReviewed: true, href: '/answers/4' }
    ],
    stories: [
      { id: 'st-3', section: 'Culture Power Report', title: '2026 대한민국 문화영향평가 결과 보고', href: '/webzine/stories/3' }
    ]
  }
}

export default async function PillarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pillar = PILLAR_DATA[id] || PILLAR_DATA["reform"];

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "3 Pillars", href: "/pillars/topics" },
          { label: pillar.title }
        ]}
        title={pillar.title}
        description={pillar.description}
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 flex flex-col gap-16">
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 text-neutral-900 border-l-4 border-brand-500 pl-3">대표 정답카드</h2>
            <Link href="/answers" className="text-sm font-bold text-brand-600 hover:text-brand-800 flex items-center">
              더 보기 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pillar.answers.map((ans: any) => (
              <AnswerCard key={ans.id} {...ans} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 text-neutral-900 border-l-4 border-brand-500 pl-3">관련 심층 Story</h2>
            <Link href="/webzine/stories" className="text-sm font-bold text-brand-600 hover:text-brand-800 flex items-center">
              문강 RIO 가기 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillar.stories.map((story: any) => (
              <Link key={story.id} href={story.href} className="group bg-white p-6 rounded-2xl border border-line-default hover:border-brand-600 transition-all shadow-sm">
                <span className="text-xs font-bold text-neutral-500 mb-2 block">{story.section}</span>
                <h3 className="text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 leading-snug">{story.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface-soft p-8 rounded-2xl border border-line-default">
            <h2 className="text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Video className="w-5 h-5 text-brand-600" />
              관련 행사/영상
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
                <Link href="/events" className="text-[15px] font-medium text-neutral-800 hover:text-brand-700 underline-offset-4 hover:underline">
                  제5차 {pillar.title} 과제 달성 정책 토론회 (2026.04)
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-surface-soft p-8 rounded-2xl border border-line-default">
            <h2 className="text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" />
              관련 데이터/자료
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
                <Link href="/data" className="text-[15px] font-medium text-neutral-800 hover:text-brand-700 underline-offset-4 hover:underline">
                  [Brief] {pillar.title} 3개년 예산 편성 가이드라인
                </Link>
              </li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  )
}
