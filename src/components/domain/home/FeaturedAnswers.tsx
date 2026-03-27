import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
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
          {answers.map((ans: any) => (
            <AnswerCard
              key={ans.id}
              topic={ans.topics?.name || "일반"}
              pillar="정책/이슈"
              title={ans.title}
              query={ans.direct_answer ? ans.direct_answer.substring(0, 50) + "..." : "질문 요약"}
              snippet={(ans.context || "").substring(0, 100) + "..."}
              updatedAt={ans.published_at || ans.updated_at}
              isReviewed={true}
              href={`/answers/${ans.id}`}
            />
          ))}
        </div>
        
      </div>
    </section>
  )
}
