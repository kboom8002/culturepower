"use client"

import { useState, useTransition } from "react"
import { FeaturedContent, updateFeaturedContent, searchPublicContent } from "@/lib/actions/publishing"
import { Star, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"

export function ContentRefEditor({ slotId, initialItems, max }: { slotId: string, initialItems: FeaturedContent[], max: number }) {
  const [items, setItems] = useState<any[]>(
    initialItems.filter(i => i.slot_name === slotId).map(i => ({...i}))
  )
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSearch = async () => {
    if (!searchQuery) return
    setIsSearching(true)
    const res = await searchPublicContent(searchQuery)
    setSearchResults(res)
    setIsSearching(false)
  }

  const handleAddItem = (result: any) => {
    if (items.length >= max) {
      alert(`최대 ${max}개까지만 등록 가능합니다.`)
      return
    }
    if (items.some(i => i.content_id === result.id)) {
      alert("이미 등록된 콘텐츠입니다.")
      return
    }
    setItems([...items, {
      id: `new-${items.length}-${result.id}`,
      content_id: result.id,
      content_type: result.content_type,
      display_order: items.length,
      title: result.title
    }])
    setSearchOpen(false)
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
    startTransition(async () => {
      const payload = items.map(i => ({
        content_type: i.content_type,
        content_id: i.content_id,
        display_order: i.display_order
      }))
      const res = await updateFeaturedContent(slotId, payload)
      if (res.success) alert("성공적으로 저장되었습니다.")
      else alert(res.error)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-line-default flex flex-col min-h-[500px]">
      <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
        <span className="font-bold text-neutral-900 border-l-4 border-brand-500 pl-2">참조 슬롯 설정</span>
        <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
          <Dialog.Trigger asChild>
            <Button variant="primary" size="sm" disabled={isPending || items.length >= max}>
              <Plus className="w-4 h-4 mr-1" /> 퍼블릭 글 검색/추가
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl z-50 flex flex-col max-h-[80vh]">
              <Dialog.Title className="text-xl font-bold my-2">콘텐츠 검색</Dialog.Title>
              <div className="flex gap-2 my-2">
                <input type="text" placeholder="검색어 입력..." className="flex-1 px-3 py-2 border rounded-xl" autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
                <Button variant="secondary" onClick={handleSearch} disabled={isSearching}>{isSearching ? '...' : '검색'}</Button>
              </div>
              <div className="flex-1 overflow-y-auto mb-4 border p-2 rounded-xl bg-neutral-50 h-[300px]">
                {searchResults.map(res => (
                  <div key={res.id} className="bg-white p-3 rounded-lg border mb-2 flex items-center justify-between shadow-sm">
                    <div className="flex flex-col truncate pr-4">
                      <span className="text-[10px] text-brand-600 font-bold">{res.content_type}</span>
                      <span className="text-sm font-semibold truncate">{res.title}</span>
                    </div>
                    <Button variant="tertiary" size="sm" onClick={() => handleAddItem(res)}>선택</Button>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <Dialog.Close asChild><Button variant="secondary">닫기</Button></Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="p-4 bg-neutral-50/30 flex-1 flex flex-col gap-2">
        {items.length === 0 ? (
           <div className="border border-dashed p-10 mt-10 rounded-xl text-center flex flex-col items-center">
             <Star className="text-neutral-300 w-8 h-8 mb-2" />
             <p className="text-neutral-500 font-bold">콘텐츠가 없습니다. 우측 상단 버튼으로 추가하세요.</p>
           </div>
        ) : items.map((item, idx) => (
          <div key={item.id} className="bg-white border rounded-xl p-3 flex items-center gap-4 hover:border-brand-300">
            <div className="flex flex-col gap-1 items-center justify-center border-r pr-3">
              <button disabled={idx===0} onClick={()=>moveItem(idx,'up')} className="text-neutral-300 hover:text-brand-500 disabled:opacity-30">▲</button>
              <button disabled={idx===items.length-1} onClick={()=>moveItem(idx,'down')} className="text-neutral-300 hover:text-brand-500 disabled:opacity-30">▼</button>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-500">{idx + 1}</div>
            <div className="flex-1 flex flex-col overflow-hidden">
               <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{item.content_type}</span>
               <span className="font-bold text-sm truncate">{item.title}</span>
            </div>
            <Button variant="tertiary" size="sm" onClick={() => handleRemove(item.id)} className="text-danger-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-line-soft bg-white flex justify-end">
        <Button variant="primary" onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "저장하기"}
        </Button>
      </div>
    </div>
  )
}
