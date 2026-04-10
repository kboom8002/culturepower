"use client"

import { useState } from "react"
import { FilterBar } from "@/components/layout/FilterBar"
import { Building2, Quote, UserCircle2 } from "lucide-react"
import type { PublicExpert } from "@/lib/actions/public"

interface ExpertsClientProps {
  experts: PublicExpert[]
  initialRole?: string
}

export function ExpertsClient({ experts, initialRole }: ExpertsClientProps) {
  // 역할(Role) 중복 제거하여 상단 탭 동적 생성
  const distinctRoles = Array.from(new Set(experts.map(e => e.role).filter(Boolean)))
  
  // URL 파라미터(initialRole) 매핑
  const TABS = [
    { value: "all", label: "전체 풀(Pool)" },
    { value: "author", label: "참여 필진" },
    { value: "guest", label: "인터뷰·대담 참여자" },
    { value: "editor", label: "문강 편집데스크" },
    { value: "reviewer", label: "전문 검수위원" },
    // DB에 있는 기타 헤드라인들 중 위 4개에 속하지 않는 것들
    ...distinctRoles
      .filter(r => !['author', 'guest', 'editor', 'reviewer'].includes(r as string) && !(r as string)?.includes('편집') && !(r as string)?.includes('검수'))
      .map(r => ({ value: r as string, label: r as string }))
  ]

  const [activeTab, setActiveTab] = useState(initialRole || "all")

  const filteredExperts = activeTab === "all" 
    ? experts 
    : experts.filter(e => {
        const headline = e.role || '';
        if (activeTab === 'editor') return headline.includes('편집') || headline.includes('editor');
        if (activeTab === 'reviewer') return headline.includes('검수') || headline.includes('평가') || headline.includes('reviewer');
        if (activeTab === 'guest') return headline.includes('인터뷰') || headline.includes('대담') || headline.includes('참여');
        if (activeTab === 'author') return headline.includes('필진') || headline.includes('연구원') || headline.includes('작가');
        return e.role === activeTab;
      })

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <FilterBar 
          options={TABS} 
          initialValue={activeTab} 
          onChange={(val) => setActiveTab(val)} 
        />
        <div className="text-sm font-medium text-neutral-500 px-2 py-1 bg-surface-muted rounded-md border border-line-default shrink-0">
          검색된 전문가: <b className="text-brand-600">{filteredExperts.length}</b>명
        </div>
      </div>

      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperts.map((expert) => (
            <div 
              key={expert.id} 
              className="bg-white rounded-3xl border border-line-default p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 transition-all flex flex-col group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-50 border-4 border-surface-page shadow-sm shrink-0">
                  {expert.profile_image_url ? (
                    <img src={expert.profile_image_url} alt={expert.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle2 className="w-full h-full text-brand-300 p-1" />
                  )}
                </div>
                <div className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full">
                  {expert.role || '협력가'}
                </div>
              </div>

              <h3 className="text-[20px] font-bold text-neutral-900 mb-1 group-hover:text-brand-700 transition-colors">
                {expert.name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-sm text-neutral-500 font-medium mb-4">
                <Building2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="truncate">{expert.organization || '문화강국네트워크 파트너'}</span>
              </div>

              <div className="mt-auto flex flex-col bg-neutral-50/50 p-4 rounded-2xl border border-line-soft">
                <Quote className="w-5 h-5 text-brand-300 mb-1.5 rotate-180 fill-brand-300/20" />
                <p className="text-[13px] text-neutral-600 leading-relaxed font-medium line-clamp-3">
                  {expert.bio || "플랫폼 검증 및 자문에 참여하고 있는 전문가입니다."}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-24 flex flex-col items-center justify-center bg-surface-muted rounded-3xl border border-line-default text-neutral-500">
          <UserCircle2 className="w-16 h-16 mb-4 text-line-strong" />
          <p className="text-lg font-medium">해당 분류의 전문가 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
