import { Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getReviewTasks } from "@/lib/actions/review"

export default async function AdminReviewNeedsPage() {
  const tasks = await getReviewTasks('Pending')

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Needs Review</h1>
        <p className="text-body text-neutral-600">발행 대기 중이나 아직 검수자(Reviewer)가 배정되지 않은 콘텐츠 목록입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="제목 검색..."
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
                <th className="px-6 py-4">Requested At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tasks.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500">배정이 필요한 미결 로드가 없습니다. 🎉</td></tr>
              ) : tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase ${task.content_type === 'Story' ? 'bg-purple-50 text-purple-700' : 'bg-brand-50 text-brand-700'}`}>
                        {task.content_type}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm">
                     {task.content_title || 'Unknown Title'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="primary" size="sm" className="px-4"><UserPlus className="w-4 h-4 mr-1.5" /> 나에게 할당</Button>
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
