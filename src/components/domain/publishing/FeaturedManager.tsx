"use client"

import { useState } from "react"
import { FeaturedContent, PageBanner } from "@/lib/actions/publishing"
import { Home, Newspaper, Search, CalendarDays, Database, Star, AppWindow, FileText, Pickaxe } from "lucide-react"
import { ContentRefEditor } from "./ContentRefEditor"
import { CustomBannerEditor } from "./CustomBannerEditor"

type SlotDef = {
  id: string
  label: string
  page: string      // 그룹핑 아이디 ("home", "webzine", "answers" 등)
  max: number
  type: "ref" | "custom"
  icon: any
}

// ==========================================
// 전사 큐레이션 통합 스키마 (Configuration)
// ==========================================
const SLOTS: SlotDef[] = [
  // 메인 홈페이지
  { id: "Home Hero", label: "Hero (상단 베너)", page: "home", max: 3, type: "ref", icon: AppWindow },
  { id: "Home Activities", label: "주요 활동 (섹션 4)", page: "home", max: 5, type: "custom", icon: Star },
  { id: "Home Answers", label: "Top Answers", page: "home", max: 4, type: "ref", icon: Search },
  { id: "Home Events", label: "Upcoming Events", page: "home", max: 4, type: "ref", icon: CalendarDays },
  { id: "Data/Resources", label: "데이터/자료 추천", page: "home", max: 6, type: "ref", icon: Database },
  
  // 문강 RIO (웹진 메인)
  { id: "webzine_hero", label: "Hero Story (커버 스토리)", page: "webzine", max: 1, type: "ref", icon: AppWindow },
  { id: "Webzine Editors Pick", label: "Editor's Pick", page: "webzine", max: 3, type: "ref", icon: Newspaper },

  // 정답카드 허브
  { id: "answers_hub", label: "Top 큐레이션", page: "answers", max: 3, type: "ref", icon: Search },

  // 행사·영상 아카이브
  { id: "events_hub", label: "Featured Events", page: "events", max: 4, type: "ref", icon: CalendarDays },

  // 실무·데이터 허브
  { id: "resources_hub", label: "Recommended Tools / Docs", page: "resources", max: 4, type: "ref", icon: Database },
]

const GROUPS = [
  { id: "home", label: "🏠 홈페이지", desc: "문화강국네트워크 메인" },
  { id: "webzine", label: "📰 문강 RIO", desc: "정책 웹진 허브" },
  { id: "answers", label: "💡 정답카드", desc: "AEO 지식 허브" },
  { id: "events", label: "🗓️ 행사·영상", desc: "아카이브 허브" },
  { id: "resources", label: "📊 실무·데이터", desc: "통계 및 도구 허브" },
]

type Props = {
  initialItems: (FeaturedContent & { title?: string })[]
  initialBanners: PageBanner[]
}

export function FeaturedManager({ initialItems, initialBanners }: Props) {
  const [activeSlot, setActiveSlot] = useState(SLOTS[0])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* ------------------------------------- */}
      {/* 좌측 사이드바: 그룹별 슬롯(페이지) 네비게이션 */}
      {/* ------------------------------------- */}
      <div className="col-span-1 flex flex-col gap-6">
        {GROUPS.map(group => {
          const groupSlots = SLOTS.filter(s => s.page === group.id)
          if (groupSlots.length === 0) return null

          return (
            <div key={group.id} className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
              <div className="bg-neutral-50 border-b border-line-soft p-3">
                <span className="font-extrabold text-neutral-900 text-sm tracking-tight">{group.label}</span>
              </div>
              <div className="flex flex-col p-2 gap-1">
                {groupSlots.map(slot => {
                  const Icon = slot.icon
                  const isActive = activeSlot.id === slot.id
                  return (
                    <button 
                      key={slot.id}
                      onClick={() => setActiveSlot(slot)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors text-sm font-semibold ${
                        isActive 
                          ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                          : 'text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-line-default'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-neutral-400'}`} /> 
                      <div className="flex flex-col flex-1">
                        <span>{slot.label}</span>
                        <span className={`text-[10px] uppercase font-bold mt-0.5 ${isActive ? 'text-brand-500/70' : 'text-neutral-400'}`}>
                          {slot.type === 'custom' ? '직접 배너' : '콘텐츠 참조'} (Max {slot.max})
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* ------------------------------------- */}
      {/* 우측 캔버스: 타입에 따른 에디터 동적 분기 렌더링 */}
      {/* ------------------------------------- */}
      <div className="col-span-1 lg:col-span-3">
        {activeSlot.type === 'ref' ? (
          <ContentRefEditor 
            key={activeSlot.id} // 슬롯 바뀔때마다 초기화 방어
            slotId={activeSlot.id} 
            max={activeSlot.max} 
            initialItems={initialItems} 
          />
        ) : (
          <CustomBannerEditor 
            key={activeSlot.id} // 슬롯 바뀔때마다 초기화 방어
            slotId={activeSlot.id} 
            pageRoute={activeSlot.page}
            max={activeSlot.max} 
            initialBanners={initialBanners} 
          />
        )}
      </div>

    </div>
  )
}
