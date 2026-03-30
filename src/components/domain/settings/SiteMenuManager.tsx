"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainMenuWithItems, SiteMenu, createSiteMenu, updateSiteMenu, deleteSiteMenu, updateMenuOrders } from "@/lib/actions/navigation"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Edit2, Trash2, Plus, AlertCircle } from "lucide-react"

export function SiteMenuManager({ initialMenus }: { initialMenus: MainMenuWithItems[] }) {
  const router = useRouter()
  const [menus, setMenus] = useState<MainMenuWithItems[]>(initialMenus)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<{ label: string, href: string, parent_id: string | null, is_active: boolean }>({
    label: '', href: '', parent_id: null, is_active: true
  })

  // Open modal for Create
  const handleCreate = (parent_id: string | null = null) => {
    setEditingId(null)
    setFormData({ label: '', href: '', parent_id, is_active: true })
    setErrorMsg("")
    setIsModalOpen(true)
  }

  // Open modal for Edit
  const handleEdit = (menu: SiteMenu) => {
    setEditingId(menu.id)
    setFormData({ label: menu.label, href: menu.href, parent_id: menu.parent_id, is_active: menu.is_active })
    setErrorMsg("")
    setIsModalOpen(true)
  }

  // Save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrorMsg("")

    const res = editingId 
      ? await updateSiteMenu(editingId, formData)
      : await createSiteMenu(formData)
    
    if (!res.success) {
      setErrorMsg(res.error || "메뉴 저장에 실패했습니다.")
    } else {
      setIsModalOpen(false)
      // refresh UI
      router.refresh()
    }
    setIsSaving(false)
  }

  // Delete
  const handleDelete = async (id: string, label: string) => {
    if (!window.confirm(`'${label}' 메뉴를 삭제하시겠습니까?`)) return
    
    setIsSaving(true)
    const res = await deleteSiteMenu(id)
    if (!res.success) {
      alert(res.error || "메뉴 삭제에 실패했습니다.")
    } else {
      router.refresh()
    }
    setIsSaving(false)
  }

  // Swapping logic for simple ordering
  // We identify siblings, find current index, swap display_order with next/prev, then update both
  const handleSwap = async (siblingGroup: SiteMenu[], currentIndex: number, direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex === 0) return
    if (direction === 'down' && currentIndex === siblingGroup.length - 1) return

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    const currentMenu = siblingGroup[currentIndex]
    const targetMenu = siblingGroup[targetIndex]

    // Swap their display_orders. If they happen to be equal, we enforce a difference.
    let newCurrentOrder = targetMenu.display_order
    const newTargetOrder = currentMenu.display_order
    
    if (newCurrentOrder === newTargetOrder) {
      newCurrentOrder = targetMenu.display_order + (direction === 'up' ? -10 : 10)
    }

    setIsSaving(true)
    const res = await updateMenuOrders([
      { id: currentMenu.id, display_order: newCurrentOrder },
      { id: targetMenu.id, display_order: newTargetOrder }
    ])

    if (!res.success) {
      alert("순서 변경에 실패했습니다.")
    } else {
      router.refresh()
    }
    setIsSaving(false)
  }

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-start">
        <Button variant="primary" disabled={isSaving} onClick={() => handleCreate(null)}>
          <Plus className="w-4 h-4 mr-2" />
          1차 메인 메뉴 추가
        </Button>
      </div>

      <div className="bg-white border border-line-default rounded-xl overflow-hidden flex flex-col shadow-sm">
        {/* Header */}
        <div className="bg-surface-soft border-b border-line-default px-6 py-4 flex items-center font-bold text-sm text-neutral-600">
          <div className="flex-1">메뉴 구조 (Label)</div>
          <div className="w-[300px] hidden md:block">연결 링크 (URL)</div>
          <div className="w-[100px] text-center hidden sm:block">상태</div>
          <div className="w-[180px] text-right">관리</div>
        </div>

        {/* Tree List */}
        <div className="flex flex-col">
          {menus.length === 0 ? (
             <div className="p-12 text-center text-neutral-500 text-sm">등록된 메뉴가 없습니다.</div>
          ) : (
            menus.map((root, rootIndex) => (
              <div key={root.id} className="flex flex-col border-b border-line-soft last:border-0">
                {/* 1 Depth Row */}
                <div className={`flex items-center px-6 py-4 hover:bg-neutral-50 transition-colors ${!root.is_active ? 'opacity-50' : ''}`}>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="font-bold text-neutral-900 text-[15px]">{root.label}</span>
                  </div>
                  <div className="w-[300px] hidden md:block text-sm text-neutral-500 truncate pr-4" title={root.href}>{root.href}</div>
                  <div className="w-[100px] justify-center hidden sm:flex">
                     {root.is_active ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">노출</span>
                     ) : (
                        <span className="px-2 py-1 bg-neutral-200 text-neutral-600 text-xs font-bold rounded-full">숨김</span>
                     )}
                  </div>
                  <div className="w-[180px] flex items-center justify-end gap-1">
                    <button disabled={isSaving} onClick={() => handleSwap(menus, rootIndex, 'up')} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-neutral-100">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button disabled={isSaving} onClick={() => handleSwap(menus, rootIndex, 'down')} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-neutral-100">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-line-default mx-1"></div>
                    <button disabled={isSaving} onClick={() => handleEdit(root)} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-neutral-100">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button disabled={isSaving} onClick={() => handleCreate(root.id)} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-neutral-100" title="하위 메뉴 추가">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button disabled={isSaving} onClick={() => handleDelete(root.id, root.label)} className="p-1.5 text-neutral-400 hover:text-red-500 disabled:opacity-30 rounded-md hover:bg-red-50" title="메뉴 삭제">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2 Depth Rows */}
                {root.items.length > 0 && (
                  <div className="flex flex-col bg-neutral-50">
                    {root.items.map((sub, subIndex) => (
                      <div key={sub.id} className={`flex items-center pl-14 pr-6 py-3 border-t border-line-soft hover:bg-neutral-100 transition-colors ${!sub.is_active ? 'opacity-50' : ''}`}>
                        <div className="flex-1 flex items-center gap-2">
                           <div className="w-4 h-px bg-neutral-300"></div>
                           <span className="font-semibold text-neutral-700 text-[14px]">{sub.label}</span>
                        </div>
                        <div className="w-[300px] hidden md:block text-[13px] text-neutral-500 truncate pr-4" title={sub.href}>{sub.href}</div>
                        <div className="w-[100px] justify-center hidden sm:flex">
                           {sub.is_active ? (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded-full">노출</span>
                           ) : (
                              <span className="px-2 py-0.5 bg-neutral-200 text-neutral-600 text-[11px] font-bold rounded-full">숨김</span>
                           )}
                        </div>
                        <div className="w-[180px] flex items-center justify-end gap-1">
                          <button disabled={isSaving} onClick={() => handleSwap(root.items, subIndex, 'up')} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-white">
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button disabled={isSaving} onClick={() => handleSwap(root.items, subIndex, 'down')} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-white">
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <div className="w-px h-4 bg-line-default mx-1"></div>
                          <button disabled={isSaving} onClick={() => handleEdit(sub)} className="p-1.5 text-neutral-400 hover:text-brand-600 disabled:opacity-30 rounded-md hover:bg-white">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button disabled={isSaving} onClick={() => handleDelete(sub.id, sub.label)} className="p-1.5 text-neutral-400 hover:text-red-500 disabled:opacity-30 rounded-md hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Basic Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => !isSaving && setIsModalOpen(false)}></div>
          
          {/* Dialog Container */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col pointer-events-auto">
            <div className="px-6 py-5 border-b border-line-default flex items-center justify-between bg-surface-soft">
              <h2 className="text-xl font-bold text-neutral-900">{editingId ? '메뉴 항목 수정' : '신규 메뉴 추가'}</h2>
              <button disabled={isSaving} onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-neutral-900 text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-5 p-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}
            
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-800">메뉴명 (Label)</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  placeholder="예: 정답카드"
                  className="px-4 py-2.5 bg-white border border-line-strong rounded-xl text-neutral-900 w-full focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-800">대상 경로 (URL)</label>
                <input 
                  type="text" 
                  required
                  placeholder="예: /answers"
                  className="px-4 py-2.5 bg-white border border-line-strong rounded-xl text-neutral-900 w-full focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  value={formData.href}
                  onChange={e => setFormData({ ...formData, href: e.target.value })}
                />
              </div>

              {/* Readonly parent indicator - in a full CMS this would be a select, but handled differently here for simplicity */}
              {formData.parent_id && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-800">상위(부모) 메뉴</label>
                  <label className="px-4 py-2 bg-neutral-100 text-neutral-500 text-sm border border-line-default rounded-xl w-full">
                    {menus.find(m => m.id === formData.parent_id)?.label || '알 수 없음'} (변경 불가)
                  </label>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-bold text-neutral-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-600"
                    checked={formData.is_active}
                    onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  사용(노출) 활성화
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-line-default">
                <Button type="button" variant="tertiary" size="md" onClick={() => setIsModalOpen(false)} disabled={isSaving}>취소</Button>
                <Button type="submit" variant="primary" size="md" disabled={isSaving}>{isSaving ? '저장 중...' : '확인(저장)'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disabled Overlay on saving array lists (prevent multiple clicks) */}
      {isSaving && !isModalOpen && (
        <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-[2px] cursor-wait rounded-xl"></div>
      )}
    </div>
  )
}
