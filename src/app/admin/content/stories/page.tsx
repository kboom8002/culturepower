import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, FileText, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { getStories } from "@/lib/actions/story"
import { StoryListActions } from "@/components/domain/story/StoryListActions"

export default async function AdminStoriesIndexPage() {
  const stories = await getStories()
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
              {stories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    등록된 기사가 없습니다. 새 기사를 작성해 보세요.
                  </td>
                </tr>
              ) : stories.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-neutral-500 group-hover:text-brand-600 transition-colors">{item.id.slice(0,8)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/content/stories/${item.id}`} className="flex items-center gap-2 font-bold text-neutral-900 hover:text-brand-600 transition-colors">
                      <FileText className="w-4 h-4 text-neutral-400" />
                      <span className="truncate max-w-sm">{item.title}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-medium">
                    {item.section_name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="mr-2">
                       {item.status === 'DRAFT' && <Chip variant="default">Draft</Chip>}
                       {item.status === 'REVIEW' && <Chip variant="reviewed">Review</Chip>}
                       {item.status === 'PUBLISHED' && <Chip variant="success">Public</Chip>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {item.experts && item.experts.length > 0 ? item.experts.map((e: any) => e.name).join(", ") : "-"}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 flex items-center gap-1.5 font-medium min-h-[56px] text-xs">
                     {item.status === 'PUBLISHED' ? <CheckCircle2 className="w-3.5 h-3.5 text-success-500" /> : <Clock className="w-3.5 h-3.5" />}
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <StoryListActions storyId={item.id} title={item.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-line-soft flex items-center justify-between text-sm text-neutral-500">
           <span>Showing {stories.length} entries</span>
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
