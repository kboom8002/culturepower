import { getSiteMenus } from "@/lib/actions/navigation"
import { SiteMenuManager } from "@/components/domain/settings/SiteMenuManager"

export default async function AdminSiteMenusPage() {
  const menus = await getSiteMenus()

  return (
    <div className="flex flex-col gap-8 w-full pb-24 mt-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Site Menus (GNB 관리)</h1>
        <p className="text-body text-neutral-600">글로벌 네비게이션 바(Global Navigation Bar)의 1차, 2차 트리 메뉴를 생성하고 연결 URL을 설정합니다.</p>
      </div>

      <SiteMenuManager initialMenus={menus} />
    </div>
  )
}
