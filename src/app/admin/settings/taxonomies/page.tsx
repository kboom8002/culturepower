import { getTaxonomies } from "@/lib/actions/settings"
import { TaxonomyManager } from "@/components/domain/settings/TaxonomyManager"

export default async function AdminTaxonomiesPage() {
  const taxonomies = await getTaxonomies()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Taxonomies (분류 체계)</h1>
        <p className="text-body text-neutral-600">콘텐츠를 구획하는 글로벌 카테고리, 태그, 시리즈 마스터 데이터를 관리합니다.</p>
      </div>

      <TaxonomyManager initialTaxonomies={taxonomies} />
    </div>
  )
}
