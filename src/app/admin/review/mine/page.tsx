import { Search, Filter, AlertCircle, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const MOCK_MY_REVIEWS = [
  { id: "REV-201", objectId: "S-110", type: "Story", title: "K-콘텐츠 파이프라인의 핵심, 웹툰 제작의 모든 것", author: "최디렉터", submittedAt: "2026-03-24", priority: "High" },
  { id: "REV-203", objectId: "EVT-042", type: "Event", title: "2026 상반기 문화정책 포럼 요약본 검수", author: "이운영", submittedAt: "2 hours ago", priority: "High" },
]

export default function MyReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">My Reviews</h1>
        <p className="text-body text-neutral-600">
          나에게 할당된 리뷰 요청 항목입니다. 가능한 한 빨리 승인 또는 반려 결정을 내려주세요.
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
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Submitted By</th>
                <th className="px-6 py-4">Wait Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_MY_REVIEWS.map((item) => (
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
                  <td className="px-6 py-4">
                    {item.priority === "High" ? (
                      <span className="flex items-center gap-1.5 text-danger-600 font-bold text-xs"><AlertCircle className="w-3.5 h-3.5"/> High</span>
                    ) : (
                      <span className="text-neutral-500 text-xs font-semibold">{item.priority}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.author}</td>
                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {item.submittedAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/review/${item.id}`}>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-xs font-bold transition-colors ml-auto">
                        Review
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {MOCK_MY_REVIEWS.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    <CheckCircle className="w-8 h-8 mx-auto mb-3 text-neutral-300" />
                    현재 할당된 검수 요청이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
