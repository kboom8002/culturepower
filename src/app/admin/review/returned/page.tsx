import { Search, RotateCcw, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getReviewTasks } from "@/lib/actions/review"

export default async function AdminReviewReturnedPage() {
  const tasks = await getReviewTasks('Returned')

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Returned Items</h1>
        <p className="text-body text-neutral-600">검수자가 수정을 요청(반려)한 콘텐츠 목록입니다. 피드백을 반영하여 다시 승인을 요청하세요.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="타이틀 검색..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-32">Type</th>
                <th className="px-6 py-4">Content Title</th>
                <th className="px-6 py-4">Feedback / Reason</th>
                <th className="px-6 py-4">Returned By</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tasks.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">반려된 항목이 없습니다.</td></tr>
              ) : tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase ${task.content_type === 'Story' ? 'bg-purple-50 text-purple-700' : 'bg-brand-50 text-brand-700'}`}>
                        {task.content_type}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-[200px]">
                     {task.content_title || 'Unknown Title'}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 truncate max-w-sm flex items-center gap-2">
                     <MessageSquare className="w-4 h-4 text-danger-400 shrink-0" />
                     {task.comment || <span className="italic text-neutral-400">사유 미기재</span>}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {task.admin_users?.name || 'System'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="secondary" size="sm" className="px-3"><RotateCcw className="w-4 h-4 mr-1.5" /> Re-submit</Button>
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
