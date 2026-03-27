"use client"

import { useState, useTransition } from "react"
import { FeaturedContent, updateFeaturedContent, searchPublicContent } from "@/lib/actions/publishing"
import { MonitorSmartphone, Star, CalendarDays, GripVertical, Trash2, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"

type Props = {
  initialItems: FeaturedContent[]
}

type UIItem = {
  id: string
  content_type: string
  content_id: string
  display_order: number
  title: string
}

const SLOTS = [
  { id: "Home Hero", label: "Homepage Hero", icon: MonitorSmartphone, max: 3 },
  { id: "Home Answers", label: "Top Answers", icon: Star, max: 4 },
  { id: "Home Events", label: "Upcoming Events", icon: CalendarDays, max: 4 }
]

export function FeaturedManager({ initialItems }: Props) {
  const [activeSlot, setActiveSlot] = useState("Home Hero")
  const [items, setItems] = useState<UIItem[]>(
    initialItems.filter(i => i.slot_name === activeSlot).map(i => ({...i, title: `Loading... (${i.content_id.slice(0, 8)})`}))
  )
  const [isPending, startTransition] = useTransition()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Switching tabs
  const handleSlotChange = (slot: string) => {
    setActiveSlot(slot)
    setItems(initialItems.filter(i => i.slot_name === slot).map(i => ({...i, title: `Loading... (${i.content_id.slice(0, 8)})`})))
  }

  // Handle Search
  const handleSearch = async () => {
    if (!searchQuery) return
    setIsSearching(true)
    const res = await searchPublicContent(searchQuery)
    setSearchResults(res)
    setIsSearching(false)
  }

  // Add Item
  const handleAddItem = (result: any) => {
    const slotDef = SLOTS.find(s => s.id === activeSlot)
    if (slotDef && items.length >= slotDef.max) {
      alert(`해당 슬롯은 최대 ${slotDef.max}개까지만 등록 가능합니다.`)
      return
    }
    if (items.some(i => i.content_id === result.id)) {
      alert("이미 등록된 콘텐츠입니다.")
      return
    }
    const newItem: UIItem = {
      id: `new-${Date.now()}`,
      content_id: result.id,
      content_type: result.content_type,
      display_order: items.length,
      title: result.title
    }
    setItems([...items, newItem])
    setSearchOpen(false)
  }

  // Remove Item
  const handleRemove = (id: string) => {
    const newItems = items.filter(i => i.id !== id).map((item, idx) => ({ ...item, display_order: idx }))
    setItems(newItems)
  }

  // Move up/down
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return

    const newItems = [...items]
    const swapIdx = direction === 'up' ? index - 1 : index + 1
    const temp = newItems[index]
    newItems[index] = newItems[swapIdx]
    newItems[swapIdx] = temp

    setItems(newItems.map((item, idx) => ({ ...item, display_order: idx })))
  }

  // Save changes
  const handleSave = () => {
    startTransition(async () => {
      const payload = items.map(i => ({
        content_type: i.content_type,
        content_id: i.content_id,
        display_order: i.display_order
      }))
      const res = await updateFeaturedContent(activeSlot, payload)
      if (res.success) alert("저장되었습니다.")
      else alert(res.error)
    })
  }

  const activeSlotDef = SLOTS.find(s => s.id === activeSlot)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left col: Groups */}
      <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-line-default shadow-sm p-4 flex flex-col gap-2">
          <h3 className="font-bold text-neutral-900 text-[15px] mb-2 px-2">Placement Areas</h3>
          {SLOTS.map(slot => {
            const Icon = slot.icon
            const isActive = activeSlot === slot.id
            return (
              <Button 
                key={slot.id}
                variant={isActive ? "secondary" : "tool"} 
                onClick={() => handleSlotChange(slot.id)}
                className={`justify-start px-4 ${isActive ? 'bg-brand-50 text-brand-700 font-bold border-brand-100' : 'text-neutral-600 hover:bg-neutral-50'}`}
              >
                <Icon className={`w-4 h-4 mr-2 ${isActive ? '' : 'text-neutral-400'}`} /> 
                {slot.label} (Max {slot.max})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Right col: Editor */}
      <div className="col-span-1 lg:col-span-2">
        <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
            <div className="font-bold text-neutral-700 text-[15px] flex items-center gap-2">
              {activeSlotDef && <activeSlotDef.icon className="w-4 h-4 text-brand-500" />}
              {activeSlot} 설정
            </div>
            
            <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
              <Dialog.Trigger asChild>
                <Button variant="primary" size="sm" disabled={isPending || items.length >= (activeSlotDef?.max || 0)}>
                  <Plus className="w-4 h-4 mr-1" /> 콘텐츠 추가
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl z-50 flex flex-col max-h-[80vh]">
                  <Dialog.Title className="text-xl font-bold text-neutral-900 mb-4">퍼블릭 콘텐츠 검색</Dialog.Title>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="제목으로 검색..." 
                      className="flex-1 px-4 py-2 border border-line-strong rounded-xl focus:outline-brand-500"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <Button variant="secondary" onClick={handleSearch} disabled={isSearching}>
                      {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "검색"}
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto min-h-[200px] border border-line-soft rounded-xl p-2 bg-neutral-50/50">
                    {searchResults.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-neutral-400 text-sm">검색 결과가 없습니다.</div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {searchResults.map(res => (
                          <div key={res.id} className="bg-white p-3 rounded-lg border border-line-default flex items-center justify-between shadow-sm">
                            <div className="flex flex-col flex-1 truncate pr-4">
                              <span className="text-[10px] font-bold text-brand-600 mb-0.5">{res.content_type}</span>
                              <span className="font-bold text-sm text-neutral-900 truncate">{res.title}</span>
                            </div>
                            <Button variant="tertiary" size="sm" onClick={() => handleAddItem(res)}>선택</Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Dialog.Close asChild><Button variant="tertiary">닫기</Button></Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

          </div>
          
          <div className="p-4 bg-neutral-50/30 flex flex-col gap-2 min-h-[400px]">
            {items.length === 0 ? (
              <div className="border-2 border-dashed border-line-strong rounded-xl p-12 flex flex-col items-center justify-center text-center h-full my-auto">
                <Star className="w-8 h-8 text-neutral-300 mb-3" />
                <h4 className="font-bold text-neutral-700 mb-1">고정된 콘텐츠가 없습니다.</h4>
                <p className="text-xs text-neutral-500 max-w-[200px]">우측 상단의 버튼을 눌러 콘텐츠를 추가해 보세요.</p>
              </div>
            ) : items.map((item, idx) => (
              <div key={item.id} className="bg-white border border-line-default rounded-xl p-3 flex items-center gap-4 hover:border-brand-300 transition-colors shadow-sm group">
                <div className="flex flex-col gap-1 items-center justify-center border-r border-line-soft pr-3 mr-1">
                  <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="text-neutral-300 hover:text-brand-500 disabled:opacity-30">▲</button>
                  <button onClick={() => moveItem(idx, 'down')} disabled={idx === items.length - 1} className="text-neutral-300 hover:text-brand-500 disabled:opacity-30">▼</button>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-500 shrink-0">
                  {idx + 1}
                </div>
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{item.content_type}</span>
                  </div>
                  <span className="font-bold text-neutral-900 text-sm truncate">
                    {item.title}
                  </span>
                </div>
                
                <Button variant="tertiary" size="sm" onClick={() => handleRemove(item.id)} className="text-danger-500 hover:text-danger-600 hover:bg-danger-50 border-danger-200">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-line-soft bg-white flex justify-end">
              <Button variant="primary" onClick={handleSave} disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "저장하기"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
