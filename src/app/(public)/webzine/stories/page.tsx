import { PageHeader } from "@/components/layout/PageHeader"
import { StoriesClient } from "@/components/domain/story/StoriesClient"
import { getPublicStories } from "@/lib/actions/public"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function StoriesIndexPage() {
  const stories = await getPublicStories()

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "문강 RIO" }]}
        title="문강 RIO (웹진)"
        description="전문 에디터와 현장의 크리에이터들이 길어 올린 긴 호흡의 기사와 심층 해설을 만납니다."
      />
      <StoriesClient initialStories={stories} />
    </div>
  )
}
