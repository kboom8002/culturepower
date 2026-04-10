"use client"

import { useState, useRef, useEffect } from "react"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { PublicAnswer } from "@/lib/actions/public"
import { ContentTopic } from "@/lib/actions/content"

export function AnswersHubClient({ 
  answers, 
  topics 
}: { 
  answers: PublicAnswer[], 
  topics: ContentTopic[] 
}) {
  const [activeTopic, setActiveTopic] = useState<string>("all")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 가로 스크롤 휠 처리
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      // deltaY가 있을 때만 좌우 스크롤로 변환
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        e.preventDefault()
        el.scrollLeft += e.deltaY * 2 // 스크롤 속도
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const filteredAnswers = activeTopic === "all" 
    ? answers 
    : answers.filter(a => a.topics?.slug === activeTopic)

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 가로 스크롤 탭 영역 */}
      <div className="relative border-b border-line-soft bg-white pb-3">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto snap-x scrollbar-hide py-1 pl-1"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          <button
            onClick={() => setActiveTopic("all")}
            className={`whitespace-nowrap snap-center px-4 py-2 rounded-full font-bold text-[15px] transition-colors border ${
              activeTopic === "all" 
                ? "bg-brand-900 text-white border-brand-900 shadow-md" 
                : "bg-white text-neutral-600 border-line-default hover:bg-neutral-50 hover:text-brand-700"
            }`}
          >
            전체 보기
          </button>
          
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.slug)}
              className={`whitespace-nowrap snap-center px-4 py-2 rounded-full font-bold text-[15px] transition-colors border ${
                activeTopic === topic.slug
                  ? "bg-brand-900 text-white border-brand-900 shadow-md" 
                  : "bg-white text-neutral-600 border-line-default hover:bg-neutral-50 hover:text-brand-700"
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-extrabold text-neutral-900">
             {activeTopic === "all" ? "🔥 최신 AEO 정답 스트림" : `${topics.find(t=>t.slug===activeTopic)?.name} 분야의 정답카드`}
           </h3>
           <span className="text-sm font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-md">{filteredAnswers.length}건</span>
        </div>

        {filteredAnswers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnswers.slice(0, 15).map((ans) => (
              <AnswerCard
                key={ans.id}
                topic={ans.topics?.name || "분류 없음"}
                pillar="기본 해설"
                title={ans.title}
                query={ans.title} // AEO hub focus on question as title
                snippet={ans.summary || ans.content_body || ""}
                updatedAt={ans.published_at || ans.updated_at}
                isReviewed={true}
                href={`/answers/${ans.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center bg-surface-muted rounded-2xl border border-dashed border-line-strong text-neutral-500">
            <p className="text-lg font-medium">선택한 주제의 정답카드가 아직 없습니다.</p>
            <p className="text-sm mt-2">다른 카테고리 탭을 선택해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}
