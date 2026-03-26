"use client";

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const GNB_DATA = [
  {
    label: "문강 RIO",
    href: "/webzine/stories",
    items: [
      { label: "문강 RIO 소개", href: "/webzine/about" },
      { label: "창간사", href: "/webzine/stories?category=editorial" },
      { label: "발간 목적", href: "/webzine/about#purpose" },
      { label: "스페셜 인터뷰", href: "/webzine/stories?category=interview" },
      { label: "Policy Insight", href: "/webzine/stories?category=insight" },
      { label: "Culture Power Report", href: "/webzine/stories?category=report" },
      { label: "지역이 문화가 되다", href: "/webzine/stories?category=local" },
      { label: "Culture People", href: "/webzine/stories?category=people" },
      { label: "Global & Trend", href: "/webzine/stories?category=global" },
      { label: "지원사업 캘린더", href: "/webzine/calendar" },
      { label: "전체 Story", href: "/webzine/stories" },
    ]
  },
  {
    label: "정답카드",
    href: "/answers",
    items: [
      { label: "전체 정답카드", href: "/answers" },
      { label: "문화강국", href: "/answers?topic=culture" },
      { label: "K-문명", href: "/answers?topic=k-civ" },
      { label: "지역문화", href: "/answers?topic=local" },
      { label: "문화정책", href: "/answers?topic=policy" },
      { label: "행사/기록", href: "/answers?topic=event" },
      { label: "참여/회원", href: "/answers?topic=join" },
      { label: "최신 업데이트", href: "/answers?sort=latest" },
    ]
  },
  {
    label: "3 Pillars",
    href: "/pillars/topics",
    items: [
      { label: "Reform", href: "/pillars/reform" },
      { label: "Implementation", href: "/pillars/implementation" },
      { label: "Outcomes", href: "/pillars/outcomes" },
      { label: "Pillar 전체 보기", href: "/pillars/topics" },
    ]
  },
  {
    label: "행사·영상",
    href: "/events",
    items: [
      { label: "행사 일정", href: "/events?tab=schedule" },
      { label: "지난 행사", href: "/events?tab=past" },
      { label: "토론회 아카이브", href: "/events?tab=forum" },
      { label: "명사 영상", href: "/events?tab=video" },
      { label: "발제문/자료집", href: "/events?tab=materials" },
      { label: "사진 아카이브", href: "/events?tab=photo" },
    ]
  },
  {
    label: "데이터·자료",
    href: "/data",
    items: [
      { label: "문화예술정보", href: "/data?category=info" },
      { label: "주요 문화행사 / 일정", href: "/data?category=schedule" },
      { label: "주요 문화공모사업", href: "/data?category=contest" },
      { label: "문화정책 뉴스", href: "/data?category=news" },
      { label: "기관/단체 정보", href: "/data?category=org" },
      { label: "데이터 노트", href: "/data?category=note" },
      { label: "One-Pager / Brief", href: "/data?category=brief" },
    ]
  },
  {
    label: "네트워크",
    href: "/network",
    items: [
      { label: "네트워크 소개", href: "/network/about" },
      { label: "이사장 인사말", href: "/network/greeting" },
      { label: "비전 & 미션", href: "/network/vision" },
      { label: "조직구성", href: "/network/organization" },
      { label: "협력기관", href: "/network/partners" },
      { label: "주요 연혁", href: "/network/history" },
      { label: "주요 활동 내역", href: "/network/activities" },
    ]
  },
  {
    label: "참여·회원",
    href: "/join",
    items: [
      { label: "회원 소개", href: "/join/about" },
      { label: "회원 혜택", href: "/join/benefits" },
      { label: "가입 안내", href: "/join/guide" },
      { label: "가입 신청", href: "/join/apply" },
      { label: "뉴스레터 구독", href: "/join/newsletter" },
      { label: "행사 신청", href: "/events?tab=schedule" },
      { label: "협력/제휴 문의", href: "/join/partnership" },
    ]
  }
]

export function GlobalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileGnb, setExpandedMobileGnb] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line-default bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="font-bold text-[18px] md:text-[20px] text-brand-900 flex items-center gap-2 relative z-50 shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          문화강국네트워크
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {GNB_DATA.map((gnb) => (
            <div key={gnb.label} className="group h-full flex items-center relative">
              <Link 
                href={gnb.href} 
                className="text-body-sm font-bold text-neutral-800 hover:text-brand-700 transition-colors flex items-center gap-1 h-full"
              >
                {gnb.label}
              </Link>
              
              {/* Desktop Dropdown */}
              <div className="absolute top-[72px] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-white border border-line-default shadow-xl rounded-xl py-3 min-w-[200px] z-50">
                {gnb.items.map((lnb) => (
                  <Link
                    key={lnb.label}
                    href={lnb.href}
                    className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-brand-700 hover:bg-brand-050 transition-colors whitespace-nowrap"
                  >
                    {lnb.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        {/* Actions Desktop & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-50 shrink-0">
          <Button variant="tertiary" size="sm" className="hidden sm:inline-flex rounded-full px-3" asChild>
            <Link href="/search">
              <Search className="w-4 h-4 mr-2" />
              검색
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/join">가입하기</Link>
          </Button>
          <button 
            className="lg:hidden p-2 -mr-2 text-neutral-700 hover:text-brand-700 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-white flex flex-col pt-4 px-6 lg:hidden overflow-y-auto pb-24 h-[calc(100vh-72px)]">
          <nav className="flex flex-col gap-2">
            {GNB_DATA.map((gnb) => {
              const isExpanded = expandedMobileGnb === gnb.label
              return (
                <div key={gnb.label} className="flex flex-col border-b border-line-soft last:border-0">
                  <div className="flex items-center justify-between py-4">
                    <Link 
                      href={gnb.href} 
                      className="text-[20px] font-bold text-neutral-900 flex-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {gnb.label}
                    </Link>
                    <button 
                      className="p-2 -mr-2 text-neutral-500"
                      onClick={(e) => {
                        e.preventDefault()
                        setExpandedMobileGnb(isExpanded ? null : gnb.label)
                      }}
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="flex flex-col gap-1 pb-4 pl-4 border-l-2 border-brand-100 ml-2">
                      {gnb.items.map((lnb) => (
                        <Link
                          key={lnb.label}
                          href={lnb.href}
                          className="py-2.5 text-[15px] font-medium text-neutral-600 hover:text-brand-700"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {lnb.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          
          <div className="mt-8 flex flex-col gap-4">
            <Button variant="secondary" size="lg" className="w-full justify-center" asChild>
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
                <Search className="w-5 h-5 mr-3" />
                궁금한 주제 검색하기
              </Link>
            </Button>
            <Button variant="primary" size="lg" asChild className="w-full justify-center">
              <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>정회원 가입 및 구독</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

