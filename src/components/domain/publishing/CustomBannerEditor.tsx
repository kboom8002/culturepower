"use client"

import { useState, useTransition } from "react"
import { PageBanner, updatePageBanners } from "@/lib/actions/publishing"
import { ImageUploader } from "./ImageUploader"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical, Loader2 } from "lucide-react"

export function CustomBannerEditor({ 
  slotId, 
  pageRoute, 
  initialBanners, 
  max 
}: { 
  slotId: string, 
  pageRoute: string, 
  initialBanners: PageBanner[], 
  max: number 
}) {
  const [items, setItems] = useState<Partial<PageBanner>[]>(
    initialBanners.filter(b => b.slot_name === slotId).sort((a,b) => a.display_order - b.display_order).map(b => ({...b}))
  )
  const [isPending, startTransition] = useTransition()

  const handleAdd = () => {
    if (items.length >= max) {
      alert(`최대 ${max}개까지만 추가할 수 있습니다.`)
      return
    }
    setItems([...items, {
      id: `new-${Date.now()}`,
      page_route: pageRoute,
      slot_name: slotId,
      title: "",
      subtitle: "",
      image_url: null,
      link_url: "",
      display_order: items.length
    }])
  }

  const handleUpdate = (id: string, field: keyof PageBanner, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const handleRemove = (id: string) => {
    setItems(items.filter(i => i.id !== id).map((item, idx) => ({ ...item, display_order: idx })))
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return
    const newItems = [...items]
    const swap = direction === 'up' ? index - 1 : index + 1
    const temp = newItems[index]
    newItems[index] = newItems[swap]
    newItems[swap] = temp
    setItems(newItems.map((item, idx) => ({ ...item, display_order: idx })))
  }

  const handleSave = () => {
    const invalid = items.find(i => !i.title)
    if (invalid) {
      alert("모든 배너/카드의 활동명(Title)을 입력해주세요.")
      return
    }

    startTransition(async () => {
      const payload = items.map((i, idx) => ({ ...i, display_order: idx }))
      const res = await updatePageBanners(slotId, payload)
      if (res.success) alert("저장되었습니다.")
      else alert("오류가 발생했습니다: " + (res as any).error)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-line-default flex flex-col min-h-[500px]">
      <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
        <span className="font-bold text-neutral-900 flex items-center gap-2 border-l-4 border-brand-500 pl-2">
          커스텀 배너/카드 편집
        </span>
        <Button variant="primary" size="sm" onClick={handleAdd} disabled={items.length >= max || isPending}>
          <Plus className="w-4 h-4 mr-1" /> 새 카드 추가
        </Button>
      </div>

      <div className="p-4 bg-neutral-50/30 flex-1 flex flex-col gap-6">
        {items.length === 0 ? (
          <div className="border border-dashed p-10 mt-10 rounded-xl text-center flex flex-col items-center">
             <p className="text-neutral-500 font-bold mb-1">등록된 커스텀 카드가 없습니다.</p>
             <p className="text-xs text-neutral-400">새로운 활동이나 배너를 직접 만들어서 게시하세요.</p>
          </div>
        ) : items.map((item, idx) => (
          <div key={item.id} className="bg-white border border-line-default rounded-xl p-5 relative shadow-sm hover:border-brand-300 transition-colors">
            
            {/* Header / Controls */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-line-soft">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-neutral-900">배너 카드</span>
              </div>
              <div className="flex items-center gap-2">
                <button disabled={idx===0} onClick={()=>moveItem(idx,'up')} className="p-1 text-neutral-400 hover:text-brand-600 border rounded disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                <button disabled={idx===items.length-1} onClick={()=>moveItem(idx,'down')} className="p-1 text-neutral-400 hover:text-brand-600 border rounded disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                <Button variant="tertiary" size="sm" onClick={()=>handleRemove(item.id as string)} className="text-danger-500 hover:bg-danger-50 ml-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Form Body */}
            <div className="flex flex-col md:flex-row gap-6">
               <div className="w-full md:w-1/3">
                 <label className="text-xs font-bold text-neutral-500 mb-1.5 block">썸네일 이미지</label>
                 <ImageUploader value={item.image_url || null} onChange={(url) => handleUpdate(item.id as string, 'image_url', url)} />
               </div>
               
               <div className="flex-1 flex flex-col gap-4">
                 <div>
                   <label className="text-xs font-bold text-neutral-500 mb-1.5 block">제목 (필수)</label>
                   <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" 
                     placeholder="무엇을 하는 활동인지 작성하세요."
                     value={item.title || ""} onChange={e => handleUpdate(item.id as string, 'title', e.target.value)} 
                   />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-neutral-500 mb-1.5 block">링크 URL</label>
                   <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" 
                     placeholder="클릭 시 이동할 페이지 주소 (예: /events?series=abcd)"
                     value={item.link_url || ""} onChange={e => handleUpdate(item.id as string, 'link_url', e.target.value)} 
                   />
                 </div>
               </div>
            </div>

          </div>
        ))}
      </div>

      {items.length > 0 && (
         <div className="p-4 border-t border-line-soft bg-white flex justify-end">
           <Button variant="primary" onClick={handleSave} disabled={isPending}>
             {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "저장하기"}
           </Button>
         </div>
      )}
    </div>
  )
}
