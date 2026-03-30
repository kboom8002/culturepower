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
  
  // URL에서 role=editor 로 넘어올 경우, MVP 특성상 '전문위원'을 대표로 매핑
  const mappedInitialRole = initialRole === 'editor' ? '전문위원' : initialRole
  
  const TABS = [
    { value: "all", label: "전체 풀(Pool)" },
    ...distinctRoles.map(r => ({ value: r as string, label: r as string }))
  ]

  const [activeTab, setActiveTab] = useState(
    mappedInitialRole && TABS.some(t => t.value === mappedInitialRole) ? mappedInitialRole : "all"
  )

  const filteredExperts = activeTab === "all" 
    ? experts 
    : experts.filter(e => e.role === activeTab)

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

              <div className="mt-auto relative bg-surface-page p-4 rounded-2xl border border-line-soft">
                <Quote className="absolute top-2 left-2 w-6 h-6 text-brand-300/30 rotate-180" />
                <p className="text-[13px] text-neutral-600 leading-relaxed font-medium line-clamp-3 relative z-10">
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
