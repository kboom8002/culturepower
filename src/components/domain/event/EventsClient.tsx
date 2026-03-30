"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { Calendar, Video, Image as ImageIcon, MapPin, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Chip } from "@/components/ui/chip"
import { PublicEvent } from "@/lib/actions/public"

// 1. Taxonomy (Category) 필터: LNB에서 빠진 포맷 속성들
const EVENT_TABS = [
  { value: "all", label: "전체 기록" },
  { value: "schedule", label: "행사 일정" },
  { value: "forum", label: "토론회" },
  { value: "video", label: "명사 영상" },
  { value: "materials", label: "발제문/자료" },
  { value: "photo", label: "사진 아카이브" }
]

export function EventsClient({ initialEvents, initialCategory }: { initialEvents: PublicEvent[], initialCategory?: string }) {
  const router = useRouter()
  // LNB 메뉴에서 ?category=video 등으로 진입 시 초기 탭 활성화
  const [activeTab, setActiveTab] = useState(initialCategory && EVENT_TABS.some(t => t.value === initialCategory) ? initialCategory : "all")
  const [showAdvanced, setShowAdvanced] = useState(false)

  // MVP: 현재 PublicEvent 스키마에 명시적 taxonomy가 없으므로 느슨하게 필터 통과
  const filteredEvents = activeTab === "all" 
    ? initialEvents 
    : initialEvents.filter(e => {
        if (activeTab === "video") return (e.title || '').includes("영상") || (e.title || '').includes("VOD") || true;
        if (activeTab === "schedule") return e.status === "Upcoming" || true;
        return true; 
      })

  return (
    <main className="w-full">
      {/* 점진적 서랍형 필터(Progressive Disclosure) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <FilterBar 
          options={EVENT_TABS} 
          initialValue={activeTab} 
          onChange={(val) => setActiveTab(val)} 
        />
        
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors w-fit sm:w-auto px-1"
        >
          {showAdvanced ? "상세 필터 닫기 -" : "상세 해시태그 열기 +"}
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-surface-muted p-4 rounded-xl border border-line-default mb-8 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-neutral-600 mr-2 py-1">이벤트 태그:</span>
          {['정기포럼', '공개세미나', '인프라구축', '온라인스트리밍', '자료집다운'].map(tag => (
            <Chip key={tag} variant="default" className="cursor-pointer hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-colors">
              #{tag}
            </Chip>
          ))}
        </div>
      )}
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((evt) => {
            const isVideo = activeTab === "video" || (evt.title || '').includes("VOD");
            
            return (
              <div 
                key={evt.id} 
                className="bg-white rounded-2xl border border-line-default shadow-sm hover:border-brand-600 hover:shadow-md transition-all group cursor-pointer flex flex-col overflow-hidden"
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/events/${evt.id}`)}
              >
                {/* Thumbnail Section */}
                <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
                  {evt.thumbnail_url ? (
                    <img 
                      src={evt.thumbnail_url} 
                      alt={evt.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                    </div>
                  )}

                  {isVideo && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-14 h-14 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                    </div>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4 mt-auto">
                    <span className="inline-block px-2.5 py-1 bg-brand-50 text-brand-700 text-[11px] font-bold rounded-md uppercase tracking-wider">
                      {evt.status === 'Upcoming' ? '모집중' : evt.status === 'Ongoing' ? '진행중' : '기록물'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.start_date ? new Date(evt.start_date).toLocaleDateString("ko-KR") : "KST 미정"}
                    </div>
                  </div>
                  
                  <h3 className="text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 mb-5 leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[13px] text-neutral-500 pt-4 border-t border-line-soft mt-auto">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="truncate">{evt.venue || "장소 미정 (온라인/오프라인)"}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-500 bg-surface-soft rounded-2xl border border-line-default">
          해당 분류의 행사/영상 자료가 아직 없습니다.
        </div>
      )}
    </main>
  )
}
