import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, FileText, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { getBriefs } from "@/lib/actions/brief"

export default async function AdminBriefsPage() {
  const briefs = await getBriefs()
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Briefs (지식 브리프)</h1>
        <p className="text-body text-neutral-600">
          핵심 요약 PDF 리포트와 함께 단답식, 다이제스트 형태로 발행되는 브리프(Brief) 객체들을 제작하고 관리합니다.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" placeholder="Search Briefs..." className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500" />
            </div>
          </div>
          <Link href="/admin/content/briefs/new" className="w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus className="w-4 h-4 xl:mr-2" />
              <span className="hidden xl:inline">새 브리프 작성</span>
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">PDF Attached</th>
                <th className="px-6 py-4">Last Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {briefs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 브리프가 없습니다.</td></tr>
              ) : briefs.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link href={`/admin/content/briefs/${item.id}`} className="font-bold text-neutral-900 hover:text-brand-600 truncate max-w-sm block">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                     {item.status === 'DRAFT' && <Chip variant="default">Draft</Chip>}
                     {item.status === 'REVIEW' && <Chip variant="reviewed">Review</Chip>}
                     {item.status === 'PUBLISHED' && <Chip variant="success">Public</Chip>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                     {item.pdf_asset_id ? "Yes" : "-"}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 text-xs">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/content/briefs/${item.id}`}>
                      <Button variant="secondary" size="sm">Edit</Button>
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
