import { Search, Plus, Filter, UserPlus, CheckCircle2, ShieldQuestion, Ban } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getMemberApps } from "@/lib/actions/participation"

export default async function AdminParticipationMembersPage() {
  const members = await getMemberApps()

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-success-50 text-success-700 font-bold text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> 승인됨</span>
      case 'Rejected': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-danger-50 text-danger-700 font-bold text-xs"><Ban className="w-3.5 h-3.5" /> 거절됨</span>
      case 'Hold': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 font-bold text-xs">보류</span>
      default: return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-50 text-brand-700 font-bold text-xs"><ShieldQuestion className="w-3.5 h-3.5" /> 심사중 (Screening)</span>
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Member Applications (가입 심사)</h1>
        <p className="text-body text-neutral-600">신규 회원 가입 신청서를 검토하고 승인 여부를 결정합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="이름, 이메일, 소속 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              상태: Screening
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Applied At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {members.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">신규 가입 신청이 없습니다.</td></tr>
              ) : members.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link href={`/admin/participation/members/${item.id}`} className="flex items-center gap-2 font-bold text-neutral-900 hover:text-brand-600 transition-colors">
                      <UserPlus className="w-4 h-4 text-neutral-400" />
                      <span>{item.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">{item.email}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.organization || "-"}</td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-neutral-600 font-mono text-xs">
                     {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/participation/members/${item.id}`}>
                      <Button variant="secondary" size="sm" className="px-3">심사하기</Button>
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
