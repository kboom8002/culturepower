import { Search, Filter, CheckCircle2, Globe } from "lucide-react"
import Link from "next/link"

const MOCK_APPROVED_REVIEWS = [
  { id: "REV-101", objectId: "S-055", type: "Story", title: "K-Food의 역사와 글로벌 전략", author: "박푸드", reviewer: "김편집 편집장", approvedAt: "2026-03-22", isPublished: true },
  { id: "REV-108", objectId: "ANS-042", type: "AnswerCard", title: "한국의 무형문화재 보존 방식은?", author: "이리서처", reviewer: "김편집 편집장", approvedAt: "2026-03-24", isPublished: false },
]

export default function ApprovedReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Approved</h1>
        <p className="text-body text-neutral-600">
          검수자가 승인(Approve)을 완료하여 Public 발행 자격을 획득한 항목들입니다.
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
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Publish Status
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
                <th className="px-6 py-4">Publish State</th>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Approved At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_APPROVED_REVIEWS.map((item) => (
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
                    {item.isPublished ? (
                      <span className="flex items-center gap-1.5 text-success-600 font-bold text-xs bg-success-50 px-2 py-1.5 rounded-md inline-flex w-fit"><Globe className="w-3.5 h-3.5"/> Published (Live)</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-brand-600 font-bold text-xs bg-brand-50 px-2 py-1.5 rounded-md inline-flex w-fit"><CheckCircle2 className="w-3.5 h-3.5"/> In Queue</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.reviewer}</td>
                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success-400" />
                      {item.approvedAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/review/${item.id}`}>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg text-xs font-bold transition-colors ml-auto">
                        View Log
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
