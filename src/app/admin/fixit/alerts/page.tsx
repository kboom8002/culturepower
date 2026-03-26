import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSystemAlerts } from "@/lib/actions/observatory"

export default async function AdminFixitAlertsPage() {
  const alerts = await getSystemAlerts(true)

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">System Alerts</h1>
        <p className="text-body text-neutral-600">안정적인 서비스 운영을 저해하는 시스템 에러, 보안 침해 시도, 연동 오류 등 긴급 경고 현황입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="font-bold text-neutral-700 p-2 text-sm">
             Total {alerts.length} Runtime Alerts Logged
          </div>
          <Button variant="secondary" size="sm">Mark All as Read</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-12">Level</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Error Message & Code</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {alerts.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">발생한 알람이 없습니다. 플랫폼 건강 상태가 최상입니다.</td></tr>
              ) : alerts.map((alert) => (
                <tr key={alert.id} className={`hover:bg-neutral-50/50 transition-colors ${alert.is_resolved ? 'opacity-50 grayscale' : ''}`}>
                  <td className="px-6 py-4 text-center">
                     {alert.severity === 'Critical' && <ShieldAlert className="w-5 h-5 text-danger-500" />}
                     {alert.severity === 'Warning' && <AlertTriangle className="w-5 h-5 text-warning-500" />}
                     {alert.severity === 'Info' && <Info className="w-5 h-5 text-brand-500" />}
                  </td>
                  <td className="px-6 py-4">
                     <span className="font-bold text-[11px] px-2 py-1 rounded tracking-widest uppercase bg-neutral-100 text-neutral-600">
                        {alert.module}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className={`font-bold ${alert.severity === 'Critical' ? 'text-danger-700' : 'text-neutral-900'} truncate max-w-[400px]`}>
                           {alert.message}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono mt-0.5">{alert.error_code || 'Unknown Code'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {new Date(alert.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                     {alert.is_resolved ? (
                        <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-success-600">
                           <CheckCircle2 className="w-4 h-4" /> Resolved
                        </div>
                     ) : (
                        <Button variant="primary" size="sm" className="px-3 bg-danger-600 hover:bg-danger-700">Approve Fix</Button>
                     )}
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
