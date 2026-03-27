import { Inbox, MessageSquareWarning, Filter, MoreHorizontal, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getInboxItems } from "@/lib/actions/inbox"
import { Chip } from "@/components/ui/chip"

export default async function AdminInboxPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const currentTab = (await searchParams).tab || 'Active'
  const items = await getInboxItems(currentTab)

  const TABS = [
    { id: 'Active', label: '신규 및 분류됨 (Active)' },
    { id: 'Processed', label: '자산 전환 중 (Processed)' },
    { id: 'Closed', label: '완료됨 (Closed)' }
  ]

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
           <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Inbox Operations</h1>
           <span className="px-2.5 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">{items.length} 건</span>
        </div>
        <p className="text-body text-neutral-600">
           사용자로부터 접수된 질문, 제안, 정정 요청을 확인하고 플랫폼의 지식 자산(SSoT)이나 결함 조치 티켓(Fix-It)으로 즉각 전환합니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Table Tabs & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-line-default bg-neutral-50/50">
          <div className="flex overflow-x-auto">
            {TABS.map(tab => (
              <Link
                key={tab.id}
                href={`/admin/inbox?tab=${tab.id}`}
                className={`flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                  currentTab === tab.id 
                    ? 'border-brand-500 text-brand-600 bg-white' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 p-4 md:p-0 md:pr-4">
             <Button variant="tool" size="sm" className="hidden lg:flex"><Filter className="w-4 h-4 mr-2" />필터</Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold">
              <tr>
                <th className="px-6 py-4 w-12 text-center">ID</th>
                <th className="px-6 py-4">유형 (Type)</th>
                <th className="px-6 py-4">긴급도</th>
                <th className="px-6 py-4">제목 (Subject) / 내용 요약</th>
                <th className="px-6 py-4">접수자</th>
                <th className="px-6 py-4">상태 (Status)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-24 text-center">
                     <div className="flex flex-col items-center justify-center gap-3 text-neutral-400">
                        <Inbox className="w-12 h-12 stroke-1 text-neutral-300" />
                        <span className="font-medium text-neutral-500">조건에 맞는 Inbox 항목이 없습니다.</span>
                     </div>
                  </td>
                </tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-[11px] text-neutral-400 text-center">
                     {item.id.split('-')[1]}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        {item.type === 'Question' || item.type === 'General' ? <MessageSquareWarning className="w-4 h-4 text-brand-500" /> : <AlertCircle className="w-4 h-4 text-warning-500" />}
                        <span className="font-bold text-neutral-700">{item.type}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     {item.priority === 'P0' && <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-danger-50 text-danger-600 border border-danger-100">P0 (Critical)</span>}
                     {item.priority === 'P1' && <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-warning-50 text-warning-700 border border-warning-200">P1 (High)</span>}
                     {item.priority === 'P2' && <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 border border-neutral-200">P2 (Low)</span>}
                  </td>
                  <td className="px-6 py-4 max-w-[300px]">
                    <div className="flex flex-col gap-1 truncate">
                       <Link href={`/admin/inbox/${item.id}`} className="font-bold text-neutral-900 hover:text-brand-600 truncate transition-colors">
                          {item.subject}
                       </Link>
                       <span className="text-[12px] text-neutral-500 truncate" title={item.content}>
                          {item.content.substring(0, 50)}...
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-neutral-800">{item.reporter_name || '익명'}</span>
                        {item.reporter_email && <span className="text-[11px] text-neutral-400 font-mono">{item.reporter_email}</span>}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'New' && <Chip variant="issue">New</Chip>}
                    {item.status === 'Triaged' && <Chip variant="primary">Triaged</Chip>}
                    {item.status === 'Mapped' && <Chip variant="reviewed">Mapped</Chip>}
                    {item.status === 'In Progress' && <Chip variant="success">In Progress</Chip>}
                    {item.status === 'Closed' && <Chip variant="default">Closed</Chip>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/inbox/${item.id}`}>
                      <Button variant="secondary" size="sm" className="bg-white group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                        검토 <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
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
