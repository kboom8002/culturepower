import { Search, Filter, CheckCircle, XCircle, AlertCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

const MOCK_NEEDS_REVIEW = [
  { id: "A-1241", type: "AnswerCard", title: "K-문명 패러다임이 기존 문화정책과 다른 점은 무엇입니까?", author: "Director P", submitted: "2 hours ago", priority: "High" },
  { id: "S-089", type: "Story", title: "지역 소멸을 박물관 미술관으로 막을 수 있을까", author: "Editor L", submitted: "5 hours ago", priority: "Normal" },
  { id: "A-1244", type: "AnswerCard", title: "해외 우수 융복합 정책 사례 5선", author: "Researcher K", submitted: "1 day ago", priority: "Low" },
]

export default function NeedsReviewPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Needs Review</h1>
        <p className="text-body text-neutral-600">
          에디터가 초안 작성을 마치고 검수 대기 중인 항목들입니다. 보편적 진실(SSoT)의 기준에 부합하는지 평가해 주세요.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-2">
        <div className="bg-white p-5 rounded-xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">Pending Reviews</div>
          <div className="text-[28px] font-extrabold text-trust-text">14</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">High Priority</div>
          <div className="text-[28px] font-extrabold text-danger-600">3</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">Avg. Turnaround</div>
          <div className="text-[28px] font-extrabold text-neutral-900">4.2h</div>
        </div>
        <div className="bg-brand-900 p-5 rounded-xl border border-brand-800 shadow-sm text-white flex flex-col justify-center">
          <div className="flex items-center gap-2 font-bold mb-1">
            <CheckCircle className="w-5 h-5 text-brand-300" />
            My Reviews
          </div>
          <div className="text-sm text-brand-200">You have 2 items awaiting your approval.</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Title..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
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
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Submitted By</th>
                <th className="px-6 py-4">Wait Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_NEEDS_REVIEW.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-neutral-500">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.priority === "High" ? (
                      <span className="flex items-center gap-1.5 text-danger-600 font-bold text-xs"><AlertCircle className="w-3.5 h-3.5"/> High</span>
                    ) : (
                      <span className="text-neutral-500 text-xs font-semibold">{item.priority}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.author}</td>
                  <td className="px-6 py-4 text-neutral-500">{item.submitted}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-xs font-bold transition-colors">
                        Review
                      </button>
                      <button className="p-1.5 text-success-600 hover:bg-success-bg rounded-lg transition-colors" title="Quick Approve">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-danger-500 hover:bg-danger-bg rounded-lg transition-colors" title="Reject / Need Changes">
                        <XCircle className="w-4 h-4" />
                      </button>
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
