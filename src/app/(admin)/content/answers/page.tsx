import { Search, Plus, Filter, MoreVertical, FileText, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

// MOCK DATA
const MOCK_ANSWERS = [
  { id: "A-1240", title: "지역 소멸에 대응하는 K-컬처 예산 활용 방안은 어떻게 설계되어 있나요?", topic: "지역문화", author: "Editor L", status: "Public", date: "2026-03-24" },
  { id: "A-1241", title: "K-문명 패러다임이 기존 문화정책과 다른 점은 무엇입니까?", topic: "K-문명", author: "Director P", status: "Review", date: "2026-03-24" },
  { id: "A-1242", title: "문화강국네트워크 정회원(SSoT 기여자) 심사 기준", topic: "참여·회원", author: "Editor L", status: "Draft", date: "2026-03-25" },
  { id: "A-1243", title: "글로벌 중추국가 비전 하의 ODA 문화예산 규모", topic: "글로벌 중추국가", author: "Researcher K", status: "Public", date: "2026-03-20" },
]

export default function AdminAnswersPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">AnswerCards</h1>
          <p className="text-body text-neutral-600">SSoT 지식 생태계의 핵심 진실(정답카드) 객체를 작성하고 관리합니다.</p>
        </div>
        <Link href="/admin/content/answers/new" className="bg-brand-900 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-800 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          정답카드 새로 쓰기
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search ID, Title, or Topic..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              상태 필터
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              분류 필터
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title (User Question)</th>
                <th className="px-6 py-4">Topic</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_ANSWERS.map((ans) => {
                let statusStyle = "bg-neutral-100 text-neutral-600"
                if (ans.status === "Public") statusStyle = "bg-success-bg text-success-text"
                if (ans.status === "Review") statusStyle = "bg-trust-bg text-trust-text"

                let StatusIcon = FileText
                if (ans.status === "Public") StatusIcon = CheckCircle
                if (ans.status === "Review") StatusIcon = Clock

                return (
                  <tr key={ans.id} className="hover:bg-neutral-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-mono text-neutral-500">{ans.id}</td>
                    <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm group-hover:text-brand-700 transition-colors">
                      {ans.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold">{ans.topic}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold w-max ${statusStyle}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {ans.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{ans.author}</td>
                    <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{ans.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-neutral-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-line-soft bg-neutral-50 text-xs text-neutral-500 font-medium">
          Showing 1 to 4 of 1,245 entries
        </div>
      </div>
    </div>
  )
}
