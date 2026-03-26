import { Search, Rocket, Filter, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPublishQueue } from "@/lib/actions/publishing"
import { Chip } from "@/components/ui/chip"
import { PublishActionBtn } from "@/components/domain/publishing/PublishActionBtn"

export default async function AdminPublishingQueuePage() {
  const queue = await getPublishQueue()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Publish Queue</h1>
        <p className="text-body text-neutral-600">발행 대기 중인(Review) 콘텐츠나 임시저장(Draft)된 콘텐츠를 모아보고 최종 발행합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="제목, 작성자 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
              <Filter className="w-4 h-4" /> Type
            </button>
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm text-right">
             총 {queue.length}건 대기 중
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-20">Type</th>
                <th className="px-6 py-4 min-w-[300px]">Content Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {queue.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">발행 대기열이 비어있습니다.</td></tr>
              ) : queue.map((item) => (
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
                     <div className="text-neutral-500 text-[11px] font-mono mt-0.5">{item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                     {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                     {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500 min-h-[56px]">
                     {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="secondary" size="sm" className="px-3 text-xs" disabled>미리보기</Button>
                       <PublishActionBtn itemId={item.id} contentType={item.content_type} variant={item.status === 'Review' ? 'primary' : 'outline'} />
                    </div>
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
