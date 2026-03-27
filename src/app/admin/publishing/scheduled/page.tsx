import { Search, Clock, CalendarDays, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getScheduledItems } from "@/lib/actions/publishing"
import { Chip } from "@/components/ui/chip"
import { ScheduledActions } from "@/components/domain/publishing/ScheduledActions"

export default async function AdminPublishingScheduledPage() {
  const items = await getScheduledItems()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Scheduled Publishing</h1>
        <p className="text-body text-neutral-600">미래의 특정 시간에 자동 발행되도록 예약된 콘텐츠 목록입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="제목 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm text-right flex items-center gap-2">
             <Clock className="w-4 h-4 text-brand-500" />
             {items.length} Posts Scheduled
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-20">Type</th>
                <th className="px-6 py-4 min-w-[300px]">Content Title</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {items.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500">예약된 발행 건이 없습니다.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     {item.content_type === 'Story' ? (
                       <span className="flex items-center justify-center bg-brand-50 text-brand-600 w-8 h-8 rounded-lg" title="Webzine Story"><FileText className="w-4 h-4" /></span>
                     ) : (
                       <span className="flex items-center justify-center bg-purple-50 text-purple-600 w-8 h-8 rounded-lg" title="Knowledge Answer"><HelpCircle className="w-4 h-4" /></span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-neutral-900 truncate max-w-sm">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-800 flex items-center gap-2 min-h-[56px]">
                     <CalendarDays className="w-4 h-4 text-brand-500" />
                     {item.published_at ? new Date(item.published_at).toLocaleString() : 'TBD'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ScheduledActions itemId={item.id} contentType={item.content_type} currentDate={item.published_at} />
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
