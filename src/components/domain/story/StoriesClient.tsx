"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { Chip } from "@/components/ui/chip"
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Story } from "@/lib/actions/story"

const STORY_FILTERS = [
  { value: "all", label: "전체 기사" },
  { value: "highlight", label: "정책 하이라이트" },
  { value: "interview", label: "현장 인터뷰" },
  { value: "column", label: "전문가 칼럼" },
  { value: "insight", label: "인사이트" },
  { value: "news", label: "보도자료" }
]

export function StoriesClient({ initialStories }: { initialStories: Story[] }) {
  const [activeFilter, setActiveFilter] = useState("all")
  
  const filteredStories = activeFilter === "all" 
    ? initialStories 
    // Fallback to section if category isn't joined
    : initialStories.filter(s => s.section?.toLowerCase() === activeFilter.toLowerCase())

  // Note: if filtered is empty, featured is undefined
  const featured = filteredStories[0]
  const restList = filteredStories.slice(1)

  return (
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
            href={`/webzine/stories/${featured.id}`}
            className="group flex flex-col md:flex-row items-center bg-white rounded-3xl border border-line-default overflow-hidden hover:border-brand-600 hover:shadow-lg transition-all"
          >
            <div className={`w-full md:w-1/2 aspect-video md:aspect-auto md:h-[400px] bg-neutral-200 ${featured.og_image_url ? 'bg-cover bg-center' : ''}`} style={featured.og_image_url ? { backgroundImage: `url(${featured.og_image_url})` } : {}}>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-start justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Chip variant="default" className="h-7 text-xs px-3">{featured.section || '기획 기사'}</Chip>
              </div>
              <h2 className="text-h2 md:text-[32px] text-neutral-900 group-hover:text-brand-700 transition-colors mb-4 text-balance">
                {featured.title}
              </h2>
              <p className="text-body-lg text-neutral-600 mb-8 line-clamp-3">
                {featured.meta_description || featured.deck || "전문 에디터와 현장의 크리에이터들이 길어 올린 긴 호흡의 기사입니다."}
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
              href={`/webzine/stories/${story.id}`}
              className="group flex flex-col items-start bg-surface-soft p-6 sm:p-8 rounded-2xl border border-line-default hover:border-brand-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Chip variant="default" className="h-6 text-[11px] px-2">{story.section || '기사'}</Chip>
              </div>
              <h3 className="text-[20px] sm:text-[22px] leading-[1.38] font-bold text-neutral-900 mb-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                {story.title}
              </h3>
              <p className="text-body-sm text-neutral-600 mb-6 line-clamp-3 overflow-hidden text-ellipsis">
                {story.meta_description || story.deck || '이 기사를 클릭하여 전체 내용을 확인해보세요.'}
              </p>
              <div className="mt-auto flex items-center gap-2 text-caption text-neutral-500 w-full pt-4 border-t border-line-default">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(story.published_at || story.created_at).toLocaleDateString("ko-KR")}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-neutral-500">
          {featured ? '' : '해당 카테고리의 기사가 없습니다.'}
        </div>
      )}

      {/* Pagination UI Placeholder */}
    </main>
  )
}
