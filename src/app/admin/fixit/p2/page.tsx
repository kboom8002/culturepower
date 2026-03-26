import { Info } from "lucide-react"
import { getFixitTickets, resolveFixitTicket } from "@/lib/actions/fixit"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function FixitP2Page() {
  const tickets = await getFixitTickets('P2', false)

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight flex items-center gap-3">
           <Info className="w-8 h-8 text-neutral-500" />
           P2 Fix-It Queue
        </h1>
        <p className="text-body text-neutral-600">품질 개선을 위한 일반적인 유지보수 (예: 180일 이상 업데이트 안 된 핵심 정오표 등) 목록입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col relative">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50">
          <div className="font-bold text-neutral-700 p-2 text-sm">
             {tickets.length} P2 Issues Pending
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Object</th>
                <th className="px-6 py-4">Issue Description</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {tickets.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500 font-bold">P2 결함 대기열이 비어 있습니다.</td></tr>
              ) : tickets.map((t) => (
                <tr key={t.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{t.id}</td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-900">{t.object_title || 'Unknown Object'}</span>
                        <span className="text-xs text-neutral-500">{t.object_type} • {t.object_id}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-700">{t.issue_category}</span>
                        <span className="text-xs text-neutral-500">{t.description}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                     <Link href={`/admin/content/${t.object_type.toLowerCase()}s/${t.object_id}`}>
                        <Button variant="secondary" size="sm" className="px-3">Edit Object</Button>
                     </Link>
                     <form action={async () => {
                        "use server";
                        await resolveFixitTicket(t.id, 'admin-123')
                     }}>
                        <Button type="submit" variant="primary" size="sm" className="px-3 bg-neutral-800 hover:bg-neutral-900 text-white border-0">Mark Fixed</Button>
                     </form>
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
