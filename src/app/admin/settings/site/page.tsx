import { getSiteSettings } from "@/lib/actions/settings"
import { SiteSettingsForm } from "@/components/domain/settings/SiteSettingsForm"

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">기본 사이트 정보</h1>
        <p className="text-body text-neutral-600">
          웹사이트의 이름, 설명, 검색 엔진(SEO) 메타데이터 등 전역 기본 설정을 관리합니다. 
          여기에 설정된 값은 개별 콘텐츠 설정에 명시된 값이 없을 때 기본값(Fallback)으로 활용됩니다.
        </p>
      </div>

      <SiteSettingsForm initialData={settings} />
    </div>
  )
}
