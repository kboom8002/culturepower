import { Search, Plus, Filter, CalendarCheck, MapPin, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getEventRegistrations } from "@/lib/actions/participation"
import { Chip } from "@/components/ui/chip"
import { RegistrationActions } from "@/components/domain/participation/RegistrationActions"

export default async function AdminParticipationEventsPage() {
  const registrations = await getEventRegistrations()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Event Registrations</h1>
        <p className="text-body text-neutral-600">행사 참석자 명단을 확인하고 출석 여부를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="이름, 이메일, 행사 ID 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
              <Filter className="w-4 h-4" /> Filter By Event
            </button>
          </div>
          <div className="font-bold text-neutral-700 p-2 text-sm text-right">
             총 {registrations.length}명 대기/등록됨
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Event ID</th>
                <th className="px-6 py-4">Registrant</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reg Status</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {registrations.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">등록된 행사 신청자가 없습니다.</td></tr>
              ) : registrations.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-brand-600">
                     <span className="bg-brand-50 px-2 py-1 rounded">{item.event_id.slice(0,8)}</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-neutral-900">{item.name}</div>
                     <div className="text-neutral-500 text-xs mt-0.5">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium flex items-center gap-1.5 min-h-[56px]">
                     {item.attendance_type === 'Offline' ? <><MapPin className="w-4 h-4" /> 오프라인</> : <><Monitor className="w-4 h-4" /> 온라인</>}
                  </td>
                  <td className="px-6 py-4">
                     {item.status === 'Registered' && <Chip variant="default">Registered</Chip>}
                     {item.status === 'Confirmed' && <Chip variant="primary">Confirmed</Chip>}
                     {item.status === 'Cancelled' && <Chip variant="issue">Cancelled</Chip>}
                  </td>
                  <td className="px-6 py-4">
                     {item.is_attended ? <Chip variant="success">Attended</Chip> : <span className="text-neutral-400 text-xs font-bold px-2">Pending</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <RegistrationActions reg={item} />
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
