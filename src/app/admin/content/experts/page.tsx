import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, UserCircle, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

const MOCK_EXPERTS = [
  { id: "EXP-001", name: "김에디터", affiliation: "문화강국네트워크", title: "수석 연구위원", expertise: ["K-문명", "정책연구"], status: "Public", date: "2026-03-25" },
  { id: "EXP-002", name: "최디렉터", affiliation: "한국예술종합학교", title: "겸임교수", expertise: ["지역문화", "디지털아트"], status: "Review", date: "2026-03-23" },
  { id: "EXP-003", name: "이글로벌", affiliation: "해외문화홍보원", title: "정책기획관", expertise: ["글로벌 중추", "외교"], status: "Draft", date: "Just now" },
]

export default function AdminExpertsIndexPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Experts (전문가 풀)</h1>
        <p className="text-body text-neutral-600">
          신뢰 텍스트를 검수하고(Reviewer) 웹진 기사를 작성하는(Creator) 기여자 및 전문가 객체를 등록 및 관리합니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search by name, affiliation or expertise..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Status
            </button>
          </div>
          
          <Link href="/admin/content/experts/new" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus className="w-4 h-4 xl:mr-2" />
              <span className="hidden xl:inline">새 전문가 등록</span>
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Expert Profile</th>
                <th className="px-6 py-4">Expertise (전문 분야)</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">SsoT Linked</th>
                <th className="px-6 py-4">Last Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_EXPERTS.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500 group-hover:text-brand-600 transition-colors">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-line-soft flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-neutral-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral-900 tracking-tight">{item.name}</span>
                        <span className="text-xs text-neutral-500">{item.affiliation} · {item.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {item.expertise.map(exp => (
                        <span key={exp} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md text-[11px] font-medium border border-line-soft">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-2">
                       {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                       {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                       {item.status === 'Public' && <Chip variant="success">Public</Chip>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    <span className="text-body-sm font-medium">12 Answers, 3 Stories</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 flex items-center gap-1.5 font-medium min-h-[72px]">
                     {item.status === 'Public' ? <CheckCircle2 className="w-3.5 h-3.5 text-success-500" /> : <Clock className="w-3.5 h-3.5" />}
                    {item.date}
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
