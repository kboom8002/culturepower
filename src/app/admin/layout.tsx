import { AdminSidebar } from "@/components/layout/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminSidebar />
      <main className="flex-1 px-8 py-10 bg-surface-page overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
