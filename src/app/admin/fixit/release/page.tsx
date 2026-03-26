import { CheckCircle2 } from "lucide-react"
import { getFixitTickets } from "@/lib/actions/fixit"

export default async function FixitReleasePage() {
  const tickets = await getFixitTickets(undefined, true) // isResolved = true

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-success-700 tracking-tight flex items-center gap-3">
           <CheckCircle2 className="w-8 h-8" />
           Release Log (Resolved Fix-Its)
        </h1>
        <p className="text-body text-neutral-600">성공적으로 조치(Fix)되어 재발행(Re-publish)된 결함 해결 히스토리 보드입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-success-200 shadow-sm overflow-hidden flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-success-500" />
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-success-50/50">
          <div className="font-bold text-success-800 p-2 text-sm">
             {tickets.length} Issues successfully resolved
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Object</th>
                <th className="px-6 py-4">Prior Issue</th>
                <th className="px-6 py-4">Resolved By</th>
                <th className="px-6 py-4">Resolution Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tickets.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500 font-bold">해결된 결함 내역이 없습니다.</td></tr>
              ) : tickets.map((t) => (
                <tr key={t.id} className="hover:bg-success-50/30 transition-colors opacity-80">
                  <td className="px-6 py-4 font-mono text-xs text-success-700">{t.id}</td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-900">{t.object_title || 'Unknown Object'}</span>
                        <span className="text-xs text-neutral-500">{t.object_type} • {t.object_id}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-700 block gap-2">
                           <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white mr-2 ${
                              t.priority === 'P0' ? 'bg-danger-600' :
                              t.priority === 'P1' ? 'bg-warning-500' : 'bg-neutral-500'
                           }`}>{t.priority}</span>
                           {t.issue_category}
                        </span>
                        <span className="text-xs text-neutral-500 mt-1">{t.description}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-brand-600">
                     {t.resolved_by === 'USR-1' ? 'Admin Team' : t.resolved_by || 'System'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {t.resolved_at ? new Date(t.resolved_at).toLocaleString() : '-'}
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
