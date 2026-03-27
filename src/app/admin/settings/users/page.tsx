import { Search, ShieldAlert, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAdminUsers } from "@/lib/actions/settings"
import { Chip } from "@/components/ui/chip"
import { RoleSelect } from "@/components/domain/settings/RoleSelect"

export default async function AdminUsersPage() {
  const users = await getAdminUsers()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Users & Roles</h1>
        <p className="text-body text-neutral-600">어드민 콘솔에 접속할 수 있는 내부 관리자들의 권한(Role)을 제어하고 활성화 상태를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="이름, 이메일 검색..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          <Button variant="primary" size="sm">관리자 초대</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs uppercase">
                           {user.name.substring(0, 2)}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-neutral-900">{user.name}</span>
                           <span className="text-[12px] text-neutral-500">{user.email}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <RoleSelect userId={user.id} currentRole={user.role} />
                  </td>
                  <td className="px-6 py-4">
                     {user.is_active ? <Chip variant="success"><CheckCircle2 className="w-3 h-3 mr-1 inline" /> Active</Chip> : <Chip variant="issue">Disabled</Chip>}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 text-xs font-mono">
                     {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never'}
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
