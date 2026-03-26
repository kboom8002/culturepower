import { Search, Filter, RefreshCcw, FileEdit } from "lucide-react"
import Link from "next/link"

const MOCK_RETURNED_REVIEWS = [
  { id: "REV-150", objectId: "S-088", type: "Story", title: "로컬 크리에이터의 시대", author: "김편집 편집장", reviewer: "방문자 (Head)", returnedAt: "2026-03-20", reason: "대표 이미지가 누락되었습니다. 관련 정답카드 추가 요망." },
]

export default function ReturnedReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Returned</h1>
        <p className="text-body text-neutral-600">
          검수자로부터 반려(Return)되어 초안(Draft) 상태로 돌아간 항목들입니다. 사유를 확인하고 수정 후 다시 제출해 주세요.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col mt-4">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Title..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all bg-white"
            />
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Content Type
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Task ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 min-w-[280px]">Title</th>
                <th className="px-6 py-4 min-w-[200px]">Return Reason</th>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Returned At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_RETURNED_REVIEWS.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500 group-hover:text-brand-600 transition-colors">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${item.type === 'Story' ? 'bg-indigo-100 text-indigo-700' : item.type === 'AnswerCard' ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-100 text-brand-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm">
                    {item.title}
                    <div className="text-xs text-neutral-400 font-mono mt-0.5 font-normal">{item.objectId}</div>
                  </td>
                  <td className="px-6 py-4 text-danger-600 text-xs font-semibold whitespace-normal line-clamp-2 w-48 leading-relaxed">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.reviewer}</td>
                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <RefreshCcw className="w-3.5 h-3.5 text-danger-400" />
                      {item.returnedAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/content/${item.type.toLowerCase() === 'story' ? 'stories' : 'answers'}/${item.objectId.replace('S-', '').replace('ANS-', '')}`}>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg text-xs font-bold transition-colors ml-auto">
                        <FileEdit className="w-3.5 h-3.5" />
                        Edit Draft
                      </button>
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
