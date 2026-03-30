import { GlobalHeader } from "@/components/layout/GlobalHeader"
import { GlobalFooter } from "@/components/layout/GlobalFooter"
import { getSiteMenus } from "@/lib/actions/navigation"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const menus = await getSiteMenus()

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalHeader menus={menus} />
      <main className="flex-1 flex flex-col items-center w-full">
        {children}
      </main>
      <GlobalFooter />
    </div>
  )
}
