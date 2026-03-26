"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/layout/FilterBar"
import { Chip } from "@/components/ui/chip"
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const STORY_FILTERS = [
  { value: "all", label: "전체 기사" },
  { value: "highlight", label: "정책 하이라이트" },
  { value: "interview", label: "현장 인터뷰" },
  { value: "column", label: "전문가 칼럼" }
]

const MOCK_STORIES = Array.from({ length: 12 }).map((_, i) => ({
  id: `story-${i}`,
  section: ["정책 하이라이트", "현장 인터뷰", "전문가 칼럼"][i % 3],
  categorySlug: ["highlight", "interview", "column"][i % 3],
  type: ["기획 기사", "대담", "오피니언"][i % 3],
  title: [
    "K-건축, 전 세계가 한옥의 철학을 주목하는 이유 3가지",
    "“예산보다 중요한 건 자생력입니다” - 로컬 크리에이터 3인 대담",
    "디지털 혁신이 어떻게 소외계층을 돕는가"
  ][i % 3],
  deck: "기후 변화와 거주 환경의 위기 속, 우리 고유의 방식이 어떻게 글로벌 스탠다드로 발전할 수 있는지 집중 조명합니다.",
  author: "김편집",
  date: "2026-03-22",
  href: `/webzine/stories/mock-story-${i}`
}))

export default function StoriesIndexPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  
  const filteredStories = activeFilter === "all" 
    ? MOCK_STORIES 
    : MOCK_STORIES.filter(s => s.categorySlug === activeFilter)

  const featured = filteredStories[0]
  const restList = filteredStories.slice(1)

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "문강 RIO" }]}
        title="문강 RIO (웹진)"
        description="전문 에디터와 현장의 크리에이터들이 길어 올린 긴 호흡의 기사와 심층 해설을 만납니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-6xl py-12">
        <FilterBar 
          options={STORY_FILTERS} 
          initialValue="all" 
          onChange={(val) => setActiveFilter(val)} 
        />
        
        {/* Featured Story */}
        {featured && (
          <div className="mb-12">
            <Link 
              href={featured.href}
              className="group flex flex-col md:flex-row items-center bg-white rounded-3xl border border-line-default overflow-hidden hover:border-brand-600 hover:shadow-lg transition-all"
            >
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-[400px] bg-neutral-200" />
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-start justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Chip variant="default" className="h-7 text-xs px-3">{featured.section}</Chip>
                </div>
                <h2 className="text-h2 md:text-[32px] text-neutral-900 group-hover:text-brand-700 transition-colors mb-4 text-balance">
                  {featured.title}
                </h2>
                <p className="text-body-lg text-neutral-600 mb-8">
                  {featured.deck}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-brand-700 mt-auto">
                  스토리 읽기 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Story Grid */}
        {restList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {restList.map((story) => (
               <Link 
                key={story.id} 
                href={story.href}
                className="group flex flex-col items-start bg-surface-soft p-6 sm:p-8 rounded-2xl border border-line-default hover:border-brand-600 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Chip variant="default" className="h-6 text-[11px] px-2">{story.section}</Chip>
                </div>
                <h3 className="text-[20px] sm:text-[22px] leading-[1.38] font-bold text-neutral-900 mb-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-body-sm text-neutral-600 mb-6 line-clamp-3">
                  {story.deck}
                </p>
                <div className="mt-auto flex items-center gap-2 text-caption text-neutral-500 w-full pt-4 border-t border-line-default">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(story.date).toLocaleDateString("ko-KR")}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-500">
            해당 카테고리의 기사가 없습니다.
          </div>
        )}

        {/* Pagination UI */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-700 text-white font-medium">
            1
          </Link>
          <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium transition-colors">
            2
          </Link>
          <span className="w-10 h-10 flex items-center justify-center text-neutral-400">...</span>
          <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium transition-colors">
            5
          </Link>
          <Link href="#" className="p-2 rounded-lg border border-line-default text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  )
}
