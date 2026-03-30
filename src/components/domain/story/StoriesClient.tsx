"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { Chip } from "@/components/ui/chip"
import { Clock } from "lucide-react"
import Link from "next/link"
import { PublicStory } from "@/lib/actions/public"

// 하위 호환성을 위한 기본 내부 필터 (점진적 공개를 위해 5개로 제한)
const STORY_FILTERS = [
  { value: "all", label: "전체 기사" },
  { value: "insight", label: "인사이트 분석" },
  { value: "interview", label: "현장 인터뷰" },
  { value: "column", label: "전문가 칼럼" },
  { value: "report", label: "심층 리포트" }
]

export function StoriesClient({ initialStories }: { initialStories: PublicStory[] | any[] }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // 1차 필터링 로직 (내부 필터바)
  const filteredStories = activeFilter === "all" 
    ? initialStories 
    : initialStories.filter(s => 
        s.section?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        s.story_type?.toLowerCase().includes(activeFilter.toLowerCase())
      )

  // 상단부의 DynamicSectionHero가 대표(Hero) 컨텐츠 표출을 전담하므로,
  // 목록부(StoriesClient)는 내부에 있던 거대한 중복 Hero 뷰를 제거하고
  // 본연의 모듈형 그리드(Bento Grid 하위 나열 형태) 역할로 집중합니다.
  
  return (
    <main className="w-full">
      {/* 점진적 서랍형 필터(Progressive Disclosure) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <FilterBar 
          options={STORY_FILTERS} 
          initialValue="all" 
          onChange={(val) => setActiveFilter(val)} 
        />
        
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors w-fit sm:w-auto px-1"
        >
          {showAdvanced ? "상세 키워드 닫기 -" : "상세 키워드 열기 +"}
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-surface-muted p-4 rounded-xl border border-line-default mb-8 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-neutral-600 mr-2 py-1">인기 태그:</span>
          {/* 하드코딩된 예시 해시태그들 */}
          {['예술인복지', '건축기본법', '지방시대', '디지털전환', 'ODA', '청년예술'].map(tag => (
            <Chip key={tag} variant="default" className="cursor-pointer hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-colors">
              #{tag}
            </Chip>
          ))}
        </div>
      )}
      
      {/* Story Grid (순수 전체 목록 나열) */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredStories.map((story) => (
              <Link 
              key={story.id} 
              href={`/webzine/stories/${story.slug}`}
              className="group flex flex-col items-start bg-white rounded-2xl border border-line-default shadow-sm hover:border-brand-500 hover:shadow-lg transition-all overflow-hidden"
            >
              {story.featured_image?.url && (
                <div className="w-full h-48 overflow-hidden bg-neutral-100 flex-shrink-0 border-b border-line-default">
                  <img src={story.featured_image.url} alt={story.featured_image.alt || story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6 sm:p-8 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Chip variant="default" className="h-6 text-[11px] px-2 bg-brand-50 text-brand-700">{story.section || '기사'}</Chip>
                </div>
                <h3 className="text-[20px] sm:text-[22px] leading-[1.38] font-bold text-neutral-900 mb-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-body-sm text-neutral-500 mb-6 line-clamp-3 overflow-hidden text-ellipsis leading-relaxed">
                  {story.meta_description || story.deck || '이 기사를 클릭하여 전체 내용을 확인해 보세요.'}
                </p>
                <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-line-default">
                  <div className="flex items-center gap-1.5 text-caption text-neutral-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(story.published_at || story.created_at).toLocaleDateString("ko-KR")}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-600 group-hover:underline decoration-2 underline-offset-4 opacity-0 group-hover:opacity-100 transition-all">
                    자세히 읽기 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center bg-surface-muted rounded-2xl border border-dashed border-line-strong text-neutral-500 mb-12">
          <p className="text-lg font-medium">조건에 맞는 기사가 없습니다.</p>
          <p className="text-sm mt-2">다른 필터를 선택해 보세요.</p>
        </div>
      )}
    </main>
  )
}
