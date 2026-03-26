import { Search, Plus, Hash, FolderTree, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTaxonomies } from "@/lib/actions/settings"

export default async function AdminTaxonomiesPage() {
  const taxonomies = await getTaxonomies()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Taxonomies (분류 체계)</h1>
        <p className="text-body text-neutral-600">콘텐츠를 구획하는 글로벌 카테고리, 태그, 시리즈 마스터 데이터를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="태그/유형 검색..."
                className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> 추가</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-32">Type</th>
                <th className="px-6 py-4">Name (Slug)</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {taxonomies.map((tax) => (
                <tr key={tax.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     {tax.type === 'Category' && <span className="flex items-center gap-1.5 text-brand-600 font-bold text-xs"><FolderTree className="w-3.5 h-3.5" /> Category</span>}
                     {tax.type === 'Tag' && <span className="flex items-center gap-1.5 text-purple-600 font-bold text-xs"><Hash className="w-3.5 h-3.5" /> Tag</span>}
                     {tax.type === 'Series' && <span className="flex items-center gap-1.5 text-warning-600 font-bold text-xs"><Layers className="w-3.5 h-3.5" /> Series</span>}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-900 text-sm">{tax.name}</span>
                        <span className="text-xs text-neutral-400 font-mono mt-0.5">{tax.slug}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 truncate max-w-sm">
                     {tax.description || <span className="italic text-neutral-300">No description</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="secondary" size="sm" className="px-3">Edit</Button>
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
