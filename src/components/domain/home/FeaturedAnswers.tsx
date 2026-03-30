import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import { getFeaturedSlots } from "@/lib/actions/publishing"
import { getPublicAnswers } from "@/lib/actions/public"

export async function FeaturedAnswers() {
  const featured = await getFeaturedSlots('Home Answers')
  const allAnswers = await getPublicAnswers()
  
  // Map featured IDs to actual answer objects
  const answers = featured
    .sort((a, b) => a.display_order - b.display_order)
    .map(f => allAnswers.find(a => a.id === f.content_id))
    .filter(Boolean)

  if (answers.length === 0) return null // Hide section if nothing is featured
  
  const heroAns: any = answers[0];
  const sideAnswers = answers.slice(1, 3); // 최대 2개만 우측 랭킹 노출

  return (
    <section className="py-20 bg-surface-muted">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-h3 text-brand-900 mb-2 font-bold flex items-center gap-2">
               <Sparkles className="w-6 h-6 text-brand-500" />
               주간 TOP 아젠다 검증
            </h2>
            <p className="text-body text-neutral-600">중요도가 가장 높은 핵심 질문들에 대한 SSoT(검증된 단일 정답)를 제공합니다.</p>
          </div>
          <Button variant="secondary" asChild className="shrink-0">
            <Link href="/answers">
              모든 정답카드 보기 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        {/* Bento Box Layout (7:3) */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Hero Card (Left 70%) */}
          <div className="lg:w-[70%]">
            <Link 
              href={`/answers/${heroAns.slug}`} 
              className="group relative flex flex-col justify-end bg-[#1C2127] border border-line-strong rounded-2xl p-8 md:p-12 min-h-[460px] h-full shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
            >
              {/* Background gradient/decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/60 to-transparent z-0 opacity-50 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col gap-4 mt-auto w-full max-w-[80%]">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="bg-brand-500 text-white font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">Editor's Pick</span>
                  <span className="text-white/80 text-sm font-medium">{heroAns.topics?.name || "분류 없음"}</span>
                </div>
                
                <h3 className="text-white text-3xl md:text-4xl font-extrabold leading-tight text-balance group-hover:text-brand-300 transition-colors">
                  {heroAns.title}
                </h3>
                
                <p className="text-neutral-300 text-lg line-clamp-2 mt-4 max-w-[90%] font-medium">
                  {heroAns.summary || "본문 요약 내용이 이 곳에 노출됩니다."}
                </p>
                
                <div className="flex items-center gap-2 mt-8 text-white/50 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(heroAns.published_at || heroAns.updated_at).toLocaleDateString("ko-KR")}</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Side Ranking List (Right 30%) */}
          <div className="lg:w-[30%] flex flex-col gap-5">
            {sideAnswers.map((ans: any) => (
              <AnswerCard
                key={ans.id}
                topic={ans.topics?.name || "일반"}
                pillar="정책/이슈"
                title={ans.title}
                query={ans.title}
                snippet={(ans.summary || "").substring(0, 100) + "..."}
                updatedAt={ans.published_at || ans.updated_at}
                isReviewed={true}
                href={`/answers/${ans.slug}`}
              />
            ))}
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
