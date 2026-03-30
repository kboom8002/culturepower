import { Search, Rocket, Filter, FileText, HelpCircle, History, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPublishQueue, getPublishHistory } from "@/lib/actions/publishing"
import { Chip } from "@/components/ui/chip"
import { PublishActionGroup } from "@/components/domain/publishing/PublishActionGroup"
import Link from "next/link"

export default async function AdminPublishingQueuePage({ searchParams }: { searchParams: Promise<{ tab?: string, page?: string }> }) {
  const resolvedParams = await searchParams
  const tab = resolvedParams.tab || 'queue'
  const page = parseInt(resolvedParams.page || '1', 10) || 1
  const limit = 15

  const isHistory = tab === 'history'
  
  let items: any[] = []
  let total = 0
  
  if (isHistory) {
    const historyRes = await getPublishHistory(page, limit)
    items = historyRes.items
    total = historyRes.total
  } else {
    items = await getPublishQueue()
    total = items.length
  }

  const totalPages = isHistory ? Math.ceil(total / limit) : 1

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Publish Queue</h1>
        <p className="text-body text-neutral-600">발행 대기 중인 콘텐츠를 최종 발행하거나, 이전 발행 내역(History)을 조회합니다.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-line-soft">
        <Link href="?tab=queue" className={`pb-3 text-sm font-bold border-b-2 transition-colors ${!isHistory ? 'border-brand-600 text-brand-700' : 'border-transparent text-neutral-500 hover:text-neutral-900'}`}>
          대기열 (To Publish)
        </Link>
        <Link href="?tab=history" className={`pb-3 text-sm font-bold border-b-2 transition-colors ${isHistory ? 'border-brand-600 text-brand-700' : 'border-transparent text-neutral-500 hover:text-neutral-900'}`}>
          발행 내역 (History)
        </Link>
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
             총 {total}건 {isHistory ? '발행됨' : '대기 중'}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-20">Type</th>
                <th className="px-6 py-4 min-w-[300px]">Content Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">{isHistory ? 'Published At' : 'Created At'}</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {items.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">{isHistory ? '발행된 내역이 없습니다.' : '발행 대기열이 비어있습니다.'}</td></tr>
              ) : items.map((item: any) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     {item.content_type === 'Story' ? (
                       <span className="flex items-center justify-center bg-brand-50 text-brand-600 w-8 h-8 rounded-lg" title="Webzine Story"><FileText className="w-4 h-4" /></span>
                     ) : item.content_type === 'Answer' ? (
                       <span className="flex items-center justify-center bg-purple-50 text-purple-600 w-8 h-8 rounded-lg" title="Knowledge Answer"><HelpCircle className="w-4 h-4" /></span>
                     ) : (
                       <span className="flex items-center justify-center bg-orange-50 text-orange-600 w-8 h-8 rounded-lg" title="Event"><Rocket className="w-4 h-4" /></span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-neutral-900 truncate max-w-sm">{item.title}</div>
                     <div className="text-neutral-500 text-[11px] font-mono mt-0.5">{item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                     {(item.status === 'Draft' || item.status === 'draft') && <Chip variant="default">Draft</Chip>}
                     {(item.status === 'Review' || item.status === 'in-review') && <Chip variant="reviewed">In Review</Chip>}
                     {item.status === 'approved' && <Chip variant="reviewed">Approved</Chip>}
                     {item.status === 'scheduled' && <Chip variant="default">Scheduled</Chip>}
                     {(item.status === 'Public' || item.status === 'published') && <Chip variant="primary">Published</Chip>}
                     {(item.status === 'Archived' || item.status === 'archived') && <Chip variant="default">Archived</Chip>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500 min-h-[56px]">
                     {new Date(isHistory ? (item.published_at || item.created_at) : item.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       {!isHistory ? (
                         <PublishActionGroup itemId={item.id} contentType={item.content_type} />
                       ) : (
                         <Button variant="secondary" size="sm" asChild>
                            <Link href={item.content_type === 'Story' ? `/webzine/stories/${item.id}` : `/answers/${item.id}`} target="_blank">View</Link>
                         </Button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (History only) */}
        {isHistory && totalPages > 1 && (
          <div className="p-4 border-t border-line-soft flex items-center justify-between">
            <span className="text-sm text-neutral-500">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" asChild disabled={page <= 1}>
                <Link href={`?tab=history&page=${page - 1}`} className={page <= 1 ? 'pointer-events-none opacity-50' : ''}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild disabled={page >= totalPages}>
                <Link href={`?tab=history&page=${page + 1}`} className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
