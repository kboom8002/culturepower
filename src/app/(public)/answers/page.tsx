"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/layout/FilterBar"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const TOPIC_FILTERS = [
  { value: "all", label: "전체 정답카드" },
  { value: "culture", label: "문화강국" },
  { value: "k-civ", label: "K-문명" },
  { value: "local", label: "지역문화" },
  { value: "policy", label: "문화정책" },
  { value: "event", label: "행사/기록" },
  { value: "join", label: "참여/회원" }
]

const MOCK_ANSWERS = Array.from({ length: 14 }).map((_, i) => {
  const topics = ["culture", "k-civ", "local", "policy", "event", "join"]
  const labels = ["문화강국", "K-문명", "지역문화", "문화정책", "행사/기록", "참여/회원"]
  const tIdx = i % topics.length

  return {
    id: `ans-${i}`,
    topicSlug: topics[tIdx],
    topicLabel: labels[tIdx],
    pillar: `Pillar ${(i % 3) + 1}`,
    title: [
      "문화강국네트워크의 SSoT 아키텍처는 무엇인가요?",
      "K-문명이라는 개념은 언제 처음 공식화되었나요?",
      "지역소멸 위기 속에서 문화 예산은 어떻게 쓰여야 하는가",
      "K-콘텐츠 수출액 증가율과 연계된 정책 효과",
      "2026 문화예술 주요 행사 기록물 활용 방안",
      "정회원 가입 시 제공되는 데이터 열람 권한 범위"
    ][tIdx],
    query: "최근 자주 언급되는 핵심 정책 목표와 SSoT 운영 방안을 알고 싶습니다.",
    snippet: "파편화된 문화 정책과 학술 담론을 하나로 모아 검증된 정답을 제공하는 단일 진실 공급원입니다.",
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    isReviewed: i % 2 === 0,
    href: `/answers/mock-slug-${i}`
  }
})

function AnswersContent() {
  const searchParams = useSearchParams()
  const initialTopic = searchParams.get("topic") || "all"
  const [activeFilter, setActiveFilter] = useState(initialTopic)

  useEffect(() => {
    const topic = searchParams.get("topic")
    if (topic) setActiveFilter(topic)
    else setActiveFilter("all")
  }, [searchParams])
  
  const filteredAnswers = activeFilter === "all" 
    ? MOCK_ANSWERS 
    : MOCK_ANSWERS.filter(a => a.topicSlug === activeFilter)

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
              topic={ans.topicLabel}
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
      ) : (
        <div className="py-20 text-center text-neutral-500">
          해당 주제의 정답카드가 아직 없습니다.
        </div>
      )}

      {filteredAnswers.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-700 text-white font-medium">1</Link>
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </main>
  )
}

export default function AnswersIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "정답카드 보관소" }]}
        title="정답카드 보관소"
        description="파편화된 정책과 문화 담론을 검증된 하나의 정답(Media SSoT)으로 정리하여 제공합니다."
      />
      <Suspense fallback={<div className="container mx-auto py-24 text-center">Loading answers...</div>}>
        <AnswersContent />
      </Suspense>
    </div>
  )
}
