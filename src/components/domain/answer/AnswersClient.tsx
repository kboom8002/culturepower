"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { FilterBar } from "@/components/layout/FilterBar"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { PublicAnswer } from "@/lib/actions/public"

const TOPIC_FILTERS = [
  { value: "all", label: "전체 정답카드" },
  { value: "culture", label: "문화강국" },
  { value: "k-civ", label: "K-문명" },
  { value: "local", label: "지역문화" },
  { value: "policy", label: "문화정책" },
  { value: "event", label: "행사/기록" },
  { value: "join", label: "참여/회원" }
]

export function AnswersClient({ initialAnswers }: { initialAnswers: PublicAnswer[] }) {
  const searchParams = useSearchParams()
  const initialTopic = searchParams.get("topic") || "all"
  const [activeFilter, setActiveFilter] = useState(initialTopic)

  useEffect(() => {
    const topic = searchParams.get("topic")
    if (topic) setActiveFilter(topic)
    else setActiveFilter("all")
  }, [searchParams])
  
  const filteredAnswers = activeFilter === "all" 
    ? initialAnswers 
    : initialAnswers.filter(a => a.topics?.slug === activeFilter)

  return (
    <main className="container mx-auto px-4 sm:px-6 max-w-6xl py-12">
      <FilterBar 
        options={TOPIC_FILTERS} 
        initialValue={activeFilter} 
        onChange={(val) => {
          setActiveFilter(val)
          window.history.replaceState(null, '', val === 'all' ? '/answers' : `/answers?topic=${val}`)
        }} 
      />
      
      {filteredAnswers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAnswers.map((ans) => (
            <AnswerCard
              key={ans.id}
              topic={ans.topics?.name || "분류 없음"}
              pillar={ans.topics?.description || ""}
              title={ans.title}
              query={ans.title} // For MVP, mapping answer title to query layout
              snippet={ans.content_body || ""}
              updatedAt={ans.published_at || ans.updated_at}
              isReviewed={true}
              href={`/answers/${ans.id}`} // We should implement answering by slug/id later
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-neutral-500">
          해당 주제에 승인된 정답카드가 아직 없습니다.
        </div>
      )}

      {/* Basic UI fallback for pagination as mock for MVP */}
    </main>
  )
}
