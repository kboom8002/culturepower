import { Suspense } from "react"
import { ShieldCheck, Database, Link as LinkIcon, HelpCircle, Star } from "lucide-react"
import { AnswersHubClient } from "@/components/domain/answer/AnswersHubClient"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { getPublicAnswers } from "@/lib/actions/public"
import { getTopics } from "@/lib/actions/content"
import { getFeaturedSlots } from "@/lib/actions/publishing"
import { FAQPageJsonLd } from "@/components/seo/JsonLd"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export const metadata = {
  title: "정답카드",
  description: "산발적으로 흩어진 담론 사이에서 길을 잃지 않도록, 명확한 사실 관계와 솔루션만을 압축한 AEO(Answer Engine) 지식 허브입니다."
}

export default async function AnswersIndexPage() {
  const [answers, topics, featuredSlots] = await Promise.all([
    getPublicAnswers(),
    getTopics(),
    getFeaturedSlots('answers_hub')
  ])
  
  // 1. Curation Mapping
  const featuredIds = featuredSlots.map(f => f.content_id)
  const curatedAnswers = answers.filter(a => featuredIds.includes(a.id)).slice(0, 3) // 탑 3개

  const faqs = curatedAnswers.map(a => ({
    question: a.title,
    answer: a.summary || "본문을 확인하세요."
  }))

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {faqs.length > 0 && <FAQPageJsonLd faqs={faqs} />}
      {/* 1. 고도화된 Hero 섹션 (기존 about 페이지 내용 통합) */}
      <section className="relative w-full bg-brand-950 overflow-hidden pt-16 pb-12 px-4 shadow-inner">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-page to-transparent z-10"></div>
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-white/10 text-white font-extrabold text-sm tracking-widest border border-white/20 shadow-sm backdrop-blur-sm">
            <Database className="w-4 h-4 text-brand-300" />
            SSoT Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight drop-shadow-md">
            단 하나의 진실 기준표,<br />
            <span className="text-brand-400 mt-2 block drop-shadow-sm">정답카드 (Answers)</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-semibold mb-10 drop-shadow-sm">
            산발적으로 흩어진 담론 사이에서 길을 잃지 않도록,<br className="hidden md:block"/>
            명확한 사실 관계와 솔루션만을 압축한 AEO 지식 허브입니다.
          </p>
          
          {/* SSoT 핵심 가치 칩 (가독성 개선) */}
          <div className="flex flex-wrap justify-center gap-4">
             <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-lg border border-line-soft">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                <span className="text-neutral-900 font-extrabold text-sm">Clarity (명확성)</span>
             </div>
             <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-lg border border-line-soft">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span className="text-neutral-900 font-extrabold text-sm">Verification (검증)</span>
             </div>
             <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-lg border border-line-soft">
                <LinkIcon className="w-5 h-5 text-brand-600" />
                <span className="text-neutral-900 font-extrabold text-sm">Connectivity (연결)</span>
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
