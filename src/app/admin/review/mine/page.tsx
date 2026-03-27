import { Search, Clock } from "lucide-react"
import { getReviewTasks } from "@/lib/actions/review"
import { ReviewProcessBtn } from "@/components/domain/review/ReviewProcessBtn"

export default async function AdminMyReviewsPage() {
  const tasks = await getReviewTasks('In Review')

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">My Reviews</h1>
        <p className="text-body text-neutral-600">나에게 할당되어 현재 심사 중인 콘텐츠 목록입니다. 내용을 확인하고 승인/반려 처리를 진행하세요.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="심사 건 타이틀 검색..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="font-bold text-brand-600 text-sm flex items-center gap-2">
             <Clock className="w-4 h-4" /> 내 대기열: {tasks.length}건
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-32">Type</th>
                <th className="px-6 py-4">Content Title</th>
                <th className="px-6 py-4">Assigned At</th>
                <th className="px-6 py-4 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tasks.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500">배정된 심사 건이 없습니다.</td></tr>
              ) : tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase ${task.content_type === 'Story' ? 'bg-purple-50 text-purple-700' : 'bg-brand-50 text-brand-700'}`}>
                        {task.content_type}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-900 truncate max-w-sm">{task.content_title || 'Unknown Title'}</span>
                        <span className="text-xs text-neutral-400 font-mono mt-0.5">Task ID: {task.id.split('-')[0]}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {new Date(task.updated_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                     <ReviewProcessBtn taskId={task.id} action="Return" />
                     <ReviewProcessBtn taskId={task.id} action="Approve" />
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
