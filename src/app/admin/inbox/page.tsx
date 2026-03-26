import { Search, Inbox as InboxIcon, MessageCircle, AlertTriangle, PlusCircle, Check, ArrowRight } from "lucide-react"

const MOCK_INBOX = [
  { id: "IN-201", type: "Question", content: "로컬 크리에이터 창업 정책 지원금 상한선이 궁금합니다.", source: "Public Answer Form", user: "시민 A", date: "1 hour ago", status: "Unread" },
  { id: "IN-200", type: "Suggestion", content: "K-건축 사례에 저희 지역의 한옥 마을 재생 프로젝트를 제보합니다.", source: "Email Inquiry", user: "지자체 담당자", date: "3 hours ago", status: "Read" },
  { id: "IN-199", type: "Correction", content: "정답카드 A-123 당해년도 예산 수치가 잘못 기재되었습니다. (150억 -> 120억)", source: "Card Feedback", user: "Expert L", date: "1 day ago", status: "Read" },
]

export default function InboxDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Inbox Hub 
          <span className="bg-brand-900 text-white text-[13px] px-2.5 py-1 rounded-lg font-bold">1 Unread</span>
        </h1>
        <p className="text-body text-neutral-600">
          퍼블릭 웹사이트, 폼, 이메일을 통해 유입되는 질문(Question), 제안(Suggestion), 정정(Correction)을 수집하고 SSoT 지식화 워크플로우로 이관합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-2">
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <MessageCircle className="w-8 h-8 text-brand-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Questions</h3>
          <p className="text-sm text-neutral-500 mt-1">Convert to AnswerCards</p>
          <div className="mt-4 text-2xl font-bold text-neutral-900">42 <span className="text-sm font-medium text-neutral-400">new this week</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <PlusCircle className="w-8 h-8 text-trust-text mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Suggestions</h3>
          <p className="text-sm text-neutral-500 mt-1">Story Ideas & Partnerships</p>
          <div className="mt-4 text-2xl font-bold text-neutral-900">12 <span className="text-sm font-medium text-neutral-400">new this week</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <AlertTriangle className="w-8 h-8 text-danger-text mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Corrections</h3>
          <p className="text-sm text-neutral-500 mt-1">Route to Fix-It Tickets</p>
          <div className="mt-4 text-2xl font-bold text-neutral-900">3 <span className="text-sm font-medium text-neutral-400">needs review</span></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search message content..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-10">Status</th>
                <th className="px-6 py-4">ID / Source</th>
                <th className="px-6 py-4 w-1/3">Message Content</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Received</th>
                <th className="px-6 py-4 text-right">Route To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_INBOX.map((item) => (
                <tr key={item.id} className={`hover:bg-neutral-50/50 transition-colors group ${item.status === 'Unread' ? 'bg-brand-050/30' : ''}`}>
                  <td className="px-6 py-4">
                    {item.status === "Unread" ? (
                       <span className="w-2.5 h-2.5 bg-brand-600 flex rounded-full mx-auto shadow-[0_0_0_3px_rgba(20,68,245,0.2)]"></span>
                    ) : (
                      <Check className="w-4 h-4 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-neutral-900 font-semibold">{item.id}</div>
                    <div className="text-[11px] text-neutral-500 font-medium">{item.source}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm whitespace-normal leading-relaxed">
                    {item.content}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase
                      ${item.type === 'Question' ? 'bg-brand-100 text-brand-800' : 
                        item.type === 'Suggestion' ? 'bg-trust-bg border border-trust-200 text-trust-text' : 
                        'bg-danger-bg border border-danger-200 text-danger-600'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.user}</td>
                  <td className="px-6 py-4 text-neutral-500 font-medium">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="flex items-center ml-auto gap-1.5 px-3 py-1.5 bg-white border border-line-strong hover:bg-neutral-50 hover:border-brand-500 rounded-lg text-xs font-bold transition-all text-neutral-700">
                      Draft Card <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
