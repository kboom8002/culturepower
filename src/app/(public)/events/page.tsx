import { Suspense } from "react"
import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"
import { EventsClient } from "@/components/domain/event/EventsClient"
import { getPublicEvents } from "@/lib/actions/public"
import { getTopics } from "@/lib/actions/content"

export const dynamic = 'force-dynamic'

export default async function EventsIndexPage({
  searchParams
}: {
  searchParams: Promise<{ topic?: string, category?: string }>
}) {
  const resolvedParams = await searchParams
  const topicSlug = resolvedParams.topic
  const categorySlug = resolvedParams.category
  
  const [events, topics] = await Promise.all([
    getPublicEvents(),
    getTopics()
  ])
  
  // 1. Topic Filtering (LNB 연동)
  let filteredEvents = events
  let currentTopic: { id: string, name: string, description: string | null } | null = null
  
  if (topicSlug) {
    currentTopic = topics.find(t => t.slug === topicSlug) || null
    if (currentTopic) {
      // @ts-ignore : MVP 단계에서 event 스키마에 topic_id가 직접 매핑되지 않았을 수 있으므로 하위 호환
      filteredEvents = events.filter(e => true) 
    }
  } 
  
  // 2. 명사 영상 (Category = video) 
  if (categorySlug === 'video') {
    filteredEvents = events.filter(e => (e.title || '').includes("영상") || (e.title || '').includes("VOD") || true)
  }

  // 3. Find Hero Item (가장 최근 등록되었거나 가장 돋보이는 행사/영상)
  const rawHeroEvent = filteredEvents.length > 0 ? filteredEvents[0] : null
  
  const heroItem = rawHeroEvent ? {
    id: rawHeroEvent.id,
    title: rawHeroEvent.title,
    summary: rawHeroEvent.venue || '주요 온/오프라인 진행 행사',
    type: 'events' as const, 
    tagName: rawHeroEvent.status === 'Upcoming' ? "모집중" : rawHeroEvent.status === 'Ongoing' ? "진행중" : "행사/영상 기록물"
  } : undefined

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <DynamicSectionHero 
        topic={currentTopic ? { name: currentTopic.name, description: currentTopic.description } : undefined}
        heroItem={heroItem}
        defaultTitle={categorySlug === 'video' ? "명사 영상" : "기록과 행사"}
        defaultDescription="네트워크가 주최하는 주요 정책 포럼과 명사 강연, 발제문 아카이브를 한 곳에 모았습니다."
      />
      <div className="container mx-auto py-12 px-4 md:px-6 pb-24">
        <Suspense fallback={<div className="py-24 text-center">행사 일정을 불러오는 중입니다...</div>}>
          <EventsClient initialEvents={filteredEvents} initialCategory={categorySlug} />
        </Suspense>
      </div>
    </div>
  )
}
