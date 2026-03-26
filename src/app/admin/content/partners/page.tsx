"use client"

import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, Building2, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

const MOCK_PARTNERS = [
  { 
    id: "PTN-001", 
    name: "한국문화예술위원회", 
    type: "협력기관", 
    relationSummary: "공동 캠페인 및 콘텐츠 교류", 
    linkedCount: { events: 2, topics: 1 }, 
    status: "Public", 
    date: "2026-03-25" 
  },
  { 
    id: "PTN-002", 
    name: "서울문화재단", 
    type: "후원기관", 
    relationSummary: "지역문화 진흥 관련 자료 제공", 
    linkedCount: { events: 0, topics: 3 }, 
    status: "Review", 
    date: "2026-03-22" 
  },
  { 
    id: "PTN-003", 
    name: "글로벌아트네트워크", 
    type: "협력기관", 
    relationSummary: "해외 교류 프로그램 파트너", 
    linkedCount: { events: 1, topics: 0 }, 
    status: "Draft", 
    date: "Just now" 
  },
]

export default function AdminPartnersIndexPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Partners (협력/후원 기관)</h1>
        <p className="text-body text-neutral-600">
          문화강국네트워크와 협력하는 파트너 기관, 후원사 및 관련 단체를 관리합니다.
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
                placeholder="Search by organization name or type..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors shrink-0">
              <Filter className="w-4 h-4" />
              Status
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors shrink-0">
              <Filter className="w-4 h-4" />
              Type
            </button>
          </div>
          
          <Link href="/admin/content/partners/new" className="w-full md:w-auto self-end md:self-auto">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus className="w-4 h-4 xl:mr-2" />
              <span className="hidden xl:inline">새 파트너 등록</span>
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-24">ID</th>
                <th className="px-6 py-4 min-w-[200px]">Organization (기관명)</th>
                <th className="px-6 py-4">Type (분류)</th>
                <th className="px-6 py-4 min-w-[200px]">Relation Summary</th>
                <th className="px-6 py-4">Linked Objects</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 w-40">Last Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_PARTNERS.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500 group-hover:text-brand-600 transition-colors">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-line-soft flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-neutral-400" />
                      </div>
                      <span className="font-bold text-neutral-900 tracking-tight truncate">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md text-[11px] font-medium border border-line-soft inline-block">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neutral-500 truncate block max-w-[240px]">{item.relationSummary}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    <span className="text-body-sm font-medium">
                      {item.linkedCount.events > 0 && `${item.linkedCount.events} Events `}
                      {item.linkedCount.topics > 0 && `${item.linkedCount.topics} Topics`}
                      {item.linkedCount.events === 0 && item.linkedCount.topics === 0 && "None"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-2">
                       {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                       {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                       {item.status === 'Public' && <Chip variant="success">Public</Chip>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
                      {item.status === 'Public' ? <CheckCircle2 className="w-3.5 h-3.5 text-success-500" /> : <Clock className="w-3.5 h-3.5" />}
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link href={`/admin/content/partners/${item.id}`}>
                         <Button variant="secondary" size="sm" className="px-3">Edit</Button>
                       </Link>
                       <Button variant="tertiary" size="sm" className="px-3 text-danger-600 hover:text-danger-700 hover:bg-danger-50" onClick={() => alert(`${item.name} 파트너를 삭제했습니다. (Demo)`)}>Delete</Button>
                    </div>
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
