import { Search, Database, Clock } from "lucide-react"
import { getAuditLogs } from "@/lib/actions/settings"

export default async function AdminAuditLogPage() {
  const logs = await getAuditLogs()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">System Audit Log</h1>
        <p className="text-body text-neutral-600">슈퍼 어드민 전용 기능: 플랫폼의 주요 데이터 변경, 삭제, 생성 이력을 추적합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="User 이메일, 액션 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm text-right flex items-center gap-2">
             <Database className="w-4 h-4 text-brand-500" />
             최근 100건 조회 됨
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor (User)</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target Resource</th>
                <th className="px-6 py-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {logs.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">기록된 이력이 없습니다.</td></tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500 flex items-center gap-2 min-h-[56px]">
                     <Clock className="w-4 h-4 text-neutral-400" />
                     {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-neutral-900">{log.admin_users?.name || 'System'}</div>
                     <div className="text-xs text-neutral-500">{log.admin_users?.email || 'System Action'}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase ${
                        log.action === 'LOGIN' ? 'bg-success-50 text-success-700' :
                        log.action === 'DELETE' ? 'bg-danger-50 text-danger-700' :
                        'bg-brand-50 text-brand-700'
                     }`}>
                        {log.action}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-600">
                     {log.target_table ? `${log.target_table} [${log.target_id?.slice(0,8) || ''}]` : '-'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-400">
                     {log.ip_address || 'unknown'}
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
