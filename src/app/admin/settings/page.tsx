import { Settings, Users, Shield, Terminal, Zap, Search, Plus, MoreHorizontal } from "lucide-react"

const MOCK_USERS = [
  { id: "U-112", name: "Super Admin", email: "admin@culturenetwork.kr", role: "Super Admin", status: "Active", lastLogin: "Just now" },
  { id: "U-113", name: "Director P", email: "policy@culturenetwork.kr", role: "Reviewer", status: "Active", lastLogin: "2 hours ago" },
  { id: "U-114", name: "Editor L", email: "editor@culturenetwork.kr", role: "Editor", status: "Active", lastLogin: "1 day ago" },
  { id: "U-115", name: "Ops Team", email: "ops@culturenetwork.kr", role: "Ops Manage", status: "Inactive", lastLogin: "3 weeks ago" },
]

export default function SettingsDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Settings
        </h1>
        <p className="text-body text-neutral-600">
          시스템 사용자 권한(RBAC), 외부 API 연동(Integrations), 분류 체계 및 감사 로그(Audit Log)를 통제합니다.
        </p>
      </div>

      <div className="flex md:flex-row flex-col gap-8 items-start">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-1 shrink-0">
          <button className="flex items-center gap-3 px-4 py-3 bg-brand-50 text-brand-800 font-bold rounded-xl border border-brand-200 transition-colors">
            <Users className="w-5 h-5 text-brand-600" /> Users & Roles
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-600 font-medium hover:bg-neutral-50 rounded-xl transition-colors">
            <Shield className="w-5 h-5 text-neutral-400" /> Security Policies
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-600 font-medium hover:bg-neutral-50 rounded-xl transition-colors">
            <Terminal className="w-5 h-5 text-neutral-400" /> Audit Logs
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-600 font-medium hover:bg-neutral-50 rounded-xl transition-colors">
            <Zap className="w-5 h-5 text-neutral-400" /> API Integrations
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-600 font-medium hover:bg-neutral-50 rounded-xl transition-colors mt-4">
             <Settings className="w-5 h-5 text-neutral-400" /> Advanced Options
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-line-soft flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-neutral-900">User Management</h2>
              <p className="text-sm text-neutral-500">SSoT 콘솔에 접속할 수 있는 내부 운영자의 계정과 발급된 Role을 관리합니다.</p>
            </div>
            <button className="bg-neutral-900 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm text-sm">
              <Plus className="w-4 h-4" />
              Invite Member
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
                <tr>
                  <th className="px-6 py-4">Name / Email</th>
                  <th className="px-6 py-4">System Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft text-neutral-900">
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral-900">{user.name}</span>
                        <span className="text-xs text-neutral-500">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wide
                        ${user.role === 'Super Admin' ? 'bg-danger-50 text-danger-700' : 
                          user.role === 'Reviewer' ? 'bg-trust-bg text-trust-text border border-trust-200' : 
                          'bg-neutral-100 text-neutral-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 font-bold text-xs ${user.status === 'Active' ? 'text-success-600' : 'text-neutral-400'}`}>
                        {user.status === 'Active' && <span className="w-2 h-2 rounded-full bg-success-500"></span>}
                        {user.status === 'Inactive' && <span className="w-2 h-2 rounded-full bg-neutral-300"></span>}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-6 p-4 rounded-xl bg-orange-50 border border-orange-200 flex flex-col gap-2">
            <h4 className="font-bold text-orange-900 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Role-Based Access Control (RBAC)
            </h4>
            <p className="text-sm text-orange-800/80 leading-relaxed">
              현재 할당된 **Super Admin** 권한 외의 모든 사용자는 Supabase의 RLS 정책에 의해 데이터 접근이 통제됩니다. <br/>
              Editor는 정답카드를 [작성]할 수 있지만 [퍼블릭 배포]할 수 없으며, Reviewer는 [검수 승인]만을 진행할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
