import { Search, Plus, Filter, CalendarDays, AlertCircle, CheckCircle2, FileText, Video, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getEventCompletions } from "@/lib/actions/archive"
import { Chip } from "@/components/ui/chip"

export default async function AdminArchiveCompletionBoardPage() {
  const completions = await getEventCompletions()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Completion Board (행사 기록 보드)</h1>
        <p className="text-body text-neutral-600">
          행사 종료 후, 필수 아카이브 자료(발제문/자료집, 영상, 사진)가 모두 누락 없이 업로드되었는지 직관적으로 추적합니다.
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
                placeholder="행사 제목으로 추적..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
            <div className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-danger-500" /> 미등록 (Warning)</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success-500" /> 등록 완료</div>
          </div>
        </div>

        {/* Board Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap table-fixed min-w-[960px]">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-5 py-4 w-[28%]">Event</th>
                <th className="px-5 py-4 w-[16%]">Ended At</th>
                <th className="px-5 py-4 w-[12%] text-center"><div className="flex items-center justify-center gap-1"><FileText className="w-4 h-4" /> Docs</div></th>
                <th className="px-5 py-4 w-[12%] text-center"><div className="flex items-center justify-center gap-1"><Video className="w-4 h-4" /> Videos</div></th>
                <th className="px-5 py-4 w-[12%] text-center"><div className="flex items-center justify-center gap-1"><ImageIcon className="w-4 h-4" /> Galleries</div></th>
                <th className="px-5 py-4 w-[20%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900 bg-neutral-50/30">
              {completions.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">추적 대상 행사가 없습니다.</td></tr>
              ) : completions.map(({ event, docsCount, videosCount, galleriesCount }) => {
                const isFullyClosed = event.status === 'Closed'
                return (
                  <tr key={event.id} className={`transition-colors ${isFullyClosed ? 'bg-success-50/30 opacity-75' : 'hover:bg-neutral-50 group'}`}>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <Link href={`/admin/archive/events/${event.id}`} className="font-bold text-neutral-900 hover:text-brand-600 transition-colors truncate" title={event.title}>
                          {event.title}
                        </Link>
                        <div className="flex items-center gap-2">
                           <span className="font-mono text-[10px] text-neutral-400">{event.id.slice(0,8)}</span>
                           {isFullyClosed && <span className="text-[10px] font-bold text-success-600 bg-success-100 px-1.5 rounded">CLOSED</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600 font-medium">
                       {event.end_date ? new Date(event.end_date).toLocaleDateString() : (event.start_date ? new Date(event.start_date).toLocaleDateString() : 'TBD')}
                    </td>
                    
                    {/* Documents Board Cell */}
                    <td className="px-5 py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${docsCount > 0 ? 'bg-success-50 border-success-200 text-success-600' : 'bg-danger-50 border-danger-200 text-danger-500 group-hover:bg-danger-100 transition-colors'}`}>
                         {docsCount > 0 ? <span className="font-bold text-xs">{docsCount}</span> : <AlertCircle className="w-4 h-4" />}
                      </div>
                    </td>

                    {/* Videos Board Cell */}
                    <td className="px-5 py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${videosCount > 0 ? 'bg-success-50 border-success-200 text-success-600' : 'bg-danger-50 border-danger-200 text-danger-500 group-hover:bg-danger-100 transition-colors'}`}>
                         {videosCount > 0 ? <span className="font-bold text-xs">{videosCount}</span> : <AlertCircle className="w-4 h-4" />}
                      </div>
                    </td>

                    {/* Galleries Board Cell */}
                    <td className="px-5 py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 ${galleriesCount > 0 ? 'bg-success-50 border-success-200 text-success-600' : 'bg-danger-50 border-danger-200 text-danger-500 group-hover:bg-danger-100 transition-colors'}`}>
                         {galleriesCount > 0 ? <span className="font-bold text-xs">{galleriesCount}</span> : <AlertCircle className="w-4 h-4" />}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {!isFullyClosed && (
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/archive/events/${event.id}`}>
                            <Button variant="secondary" size="sm" className="h-8 text-xs font-bold border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100">Fix Missing</Button>
                          </Link>
                        </div>
                      )}
                      {isFullyClosed && (
                         <div className="text-xs font-bold text-neutral-400 flex items-center justify-end gap-1">
                           <CheckCircle2 className="w-3.5 h-3.5" /> All Tracked
                         </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
