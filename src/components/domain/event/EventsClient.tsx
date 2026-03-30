"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { Calendar, Video, Image as ImageIcon, MapPin, PlayCircle, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Chip } from "@/components/ui/chip"
import { PublicEvent } from "@/lib/actions/public"

// 1차 메뉴 (LNB)
const LNB_TABS = [
  { value: "all", label: "전체 행사 아카이브" },
  { value: "past", label: "지난 행사" },
  { value: "regional", label: "지역문화대전환 순회토론회" },
  { value: "special", label: "특별 행사·전시" },
]

// 2차 필터
const EVENT_FILTERS = [
  { value: "all", label: "전체" },
  { value: "schedule", label: "일정" },
  { value: "forum", label: "토론회" },
  { value: "video", label: "영상" },
  { value: "materials", label: "발표자료" },
  { value: "photo", label: "사진 아카이브" }
]

export function EventsClient({ initialEvents, initialCategory }: { initialEvents: PublicEvent[], initialCategory?: string }) {
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilter, setActiveFilter] = useState(
    initialCategory && EVENT_FILTERS.some(t => t.value === initialCategory) ? initialCategory : "all"
  )
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Filtering Logic
  let filteredEvents = initialEvents

  // 1) Apply 1st LNB
  if (activeTab === "past") {
    filteredEvents = filteredEvents.filter(e => e.status === "Closed" || e.status === "Archived")
  } else if (activeTab === "regional") {
    filteredEvents = filteredEvents.filter(e => 
      (e.title || '').includes("지역문화대전환") || (e.series_name || '').includes("지역문화대전환")
    )
  } else if (activeTab === "special") {
    filteredEvents = filteredEvents.filter(e => 
      (e.title || '').includes("전시") || (e.title || '').includes("특별") || (e.title || '').includes("후원")
    )
  }

  // 2) Apply 2nd Filter
  if (activeFilter === "schedule") {
    filteredEvents = filteredEvents.filter(e => e.status === "Upcoming" || e.status === "Ongoing")
  } else if (activeFilter === "video") {
    filteredEvents = filteredEvents.filter(e => 
      (e.videos && e.videos.length > 0) || (e.title || '').includes("영상") || (e.title || '').includes("VOD")
    )
  } else if (activeFilter === "materials") {
    filteredEvents = filteredEvents.filter(e => 
      (e.documents && e.documents.length > 0) || e.has_result_assets
    )
  } else if (activeFilter === "photo") {
    filteredEvents = filteredEvents.filter(e => 
      (e.galleries && e.galleries.length > 0) || (e.title || '').includes("사진")
    )
  } else if (activeFilter === "forum") {
    filteredEvents = filteredEvents.filter(e => 
      (e.title || '').includes("토론회") || (e.title || '').includes("포럼") || (e.title || '').includes("세미나")
    )
  }

  return (
    <main className="w-full relative">
      
      {/* 1차 LNB Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-6 border-b border-line-soft mb-8 px-1">
        {LNB_TABS.map(tab => (
          <button 
            key={tab.value}
            onClick={() => { setActiveTab(tab.value); setActiveFilter("all"); }}
            className={`pb-3 text-[15px] font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.value 
                ? 'border-brand-600 text-brand-700' 
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2차 Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <FilterBar 
          options={EVENT_FILTERS} 
          initialValue={activeFilter} 
          onChange={setActiveFilter} 
        />
        
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors w-fit sm:w-auto px-1"
        >
          {showAdvanced ? "주제 태그 닫기 -" : "주제 태그 열기 +"}
        </button>
      </div>

      {/* Advanced Topic Cloud */}
      {showAdvanced && (
        <div className="bg-surface-muted p-5 rounded-xl border border-line-default mb-8 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-neutral-600 mr-2 py-1">이벤트 주요 주제:</span>
          {['정기포럼', '지역문화', '광복80주년', '기초예술', '네트워크'].map(tag => (
            <Chip key={tag} variant="default" className="cursor-pointer hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-colors">
              #{tag}
            </Chip>
          ))}
        </div>
      )}
      
      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((evt) => {
            const isVideo = activeFilter === "video" || (evt.videos && evt.videos.length > 0) || (evt.title || '').includes("VOD");
            
            // Status Badge Colors
            let badgeStyle = "bg-neutral-100 text-neutral-600"
            let badgeText = "종료"
            if (evt.status === 'Upcoming') { badgeStyle = "bg-blue-50 text-blue-600"; badgeText = "예정" }
            else if (evt.status === 'Ongoing') { badgeStyle = "bg-brand-50 text-brand-700"; badgeText = "진행중" }
            else if (evt.status === 'Archived') { badgeStyle = "bg-teal-50 text-teal-700"; badgeText = "자료 공개" }

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
                    <div className={`w-full h-full flex flex-col items-center justify-center transition-colors ${
                      evt.series_name?.includes("지역문화") ? "bg-teal-900/10 text-teal-700" :
                      evt.series_name?.includes("국회") ? "bg-indigo-900/10 text-indigo-700" :
                      "bg-neutral-100 text-neutral-400"
                    }`}>
                      <ImageIcon className="w-12 h-12 mb-2 opacity-30" />
                      <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">
                        {evt.series_name || "Official Event"}
                      </span>
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
                  
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3 mt-auto">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-md tracking-wider ${badgeStyle}`}>
                      {badgeText}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.start_date ? new Date(evt.start_date).toLocaleDateString("ko-KR") : "KST 미정"}
                    </div>
                  </div>
                  
                  {evt.series_name && (
                     <div className="text-[12px] font-bold text-brand-600 mb-1 leading-snug">
                       {evt.series_name} {evt.round_no ? `${evt.round_no}차` : ''}
                     </div>
                  )}
                  
                  <h3 className="text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 mb-2 leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  
                  {evt.summary && (
                    <p className="text-[13px] text-neutral-500 line-clamp-1 mb-4">
                      {evt.summary}
                    </p>
                  )}
                  
                  {/* Meta / Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-line-soft mt-auto">
                    <div className="flex items-center gap-1.5 text-[12px] text-neutral-500 w-[60%]">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{evt.venue || "장소 미정"}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-neutral-400 shrink-0">
                      {(evt.has_result_assets || (evt.documents && evt.documents.length > 0)) && (
                        <FileText className="w-4 h-4 text-emerald-600" title="결과물/리포트 보유" />
                      )}
                      {isVideo && (
                        <Video className="w-4 h-4 text-purple-600" title="관련 영상 제공" />
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-500 bg-surface-soft rounded-2xl border border-line-default shadow-sm">
          해당 분류의 행사/영상 자료가 아직 없습니다.
        </div>
      )}
    </main>
  )
}
