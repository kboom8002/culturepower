import { Search, Plus, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getGalleries } from "@/lib/actions/archive"
import { Chip } from "@/components/ui/chip"

export default async function AdminArchiveGalleriesPage() {
  const galleries = await getGalleries()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Galleries (행사 사진방)</h1>
        <p className="text-body text-neutral-600">행사, 토론회, 세미나 현장 사진 갤러리를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex gap-4 items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2">Showing {galleries.length} galleries</div>
           <Link href="/admin/archive/galleries/new">
             <Button variant="primary"><Plus className="w-4 h-4 mr-2" /> 새 갤러리 등록</Button>
           </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Photos Count</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Linked Event</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {galleries.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 갤러리가 없습니다.</td></tr>
              ) : galleries.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{item.title}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.photo_count} photos</td>
                  <td className="px-6 py-4"><Chip variant="success">{item.status}</Chip></td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/archive/galleries/${item.id}`}>
                      <Button variant="secondary" size="sm" className="px-3">Edit</Button>
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
