"use client"

import { useState, useTransition } from "react"
import { Search, Plus, Hash, FolderTree, Layers, Edit2, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Taxonomy, createTaxonomy, updateTaxonomy, deleteTaxonomy } from "@/lib/actions/settings"

export function TaxonomyManager({ initialTaxonomies }: { initialTaxonomies: Taxonomy[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTax, setEditingTax] = useState<Taxonomy | null>(null)
  const [formData, setFormData] = useState<Partial<Taxonomy>>({ type: 'Category', name: '', slug: '', description: '' })

  const filtered = initialTaxonomies.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenNew = () => {
    setEditingTax(null)
    setFormData({ type: 'Category', name: '', slug: '', description: '' })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (tax: Taxonomy) => {
    setEditingTax(tax)
    setFormData({ type: tax.type, name: tax.name, slug: tax.slug, description: tax.description || '' })
    setIsModalOpen(true)
  }

  const handleDelete = (tax: Taxonomy) => {
    if (!confirm("정말 이 분류 계통을 삭제하시겠습니까? 연결된 콘텐츠가 고아 객체가 될 수 있습니다.")) return
    startTransition(async () => {
      await deleteTaxonomy(tax.id, tax.type)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editingTax) {
        await updateTaxonomy(editingTax.id, formData)
      } else {
        await createTaxonomy(formData)
      }
      setIsModalOpen(false)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col pt-0">
      <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="태그/유형 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 bg-white"
            />
          </div>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenNew} disabled={isPending}>
          <Plus className="w-4 h-4 mr-1" /> 추가
        </Button>
      </div>
      
      <div className="overflow-x-auto relative min-h-[300px]">
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
            {filtered.map((tax) => (
              <tr key={tax.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="px-6 py-4">
                   {tax.type === 'Category' && <span className="flex items-center gap-1.5 text-brand-600 font-bold text-xs"><FolderTree className="w-3.5 h-3.5" /> Category</span>}
                   {tax.type === 'Tag' && <span className="flex items-center gap-1.5 text-purple-600 font-bold text-xs"><Hash className="w-3.5 h-3.5" /> Tag</span>}
                   {tax.type === 'Series' && <span className="flex items-center gap-1.5 text-warning-600 font-bold text-xs"><Layers className="w-3.5 h-3.5" /> Series</span>}
                   {tax.type === 'Section' && <span className="flex items-center gap-1.5 text-blue-600 font-bold text-xs"><Layers className="w-3.5 h-3.5" /> Section</span>}
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
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="tool" size="sm" onClick={() => handleOpenEdit(tax)} disabled={isPending}>
                      <Edit2 className="w-4 h-4 text-neutral-500" />
                    </Button>
                    <Button variant="tool" size="sm" onClick={() => handleDelete(tax)} disabled={isPending}>
                      <Trash2 className="w-4 h-4 text-danger-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center text-neutral-500">
                  결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isPending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="rounded-lg bg-white shadow-xl p-4 flex items-center gap-3 font-medium border border-line-soft text-brand-600">
              처리 중입니다...
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4">
          <div className="bg-surface-page w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-line-default flex flex-col">
             <div className="px-6 py-4 border-b border-line-soft flex items-center justify-between bg-white">
                <h3 className="font-bold text-lg text-neutral-900">{editingTax ? '분류 수정' : '새 분류 체계 등록'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900"><X className="w-5 h-5" /></button>
             </div>
             <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 bg-white">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-neutral-700">분류 (Type)</label>
                  <select 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                    required
                  >
                    <option value="Category">Category (기사, 정답 카테고리)</option>
                    <option value="Section">Section (LNB 섹션)</option>
                    <option value="Tag">Tag (자유 키워드)</option>
                    <option value="Series">Series (기획 연재물 묶음)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-neutral-700">이름 (Name)</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="예: 정책 동향"
                    className="border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-neutral-700">슬러그 (Slug)</label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    placeholder="예: policy-trends"
                    className="border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 font-mono"
                    required
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">URL 경로 및 필터링에 사용되며 영문 소문자와 하이픈(-)만 허용됩니다.</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-neutral-700">설명 (Description)</label>
                  <textarea 
                    value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="분류에 대한 간략한 메모"
                    className="border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 resize-none h-20"
                  />
                </div>
                <div className="pt-4 flex justify-end gap-2 mt-2">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>취소</Button>
                  <Button type="submit" variant="primary" disabled={isPending}>{editingTax ? '저장' : '추가하기'}</Button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  )
}
