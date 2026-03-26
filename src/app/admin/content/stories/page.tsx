"use client"

import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, FileText, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

const MOCK_STORIES = [
  { id: "S-109", title: "지역 소멸을 박물관 미술관으로 막을 수 있을까", category: "Policy Insight", author: "에디터 M", status: "Public", date: "2026-03-20" },
  { id: "S-110", title: "K-콘텐츠 파이프라인의 핵심, 웹툰 제작의 모든 것", category: "Culture Power Report", author: "최디렉터", status: "Review", date: "2026-03-24" },
  { id: "S-111", title: "문화강국 네트워크 창간사", category: "Editorial", author: "Super Admin", status: "Draft", date: "Just now" },
]

export default function AdminStoriesIndexPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Stories (웹진 기사)</h1>
        <p className="text-body text-neutral-600">
          문화강국네트워크의 &apos;문강 RIO&apos; 섹션에 발행되는 해설형 기사(Story) 객체들을 제작하고 관리합니다.
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
                placeholder="Search Stories by title or author..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              Status
            </button>
          </div>
          
          <Link href="/admin/content/stories/new" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus className="w-4 h-4 xl:mr-2" />
              <span className="hidden xl:inline">새 기사 작성 (Rich Text)</span>
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Article ID</th>
                <th className="px-6 py-4">Story Title</th>
                <th className="px-6 py-4">Category (LNB)</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Last Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_STORIES.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500 group-hover:text-brand-600 transition-colors">{item.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/content/stories/${item.id}`} className="flex items-center gap-2 font-bold text-neutral-900 hover:text-brand-600 transition-colors">
                      <FileText className="w-4 h-4 text-neutral-400" />
                      <span className="truncate max-w-sm">{item.title}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-2">
                       {item.status === 'Draft' && <Chip variant="default">Draft</Chip>}
                       {item.status === 'Review' && <Chip variant="reviewed">Review</Chip>}
                       {item.status === 'Public' && <Chip variant="success">Public</Chip>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 flex items-center gap-1.5 font-medium min-h-[56px]">
                     {item.status === 'Public' ? <CheckCircle2 className="w-3.5 h-3.5 text-success-500" /> : <Clock className="w-3.5 h-3.5" />}
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link href={`/admin/content/stories/${item.id}`}>
                         <Button variant="secondary" size="sm" className="px-3">Edit</Button>
                       </Link>
                       <Button variant="tertiary" size="sm" className="px-3 text-danger-600 hover:text-danger-700 hover:bg-danger-50" onClick={() => alert(`${item.title} 기사를 삭제했습니다. (Demo)`)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-line-soft flex items-center justify-between text-sm text-neutral-500">
           <span>Showing 1 to 3 of 3 entries</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border border-line-strong rounded hover:bg-neutral-50 disabled:opacity-50" disabled>Prev</button>
             <button className="px-3 py-1 bg-brand-50 text-brand-700 font-bold border border-brand-200 rounded">1</button>
             <button className="px-3 py-1 border border-line-strong rounded hover:bg-neutral-50 disabled:opacity-50" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  )
}
