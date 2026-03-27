import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { StoryMetaStrip } from "@/components/domain/story/StoryMetaStrip"
import { DeckBlock } from "@/components/domain/story/DeckBlock"
import { WhyThisMattersBox } from "@/components/domain/story/WhyThisMattersBox"
import { BasedOnAnswersList } from "@/components/domain/story/BasedOnAnswersList"
import { StoryBodyRichText } from "@/components/domain/story/StoryBodyRichText"
import { TrustStrip } from "@/components/domain/trust/TrustStrip"
import { ShareButtons } from "@/components/ui/ShareButtons"
import { getPublicStoryById } from "@/lib/actions/public"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic' // Force dynamic rendering to bypass cached 404s

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // slug param receives the ID based on our index page routing
  const resolvedParams = await params
  const data = await getPublicStoryById(resolvedParams.slug)

  if (!data) {
    return notFound()
  }

  // Parse related answers from JSONB if available
  let basedOnAnswers = []
  if (data.related_answers_meta) {
    try {
      if (typeof data.related_answers_meta === 'string') {
        basedOnAnswers = JSON.parse(data.related_answers_meta)
      } else {
        basedOnAnswers = data.related_answers_meta as any[]
      }
    } catch {
      basedOnAnswers = []
    }
  }

  return (
    <div className="w-full bg-surface-page py-10 md:py-16 min-h-screen">
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl bg-white p-6 md:p-12 md:py-16 rounded-3xl shadow-sm border border-line-default">
        
        {/* Navigation & Meta */}
        <Breadcrumb 
          items={[
            { label: "문강 RIO", href: "/webzine/stories" },
            { label: data.section || "기사" },
            { label: "상세" }
          ]} 
        />
        
        <StoryMetaStrip 
          section={data.section || "기획 기사"}
          storyType={data.story_type || "기사"}
          authorName={data.experts?.name || "문화강국네트워크 에디터"}
          updatedAt={data.published_at || data.updated_at}
        />
        
        {/* Title & Deck */}
        <h1 className="text-h2 md:text-[44px] leading-[1.2] text-neutral-900 mb-2 text-balance tracking-tight font-bold">
          {data.title}
        </h1>
        
        <ShareButtons title={data.title} description={data.deck || ""} />
        
        <DeckBlock deck={data.deck || ""} />

        {/* Core Importance Box */}
        {data.why_this_matters && (
           <WhyThisMattersBox content={data.why_this_matters} />
        )}

        {/* Foundation & Context Navigation */}
        {basedOnAnswers && basedOnAnswers.length > 0 && (
           <BasedOnAnswersList answers={basedOnAnswers.map((a: any) => ({
             id: a.id || Math.random().toString(),
             title: a.title || "관련 지식 정답카드",
             href: `/answers/${a.id}`
           }))} />
        )}

        {/* Main Editorial Content */}
        <div className="prose prose-lg prose-neutral max-w-none mt-12 [&>p]:leading-relaxed [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-6 [&>img]:rounded-2xl">
           <StoryBodyRichText contentRichText={data.body || ""} />
        </div>

        {/* Trust & Meta Footer */}
        <div className="pt-10 border-t border-line-strong flex flex-col gap-8 mt-16">
          <TrustStrip 
            reviewerName={data.admin_users?.name || "내부 심사단"}
            reviewerRole={"SSoT 검수"}
            authorName={data.experts?.name || "에디터"}
            updatedAt={data.published_at || data.updated_at}
          />
        </div>
        
      </article>
    </div>
  )
}
