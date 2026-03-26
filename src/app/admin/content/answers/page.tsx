import { Search, Plus, Filter, HelpCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAnswers } from "@/lib/actions/content"
import { Chip } from "@/components/ui/chip"
import Link from "next/link"

export default async function AdminAnswersPage() {
  const answers = await getAnswers()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Answers (정답카드)</h1>
        <p className="text-body text-neutral-600">지식인의 질문 기반 정답 문서를 전문적으로 제작하고 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="질문 제목, 전문가 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
              <Filter className="w-4 h-4" /> Category
            </button>
          </div>
          <Link href="/admin/content/answers/new">
             <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> 새 정답카드 작성</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Title & Question</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expert / Topic</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {answers.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 정답카드가 없습니다.</td></tr>
              ) : answers.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                           <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col truncate max-w-sm">
                           <span className="font-bold text-neutral-900 truncate">{item.title}</span>
                           <span className="text-[12px] text-neutral-500 font-mono mt-0.5">{item.id}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                     {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                     {item.status === 'Scheduled' && <Chip variant="primary">Scheduled</Chip>}
                     {item.status === 'Public' && <Chip variant="success">Public</Chip>}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-medium text-neutral-800">{item.experts?.name || '담당 전문가 없음'}</span>
                        <span className="text-[12px] text-neutral-500 truncate max-w-[120px]">{item.content_topics?.name || '미분류'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                     {new Date(item.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="secondary" size="sm" className="px-3" disabled><Eye className="w-4 h-4 mr-1" /> View</Button>
                       <Link href={`/admin/content/answers/${item.id}`}>
                         <Button variant="tertiary" size="sm" className="px-3">Edit</Button>
                       </Link>
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
