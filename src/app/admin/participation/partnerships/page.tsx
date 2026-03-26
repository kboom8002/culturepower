import { Search, Plus, Filter, Briefcase, Mail, Phone, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPartnershipInquiries } from "@/lib/actions/participation"
import { Chip } from "@/components/ui/chip"

export default async function AdminParticipationPartnershipsPage() {
  const inquiries = await getPartnershipInquiries()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Partnership Inquiries</h1>
        <p className="text-body text-neutral-600">B2B/B2G 파트너십 및 제휴 문의(Inquiries) 내역을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="기관명, 연락처 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm text-right">
             총 {inquiries.length}건의 문의
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Inquiry Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Received At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {inquiries.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">인입된 제휴 문의가 없습니다.</td></tr>
              ) : inquiries.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="font-bold text-neutral-900 flex items-center gap-2">
                       <Briefcase className="w-4 h-4 text-brand-600" />
                       {item.organization}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="text-neutral-900 font-bold">{item.contact_name}</div>
                     <div className="text-neutral-500 text-xs mt-0.5 flex gap-2">
                       <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">
                     {item.inquiry_type || "General"}
                  </td>
                  <td className="px-6 py-4">
                     {item.status === 'New' && <Chip variant="issue">New (미확인)</Chip>}
                     {item.status === 'In Progress' && <Chip variant="reviewed">Reviewing</Chip>}
                     {item.status === 'Replied' && <Chip variant="success">Replied</Chip>}
                     {item.status === 'Closed' && <Chip variant="default">Closed</Chip>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500 flex items-center gap-1.5 min-h-[56px]">
                     <CalendarClock className="w-3.5 h-3.5" />
                     {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Button variant="secondary" size="sm" className="px-3" disabled>답변하기</Button>
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
