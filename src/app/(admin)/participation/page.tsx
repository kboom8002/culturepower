import { Users, Mail, Building2, Search, Filter, Download, UserCheck, XCircle } from "lucide-react"

const MOCK_CRM = [
  { id: "M-1023", name: "김철수", type: "Membership (정회원)", org: "지역문화재단", status: "Pending", date: "Today" },
  { id: "N-4055", name: "이영희", type: "Newsletter", org: "-", status: "Active", date: "Yesterday" },
  { id: "P-042", name: "박지훈", type: "Partnership", org: "A대학교 건축학과", status: "Review", date: "2 days ago" },
]

export default function ParticipationDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Participation Hub 
        </h1>
        <p className="text-body text-neutral-600">
          문화강국네트워크의 회원 가입 심사, 뉴스레터 구독자명단 처리, 그리고 외부 단체의 파트너십 제안을 통합 관리하는 CRM 시스템입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-2">
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <Users className="w-8 h-8 text-brand-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Member Applications</h3>
          <p className="text-sm text-neutral-500 mt-1">SSoT 기여자 정회원 심사</p>
          <div className="mt-4 text-2xl font-bold text-neutral-900">14 <span className="text-sm font-medium text-danger-600">Pending</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <Mail className="w-8 h-8 text-trust-text mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Newsletter DB</h3>
          <p className="text-sm text-neutral-500 mt-1">이메일 발송 리스트 엑스포트</p>
           <div className="mt-4 text-2xl font-bold text-neutral-900">4,055 <span className="text-sm font-medium text-success-600">Active</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 cursor-pointer transition-colors group">
          <Building2 className="w-8 h-8 text-neutral-700 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-[18px] font-bold text-neutral-900">Partnerships</h3>
          <p className="text-sm text-neutral-500 mt-1">제휴 및 협력 네트워크 검토</p>
          <div className="mt-4 text-2xl font-bold text-neutral-900">3 <span className="text-sm font-medium text-trust-600">In Review</span></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or org..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
             <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Type Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-neutral-800 transition-colors">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Request Type</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date applied</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_CRM.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.org}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide
                      ${item.status === 'Pending' ? 'text-danger-600' : 
                        item.status === 'Active' ? 'text-success-600' : 
                        'text-trust-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-medium">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-neutral-400">
                       <button className="p-1.5 hover:text-success-600 hover:bg-success-bg rounded-lg transition-colors" title="Approve">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:text-danger-600 hover:bg-danger-bg rounded-lg transition-colors" title="Reject">
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
