import { Tags, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAudienceSegments } from "@/lib/actions/participation"

export default async function AdminParticipationSegmentsPage() {
  const segments = await getAudienceSegments()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Audience Segments</h1>
        <p className="text-body text-neutral-600">사용자 타겟팅 및 분류를 위한 태그(Segments)를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex gap-4 items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2">Showing {segments.length} segments</div>
           <Button variant="primary" disabled><Plus className="w-4 h-4 mr-2" /> 새 세그먼트 생성</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-64">Segment Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 w-48 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {segments.length === 0 ? (
                 <tr><td colSpan={3} className="px-6 py-12 text-center text-neutral-500">생성된 세그먼트가 없습니다.</td></tr>
              ) : segments.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold flex items-center gap-2">
                    <Tags className="w-4 h-4 text-brand-500" />
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.description || "-"}</td>
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
