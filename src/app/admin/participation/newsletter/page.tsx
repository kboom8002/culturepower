import { Search, Plus, MailOpen, Activity, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSubscribers } from "@/lib/actions/participation"
import { Chip } from "@/components/ui/chip"

export default async function AdminParticipationNewsletterPage() {
  const subscribers = await getSubscribers()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Newsletter Subscribers</h1>
        <p className="text-body text-neutral-600">뉴스레터 이메일 구독자 목록과 세그먼트를 분리 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex gap-4 items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2">Total {subscribers.length} Subscribers</div>
           <Button variant="primary" disabled><Plus className="w-4 h-4 mr-2" /> 구독자 수동 추가</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Segment / Tag</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {subscribers.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 구독자가 없습니다.</td></tr>
              ) : subscribers.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold flex items-center gap-2">
                     <MailOpen className="w-4 h-4 text-neutral-400" />
                     {item.email}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">{item.name || "Unknown"}</td>
                  <td className="px-6 py-4">
                     {item.status === 'Active' && <Chip variant="success"><Activity className="w-3 h-3 mr-1 inline" /> Active</Chip>}
                     {item.status === 'Unsubscribed' && <Chip variant="issue">Unsubscribed</Chip>}
                     {item.status === 'Bounced' && <Chip variant="issue"><AlertCircle className="w-3 h-3 mr-1 inline" /> Bounced</Chip>}
                  </td>
                  <td className="px-6 py-4">
                     {item.segment_id ? <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-bold text-neutral-600">{item.audience_segments?.name || item.segment_id}</span> : <span className="text-neutral-400 text-xs italic">No Segment</span>}
                  </td>
                  <td className="px-6 py-4 text-right"><Button variant="secondary" size="sm" className="px-3" disabled>Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
