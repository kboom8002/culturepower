import { getFeaturedContents } from "@/lib/actions/publishing"
import { FeaturedManager } from "@/components/domain/publishing/FeaturedManager"

export default async function AdminPublishingFeaturedPage() {
  const contents = await getFeaturedContents()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Featured Content Curation</h1>
        <p className="text-body text-neutral-600">메인 홈페이지의 히어로 배너 및 주요 섹션에 고정될 핵심 콘텐츠의 노출 순서를 관리합니다.</p>
      </div>

      <FeaturedManager initialItems={contents} />
    </div>
  )
}
