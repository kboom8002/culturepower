import { GlobalHeader } from "@/components/layout/GlobalHeader"
import { GlobalFooter } from "@/components/layout/GlobalFooter"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalHeader />
      <main className="flex-1 flex flex-col items-center w-full">
        {children}
      </main>
      <GlobalFooter />
    </div>
  )
}
