"use client"

import { PageHeader } from "@/components/layout/PageHeader"
import { Calendar as CalendarIcon, Filter, MapPin } from "lucide-react"

const MOCK_CALENDAR_EVENTS = [
  { id: 1, date: "2026-04-10", title: "지역문화진흥원 로컬 크리에이터 펀딩 지원 공모", status: "접수중", type: "공모사업" },
  { id: 2, date: "2026-04-15", title: "K-콘텐츠 글로벌 엑셀러레이팅 프로그램 모집", status: "접수중", type: "지원사업" },
  { id: 3, date: "2026-04-22", title: "2026 문화예술 기획가 네트워킹 데이", status: "예정", type: "행사/모임" },
  { id: 4, date: "2026-05-01", title: "제3차 문화강국 정책 포럼 참가 사전등록", status: "예정", type: "포럼/세미나" },
]

export default function WebzineCalendarPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "문강 RIO", href: "/webzine/stories" },
          { label: "지원사업 캘린더" }
        ]}
        title="지원사업 캘린더"
        description="전국 단위의 주요 문화예술 공모, 지원사업, 그리고 문화강국네트워크의 행사를 월별로 모아봅니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Placeholder for actual Calendar UI */}
        <div className="lg:w-2/3 bg-white p-6 rounded-3xl border border-line-default shadow-sm min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold text-neutral-900">2026년 4월</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-medium border border-line-strong rounded-lg hover:bg-neutral-50">&lt;</button>
              <button className="px-3 py-1.5 text-sm font-medium border border-line-strong rounded-lg hover:bg-neutral-50">오늘</button>
              <button className="px-3 py-1.5 text-sm font-medium border border-line-strong rounded-lg hover:bg-neutral-50">&gt;</button>
            </div>
          </div>
          
          <div className="flex-1 border border-line-soft rounded-xl bg-surface-soft flex items-center justify-center p-8 text-center">
            <div className="flex flex-col items-center gap-4 text-neutral-400">
              <CalendarIcon className="w-12 h-12" />
              <p>캘린더 UI 렌더링 영역 (향후 FullCalendar 연동 예정)</p>
            </div>
          </div>
        </div>

        {/* List View */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-neutral-900">다가오는 일정</h3>
            <button className="text-neutral-500 hover:text-brand-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {MOCK_CALENDAR_EVENTS.map(evt => (
              <div key={evt.id} className="bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors group cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                    evt.status === "접수중" ? "bg-red-50 text-red-600" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    {evt.status}
                  </span>
                  <span className="text-xs font-medium text-brand-600">{evt.type}</span>
                </div>
                <h4 className="text-[15px] font-bold text-neutral-900 leading-snug group-hover:text-brand-700 transition-colors border-b border-white pb-3 mb-3">
                  {evt.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium font-mono">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {evt.date} ~
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
