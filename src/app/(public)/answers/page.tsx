import { Suspense } from "react"
import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"
import { AnswersClient } from "@/components/domain/answer/AnswersClient"
import { getPublicAnswers } from "@/lib/actions/public"
import { getTopics } from "@/lib/actions/content"
import { getFeaturedSlots } from "@/lib/actions/publishing"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function AnswersIndexPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const resolvedParams = await searchParams
  const topicSlug = resolvedParams.topic
  
  const [answers, topics, featuredSlots] = await Promise.all([
    getPublicAnswers(),
    getTopics(),
    getFeaturedSlots('Home Answers')
  ])
  
  // 1. Topic Filtering
  let filteredAnswers = answers
  let currentTopic: { id: string, name: string, description: string | null } | null = null
  
  if (topicSlug) {
    currentTopic = topics.find(t => t.slug === topicSlug) || null
    if (currentTopic) {
      const topicId = currentTopic.id
      filteredAnswers = answers.filter(a => a.topic_id === topicId)
    }
  }

  // 2. Find Hero Item
  const featuredIds = featuredSlots.map(f => f.content_id)
  const featuredInList = filteredAnswers.find(a => featuredIds.includes(a.id))
  const rawHeroAns = featuredInList || (filteredAnswers.length > 0 ? filteredAnswers[0] : null)
  
  const heroItem = rawHeroAns ? {
    id: rawHeroAns.id,
    title: rawHeroAns.title,
    summary: rawHeroAns.summary || '',
    type: 'answers' as const,
    tagName: rawHeroAns.topics?.name || "분류 없음"
  } : undefined

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <DynamicSectionHero 
        topic={currentTopic ? { name: currentTopic.name, description: currentTopic.description } : undefined}
        heroItem={heroItem}
        defaultTitle="정답카드 보관소"
        defaultDescription="파편화된 정책과 문화 담론을 검증된 하나의 정답(Media SSoT)으로 정리하여 제공합니다."
      />
      
      <div className="container mx-auto py-12 px-4 md:px-6">
        <Suspense fallback={<div className="py-24 text-center">정답카드를 불러오는 중입니다...</div>}>
          <AnswersClient initialAnswers={filteredAnswers} />
        </Suspense>
      </div>
    </div>
  )
}
