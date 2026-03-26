import { Search, CheckCircle2, History } from "lucide-react"
import { getReviewTasks } from "@/lib/actions/review"

export default async function AdminReviewApprovedPage() {
  const tasks = await getReviewTasks('Approved')

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Approved / Archive</h1>
        <p className="text-body text-neutral-600">심사가 완료되어 발행 대기열(Publish Queue)로 넘어갔거나 최종 발행된 완료 현황입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="완료 내역 검색..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm flex items-center gap-2">
             <History className="w-4 h-4 text-brand-500" />
             총 {tasks.length}건 완료
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-32">Type</th>
                <th className="px-6 py-4">Content Title</th>
                <th className="px-6 py-4">Resolution Note</th>
                <th className="px-6 py-4">Approved By</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tasks.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">완료된 심사 내역이 없습니다.</td></tr>
              ) : tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase ${task.content_type === 'Story' ? 'bg-purple-50 text-purple-700' : 'bg-brand-50 text-brand-700'}`}>
                        {task.content_type}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-xs">
                     <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0" />
                        <span className="truncate">{task.content_title || 'Unknown Title'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 truncate max-w-sm">
                     {task.comment || '-'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-600">
                     {task.admin_users?.name || 'System'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-400">
                     {new Date(task.updated_at).toLocaleString()}
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
