import { Suspense } from "react"
import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"
import { StoriesClient } from "@/components/domain/story/StoriesClient"
import { getPublicStories } from "@/lib/actions/public"
import { getTopics } from "@/lib/actions/content"
import { getFeaturedSlots } from "@/lib/actions/publishing"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function StoriesIndexPage({ searchParams }: { searchParams: Promise<{ topic?: string, category?: string }> }) {
  const resolvedParams = await searchParams
  const topicSlug = resolvedParams.topic
  const categorySlug = resolvedParams.category
  
  const [stories, topics, featuredSlots] = await Promise.all([
    getPublicStories(),
    getTopics(),
    getFeaturedSlots('Home Stories') // Using 'Home Stories' or generically fetching featured. 
  ])
  
  // 1. Topic Filtering (향후 Story가 topic_id를 가지는 확장성을 고려한 로우 레벨 지원)
  let filteredStories = stories
  let currentTopic: { id: string, name: string, description: string | null } | null = null
  
  // Topic 기준 필터링 (Global 메타데이터)
  if (topicSlug) {
    currentTopic = topics.find(t => t.slug === topicSlug || t.slug.includes(topicSlug.toLowerCase())) || null
    if (currentTopic) {
      const topicId = currentTopic.id
      // @ts-ignore : story schema will be mapped to global topics
      filteredStories = stories.filter(s => s.topic_id === topicId || s.section?.toLowerCase().includes(topicSlug.toLowerCase()))
    }
  } 
  // 기존 Category 기준 레거시 호환 필터링 (Taxonomy)
  else if (categorySlug) {
    filteredStories = stories.filter(s => 
      s.section?.toLowerCase() === categorySlug.toLowerCase() || 
      s.story_type?.toLowerCase() === categorySlug.toLowerCase()
    )
  }

  // 2. Find Hero Item
  const featuredIds = featuredSlots.map(f => f.content_id)
  const featuredInList = filteredStories.find(s => featuredIds.includes(s.id))
  const rawHeroStory = featuredInList || (filteredStories.length > 0 ? filteredStories[0] : null)
  
  const heroItem = rawHeroStory ? {
    id: rawHeroStory.id,
    title: rawHeroStory.title,
    summary: rawHeroStory.meta_description || rawHeroStory.section || '',
    type: 'stories' as const,
    tagName: currentTopic?.name || rawHeroStory.story_type || rawHeroStory.section || "기획 기사"
  } : undefined

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <DynamicSectionHero 
        topic={currentTopic ? { name: currentTopic.name, description: currentTopic.description } : undefined}
        heroItem={heroItem}
        defaultTitle={categorySlug ? `문강 RIO (${categorySlug})` : "문강 RIO (웹진)"}
        defaultDescription="전문 에디터와 현장의 크리에이터들이 길어 올린 긴 호흡의 기사와 심층 해설을 만납니다."
      />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <Suspense fallback={<div className="py-24 text-center">기사를 불러오는 중입니다...</div>}>
          <StoriesClient initialStories={filteredStories} />
        </Suspense>
      </div>
    </div>
  )
}
