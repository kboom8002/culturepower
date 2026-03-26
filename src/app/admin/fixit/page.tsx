import { Wrench, Search, AlertTriangle, Bug, Terminal, CheckCircle2 } from "lucide-react"

const MOCK_FIXIT = [
  { id: "FX-889", status: "Open", severity: "P0", component: "AnswerCard: A-124", issue: "Broken Evidence Link / 404 Error", reporter: "Automated Link Check", deadline: "Today" },
  { id: "FX-888", status: "In Progress", severity: "P1", component: "AI Feed (NDJSON)", issue: "Invalid metadata payload blocks Perplexity Bot", reporter: "Ops Monitoring", deadline: "Tommorrow" },
  { id: "FX-887", status: "Resolved", severity: "P2", component: "Story: S-045", issue: "Typo in the sub-headline", reporter: "User Correction via Inbox", deadline: "-" },
]

export default function FixitDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Fix-It Hub
        </h1>
        <p className="text-body text-neutral-600">
          시스템 오류, 깨진 링크(404), 심각한 오보(P0) 등 긴급 조치가 필요한 문제들을 티켓팅하고 조치 상태를 추적합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-4">
         <div className="bg-danger-600 p-5 rounded-2xl shadow-sm text-white flex flex-col justify-center relative overflow-hidden">
          <AlertTriangle className="w-24 h-24 absolute -right-4 -bottom-4 text-white opacity-20" />
          <div className="text-danger-100 font-bold mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            P0 Critical
          </div>
          <div className="text-[32px] font-extrabold">1</div>
          <div className="text-sm text-danger-100 mt-1">Requires immediate action</div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">P1 High (Ops)</div>
          <div className="text-[28px] font-extrabold text-neutral-900">1</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">P2 Medium</div>
          <div className="text-[28px] font-extrabold text-neutral-900">4</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-line-default shadow-sm">
          <div className="text-sm font-bold text-neutral-500 mb-1">Resolved (7days)</div>
          <div className="text-[28px] font-extrabold text-success-text">18</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search Ticket ID or Issue..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Ticket</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Issue Description</th>
                <th className="px-6 py-4">Target Component</th>
                <th className="px-6 py-4">Reporter</th>
                <th className="px-6 py-4">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_FIXIT.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">
                    <span className="hover:text-brand-700 hover:underline cursor-pointer">{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold
                      ${item.severity === 'P0' ? 'bg-danger-600 text-white' : 
                        item.severity === 'P1' ? 'bg-orange-100 text-orange-800' : 
                        'bg-neutral-100 text-neutral-600'}`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 font-bold text-xs text-neutral-700">
                      {item.status === 'Open' ? <AlertTriangle className="w-3.5 h-3.5 text-danger-500" /> : 
                       item.status === 'In Progress' ? <Terminal className="w-3.5 h-3.5 text-brand-500" /> :
                       <CheckCircle2 className="w-3.5 h-3.5 text-success-500"/>}
                      {item.status}
                    </span>
                  </td>
                   <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-[280px]">
                    {item.issue}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-xs font-mono bg-neutral-50 px-2 py-1 mx-4 my-2 rounded-md inline-block border border-line-soft">
                    {item.component}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{item.reporter}</td>
                  <td className={`px-6 py-4 font-bold ${item.deadline === 'Today' ? 'text-danger-600' : 'text-neutral-500'}`}>
                    {item.deadline}
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
