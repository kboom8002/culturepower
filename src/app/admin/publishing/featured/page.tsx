import { getFeaturedContents, getPageBanners } from "@/lib/actions/publishing"
import { FeaturedManager } from "@/components/domain/publishing/FeaturedManager"

export default async function AdminPublishingFeaturedPage() {
  const [contents, banners] = await Promise.all([
    getFeaturedContents(),
    getPageBanners()
  ])

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">페이지 노출 관리</h1>
        <p className="text-body text-neutral-600">
          홈페이지 메인 및 GNB 주요 섹션에 고정될 핵심 콘텐츠와 배너 큐레이션을 관리합니다.
        </p>
      </div>

      <FeaturedManager initialItems={contents} initialBanners={banners} />
    </div>
  )
}
