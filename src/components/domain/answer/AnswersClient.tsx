"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { AnswerCard } from "@/components/domain/answer/AnswerCard"
import { Chip } from "@/components/ui/chip"
import { PublicAnswer } from "@/lib/actions/public"

// 1. Taxonomy (Category) 필터: Topic 하위에 존재하는 콘텐츠 속성 분류 체계
const CATEGORY_FILTERS = [
  { value: "all", label: "전체 SSoT" },
  { value: "summary", label: "정책 핵심 요약" },
  { value: "guide", label: "지원사업 가이드" },
  { value: "faq", label: "실무 FAQ" },
  { value: "term", label: "용어 해설" }
]

export function AnswersClient({ initialAnswers }: { initialAnswers: PublicAnswer[] }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // 2. 내부 Taxonomy 기준 필터링 
  // 현재 PublicAnswer 스키마에 명시적인 category 컬럼이 완비되지 않은 MVP 상태이므로
  // title과 summary 텍스트 기반으로 느슨한 매핑 필터를 지원합니다.
  const filteredAnswers = activeCategory === "all" 
    ? initialAnswers 
    : initialAnswers.filter(a => {
        if (activeCategory === "faq") return a.title.includes("?") || a.title.includes("질문") || a.title.includes("FAQ");
        if (activeCategory === "guide") return (a.title + a.summary).includes("대상") || (a.title + a.summary).includes("가이드") || (a.title + a.summary).includes("지원");
        if (activeCategory === "term") return a.title.includes("뜻") || a.title.includes("란") || (a.summary || '').includes("의미");
        if (activeCategory === "summary") return true; // 핵심 요약은 기본 속성으로 취급
        return true; 
      })

  return (
    <main className="w-full">
      {/* 점진적 서랍형 필터(Progressive Disclosure) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <FilterBar 
          options={CATEGORY_FILTERS} 
          initialValue="all" 
          onChange={(val) => setActiveCategory(val)} 
        />
        
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors w-fit sm:w-auto px-1"
        >
          {showAdvanced ? "상세 해시태그 닫기 -" : "상세 해시태그 열기 +"}
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-surface-muted p-4 rounded-xl border border-line-default mb-8 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-neutral-600 mr-2 py-1">인기 태그:</span>
          {/* 하드코딩된 예시 해시태그들 */}
          {['예술인복지', '문화예산', '지역소멸', 'K-콘텐츠', '저작권', '해외진출'].map(tag => (
            <Chip key={tag} variant="default" className="cursor-pointer hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-colors">
              #{tag}
            </Chip>
          ))}
        </div>
      )}
      
      {filteredAnswers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAnswers.map((ans) => {
            // Pill 레이블 동적 매핑
            const activeLabel = activeCategory === 'all' 
              ? '기본 해설' 
              : CATEGORY_FILTERS.find(f => f.value === activeCategory)?.label || '기본 해설';

            return (
              <AnswerCard
                key={ans.id}
                topic={ans.topics?.name || "분류 없음"}
                pillar={activeLabel}
                title={ans.title}
                query={ans.title} 
                snippet={ans.summary || ans.content_body || ""}
                updatedAt={ans.published_at || ans.updated_at}
                isReviewed={true}
                href={`/answers/${ans.slug}`}
              />
            )
          })}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center bg-surface-muted rounded-2xl border border-dashed border-line-strong text-neutral-500 mb-12">
          <p className="text-lg font-medium">조건에 맞는 정답카드가 아직 없습니다.</p>
          <p className="text-sm mt-2">다른 카테고리 필터를 선택해 보세요.</p>
        </div>
      )}
    </main>
  )
}
