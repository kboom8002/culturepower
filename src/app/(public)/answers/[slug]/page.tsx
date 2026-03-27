import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { AnswerMetaStrip } from "@/components/domain/answer/AnswerMetaStrip"
import { TrustStrip } from "@/components/domain/trust/TrustStrip"
import { ShareButtons } from "@/components/ui/ShareButtons"
import { getPublicAnswerById } from "@/lib/actions/public"
import { notFound } from "next/navigation"

export const revalidate = 60 // Cache for 1 minute

export default async function AnswerDetailPage({ params }: { params: { slug: string } }) {
  // slug param receives the ID based on our index page routing
  const data = await getPublicAnswerById(params.slug)

  if (!data) {
    return notFound()
  }

  // Parse evidence from JSONB if available (fallback pattern)
  // Our admin answer schema doesn't strictly have an external evidences field by default yet,
  // but if implemented in early phases as 'related_answers_meta' or similar, we gracefully handle it.
  
  return (
    <div className="w-full bg-surface-page py-10 md:py-16 min-h-screen">
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-line-default">
        
        {/* Navigation & Meta */}
        <Breadcrumb 
          items={[
            { label: "정답카드", href: "/answers" },
            { label: data.topics?.name || "분류 없음", href: "/answers" },
            { label: "상세" }
          ]} 
        />
        
        <AnswerMetaStrip 
          topic={data.topics?.name || "분류 없음"} 
          pillar={data.topics?.description || ""} 
          isReviewed={true} 
        />
        
        <h1 className="text-h2 md:text-h1 text-neutral-900 mb-2 text-balance tracking-tight">
          {data.title}
        </h1>

        <ShareButtons title={data.title} description={data.topics?.description || "문화강국네트워크"} />

        {/* Since the Answer uses a unified tiptap rich text editor, we render the whole body here 
            instead of fragmenting it into mock ActionPoints/Context blocks. */}
        <div className="prose prose-lg prose-neutral max-w-none mt-12 [&>p]:leading-relaxed [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-6 [&>img]:rounded-2xl">
          <div dangerouslySetInnerHTML={{ __html: data.content_body || "" }} />
        </div>

        {/* Evidence & Trust */}
        <div className="pt-10 border-t border-line-strong flex flex-col gap-8 mt-16">
          <TrustStrip 
            reviewerName={data.admin_users?.name || "내부 심사단"}
            reviewerRole={"SSoT 검수"}
            authorName={data.experts?.name || "전문 에디터"}
            updatedAt={data.published_at || data.updated_at}
          />
        </div>
        
      </article>
    </div>
  )
}
