"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/layout/FilterBar"
import { Calendar, Video, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const EVENT_TABS = [
  { value: "schedule", label: "행사 일정" },
  { value: "past", label: "지난 행사" },
  { value: "forum", label: "토론회 아카이브" },
  { value: "video", label: "명사 영상" },
  { value: "materials", label: "발제문/자료집" },
  { value: "photo", label: "사진 아카이브" },
]

const MOCK_EVENTS = Array.from({ length: 18 }).map((_, i) => {
  const tabs = ["schedule", "past", "forum", "video", "materials", "video"] // Added more video weight
  const tIdx = i % tabs.length
  
  const isVideo = tabs[tIdx] === "video"

  return {
    id: `evt-${i + 1}`,
    tab: tabs[tIdx],
    title: [
      "2026 K-컬처 글로벌 세미나 모집",
      "제4회 지역문화 생태계 포럼 성료",
      "예산 구조 Reform 현장 대토론회",
      "[VOD] 존스홉킨스 석학 초청 강연: K-아키텍처",
      "문화강국 비전 선포식 종합 발제문 PDF",
      "[VOD] 김문강 편집장과의 대화: SSoT 시스템의 미래"
    ][tIdx],
    date: "2026-03-" + (25 - (i % 15)).toString().padStart(2, '0'),
    location: isVideo ? "온라인 스트리밍" : "서울 한국프레스센터 20층",
    type: ["현장 참여", "종료", "기록물", "영상", "문서", "영상"][tIdx],
    thumbnail: isVideo ? `https://picsum.photos/seed/${i + 100}/600/400` : null, // Random placeholder image
    duration: isVideo ? ["45:20", "1:12:05"][i % 2] : null
  }
})

function EventsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "schedule"
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) setActiveTab(tab)
    else setActiveTab("schedule")
  }, [searchParams])

  const filteredEvents = MOCK_EVENTS.filter(e => e.tab === activeTab)

  return (
    <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-12">
      <FilterBar 
        options={EVENT_TABS} 
        initialValue={activeTab} 
        onChange={(val) => {
          setActiveTab(val)
          window.history.replaceState(null, '', `/events?tab=${val}`)
        }} 
      />
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-6">
          {filteredEvents.map((evt) => {
            const isVideo = evt.tab === "video"
            
            return (
              <div 
                key={evt.id} 
                className="bg-white rounded-2xl border border-line-default shadow-sm hover:border-brand-600 hover:shadow-md transition-all group cursor-pointer flex flex-col overflow-hidden"
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/events/${evt.id}`)}
              >
                {/* Thumbnail Section for Videos/Photos */}
                {evt.thumbnail && (
                  <div className="relative w-full aspect-video bg-neutral-200 overflow-hidden">
                    <img 
                      src={evt.thumbnail} 
                      alt={evt.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    {isVideo && (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform" />
                        </div>
                        {evt.duration && (
                          <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-xs font-medium text-white font-mono">
                            {evt.duration}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                
                {/* Text Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4 mt-auto">
                    <span className="inline-block px-2.5 py-1 bg-brand-50 text-brand-700 text-[11px] font-bold rounded-md">
                      {evt.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.date}
                    </div>
                  </div>
                  
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 mb-5 leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[13px] text-neutral-500 pt-4 border-t border-line-soft mt-auto">
                    {evt.tab === "video" && <Video className="w-4 h-4 text-neutral-400" />}
                    {evt.tab === "photo" && <ImageIcon className="w-4 h-4 text-neutral-400" />}
                    {['schedule', 'past', 'forum'].includes(evt.tab) && <MapPin className="w-4 h-4 text-neutral-400" />}
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-500 bg-surface-soft rounded-2xl border border-line-default mt-6">
          해당 카테고리의 행사/영상 자료가 아직 없습니다.
        </div>
      )}

      {/* Pagination UI */}
      {filteredEvents.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-700 text-white font-medium">1</Link>
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}

    </main>
  )
}

export default function EventsIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[{ label: "행사·영상" }]}
        title="기록과 행사"
        description="네트워크가 주최하는 주요 정책 포럼과 명사 강연, 발제문 아카이브를 한 곳에 모았습니다."
      />
      <Suspense fallback={<div className="container mx-auto py-24 text-center">Loading events...</div>}>
        <EventsContent />
      </Suspense>
    </div>
  )
}
