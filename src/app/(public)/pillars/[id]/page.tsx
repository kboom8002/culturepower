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
      { id: 'ans-1', topic: '문화정책', pillar: 'Reform', title: '왜 문화정책의 구조개혁이 필요한가?', query: '기존의 하향식 예산 지급이 아닌...', snippet: '자생력을 갖춘 생태계 중심의 예산 펀딩 개편입니다.', updatedAt: '2026-03-20', isReviewed: true, href: '/answers/why-cultural-policy-structural-reform' },
      { id: 'ans-2', topic: '지역문화', pillar: 'Reform', title: '지역문화대전환은 무엇을 의미하는가?', query: '수도권 편중을 해소할...', snippet: '생활 구역 기반 문화 거점 인프라 확충.', updatedAt: '2026-03-21', isReviewed: false, href: '/answers/what-does-regional-culture-transition-mean' }
    ],
    stories: [
      { id: 'st-1', section: 'Policy Insight', title: '[제언] 문화정책, 왜 구조개혁이 필요한가?', href: '/webzine/stories/why-cultural-policy-structural-reform-is-needed' }
    ]
  },
  implementation: {
    title: "2. Implementation",
    description: "기획된 아젠다를 현실의 문화 현장과 지자체 행정에 적용하는 구체적인 실행 방법론입니다.",
    answers: [
      { id: 'ans-3', topic: '문화현장', pillar: 'Implementation', title: '예술인 복지 및 창작 환경 개선의 핵심 과제는?', query: '지속 가능한 창작을 위해...', snippet: '기업과 학계, 창작자가 연계된 SSoT 네트워크를 구성합니다.', updatedAt: '2026-03-22', isReviewed: true, href: '/answers/what-are-core-tasks-for-artist-welfare' },
      { id: 'ans-5', topic: '실무도구', pillar: 'Implementation', title: 'Data Lab은 어떤 실무적 유용함을 제공하는가?', query: '데이터 기반 정책 실행...', snippet: '지역별 자원과 재원 분포 현황을 제공합니다.', updatedAt: '2026-03-23', isReviewed: true, href: '/answers/what-does-data-lab-provide' }
    ],
    stories: [
      { id: 'st-2', section: '현장 인터뷰', title: '[현장] 지역문화대전환, 어떻게 정책이 되는가?', href: '/webzine/stories/how-regional-culture-transition-becomes-policy' }
    ]
  },
  outcomes: {
    title: "3. Outcomes",
    description: "개혁과 실행을 통해 창출된 사회적/경제적 파급 효과와 K-문명의 글로벌 확산 성과를 기록합니다.",
    answers: [
      { id: 'ans-4', topic: '문화강국', pillar: 'Outcomes', title: "우리가 말하는 '문화강국'이란 무엇인가?", query: '소프트파워를 넘어서...', snippet: '세계적 철학 담론을 이끌어가는 보편적 기준입니다.', updatedAt: '2026-03-25', isReviewed: true, href: '/answers/what-is-cultural-power' },
      { id: 'ans-6', topic: 'K-문명', pillar: 'Outcomes', title: 'K-문명이란 무엇인가?', query: '동특이성을 가진 보편...', snippet: '서구 문명의 한계를 극복하는 새로운 문명적 대안.', updatedAt: '2026-03-26', isReviewed: true, href: '/answers/what-is-k-civilization' }
    ],
    stories: [
      { id: 'st-3', section: 'Culture Power Report', title: '[대담] K-문명의 가능성과 문화국가 시스템', href: '/webzine/stories/k-civilization-possibility-culture-state-system' },
      { id: 'st-4', section: 'Culture Power Report', title: '[특별대담] BTS, 음악철학, 그리고 K-Culture의 향방', href: '/webzine/stories/bts-music-philosophy-k-culture-special-dialogue' }
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
