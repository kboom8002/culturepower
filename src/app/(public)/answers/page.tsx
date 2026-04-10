import { Suspense } from "react"
import { ShieldCheck, Database, Link as LinkIcon, HelpCircle, Star } from "lucide-react"
import { AnswersHubClient } from "@/components/domain/answer/AnswersHubClient"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { getPublicAnswers } from "@/lib/actions/public"
import { getTopics } from "@/lib/actions/content"
import { getFeaturedSlots } from "@/lib/actions/publishing"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function AnswersIndexPage() {
  const [answers, topics, featuredSlots] = await Promise.all([
    getPublicAnswers(),
    getTopics(),
    getFeaturedSlots('answers_hub')
  ])
  
  // 1. Curation Mapping
  const featuredIds = featuredSlots.map(f => f.content_id)
  const curatedAnswers = answers.filter(a => featuredIds.includes(a.id)).slice(0, 3) // 탑 3개

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {/* 1. 고도화된 Hero 섹션 (기존 about 페이지 내용 통합) */}
      <section className="relative w-full bg-neutral-900 overflow-hidden pt-28 pb-20 px-4">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-page to-transparent z-10"></div>
        <div className="container relative z-20 mx-auto max-w-6xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-brand-600/20 text-brand-300 font-bold text-sm tracking-wider border border-brand-500/30">
            <Database className="w-4 h-4" />
            SSoT Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            단 하나의 진실 기준표,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white mt-2 block">정답카드 (Answers)</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl font-medium mb-12">
            산발적으로 흩어진 담론 사이에서 길을 잃지 않도록,<br className="hidden md:block"/>
            명확한 사실 관계와 솔루션만을 압축한 AEO(Answer Engine) 지식 허브입니다.
          </p>
          
          {/* SSoT 핵심 가치 칩 (간소화 통합) */}
          <div className="flex flex-wrap justify-center gap-4">
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full border border-white/10">
                <HelpCircle className="w-5 h-5 text-brand-400" />
                <span className="text-white font-bold text-sm">Clarity (명확성)</span>
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full border border-white/10">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
                <span className="text-white font-bold text-sm">Verification (검증)</span>
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full border border-white/10">
                <LinkIcon className="w-5 h-5 text-brand-400" />
                <span className="text-white font-bold text-sm">Connectivity (연결)</span>
             </div>
          </div>
        </div>
      </section>

      {/* 2. 큐레이션 정답카드 구역 */}
      {curatedAnswers.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 relative z-30 -mt-10 mb-16">
          <div className="bg-brand-900 border border-brand-800 p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-800 pb-4">
               <Star className="w-6 h-6 text-brand-300 fill-brand-300" />
               <h2 className="text-2xl font-bold text-white tracking-tight">큐레이션 정답카드</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {curatedAnswers.map((ans) => (
                <AnswerCard
                  key={ans.id}
                  topic={ans.topics?.name || "분류 없음"}
                  pillar="주요 슬롯"
                  title={ans.title}
                  query={ans.title}
                  snippet={ans.summary || ans.content_body || ""}
                  updatedAt={ans.published_at || ans.updated_at}
                  isReviewed={true}
                  href={`/answers/${ans.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. 토픽별 탐색 허브 및 피드 */}
      <section className="container mx-auto px-4 sm:px-6 mb-20">
        <Suspense fallback={<div className="py-24 text-center">정답카드를 불러오는 중입니다...</div>}>
          <AnswersHubClient answers={answers} topics={topics} />
        </Suspense>
      </section>
      
    </div>
  )
}
