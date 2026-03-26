import { Search, Plus, Filter, CalendarDays, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/lib/actions/archive"
import { Chip } from "@/components/ui/chip"

export default async function AdminArchiveEventsPage() {
  const events = await getEvents()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Events (행사 아카이브)</h1>
        <p className="text-body text-neutral-600">
          행사, 토론회, 세미나를 등록하고 관련된 기록물(영상, 문서, 갤러리)을 통합 관리합니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search events by title..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Status
            </button>
          </div>
          
          <Link href="/admin/archive/events/new" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              새 행사 등록
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Event ID</th>
                <th className="px-6 py-4">Event Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {events.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">등록된 행사가 없습니다.</td></tr>
              ) : events.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500 text-xs">{item.id.slice(0,8)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/archive/events/${item.id}`} className="flex items-center gap-2 font-bold text-neutral-900 hover:text-brand-600 transition-colors">
                      <CalendarDays className="w-4 h-4 text-neutral-400" />
                      <span className="truncate max-w-[280px]">{item.title}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">
                    {item.event_type || "-"}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">
                     {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'TBD'}
                  </td>
                  <td className="px-6 py-4">
                     <span className="mr-2">
                        {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                        {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                        {item.status === 'Closed' && <Chip variant="success">Closed (기록완료)</Chip>}
                        {(item.status === 'Public' || item.status === 'Archived') && <Chip variant="success">{item.status}</Chip>}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/archive/events/${item.id}`}>
                      <Button variant="secondary" size="sm" className="px-3">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
