"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/layout/FilterBar"
import { FileText, Download } from "lucide-react"
import Link from "next/link"

const DATA_FILTERS = [
  { value: "all", label: "전체 자료" },
  { value: "info", label: "문화예술정보" },
  { value: "schedule", label: "주요 행사/일정" },
  { value: "contest", label: "공모사업" },
  { value: "brief", label: "One-Pager / Brief" },
  { value: "note", label: "데이터 노트" }
]

const MOCK_DATA = Array.from({ length: 12 }).map((_, i) => {
  const slugs = ["brief", "note", "info", "contest"]
  const labels = ["One-Pager", "데이터 노트", "문화예술정보", "공모사업"]
  const cats = i % slugs.length

  return {
    id: `data-${i + 1}`,
    categorySlug: slugs[cats],
    categoryLabel: labels[cats],
    title: [
      "[Brief] 2026 문화예술진흥기금 운용 효율화 방안",
      "[Note] 지역소멸 대응 문화도시 예산 분석 엑셀 데이터",
      "[Info] K-콘텐츠 유럽 시장 진출 현황과 통계",
      "[Contest] 하반기 시각예술 분야 창작지원 공모사업 요약"
    ][cats],
    date: "2026-03-" + (25 - i).toString().padStart(2, '0'),
    size: ["1.2MB PDF", "450KB XLSX", "2.1MB PDF", "800KB PDF"][cats],
    isDownloadable: true
  }
})

function DataContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get("category") || "all"
  const [activeFilter, setActiveFilter] = useState(initialFilter)

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setActiveFilter(cat)
    else setActiveFilter("all")
  }, [searchParams])

  const filteredData = activeFilter === "all" 
    ? MOCK_DATA 
    : MOCK_DATA.filter(d => d.categorySlug === activeFilter)

  return (
    <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-12">
      <FilterBar 
        options={DATA_FILTERS} 
        initialValue={activeFilter} 
        onChange={(val) => {
          setActiveFilter(val)
          window.history.replaceState(null, '', val === 'all' ? '/data' : `/data?category=${val}`)
        }}
      />
      
      {filteredData.length > 0 ? (
        <div className="bg-white rounded-2xl border border-line-default overflow-hidden mt-6 shadow-sm">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-surface-soft border-b border-line-default text-caption font-bold text-neutral-500 uppercase">
            <div className="col-span-2 pl-2">분류</div>
            <div className="col-span-7">자료명</div>
            <div className="col-span-2 text-center">등록일</div>
            <div className="col-span-1 text-right pr-2">파일</div>
          </div>
          
          <div className="flex flex-col divide-y divide-line-soft">
            {filteredData.map((item) => (
              <div 
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/data/${item.id}`)}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-5 sm:p-4 hover:bg-brand-050 transition-colors group cursor-pointer items-center"
              >
                <div className="col-span-2 sm:pl-2">
                  <span className="inline-block px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-md text-xs font-medium border border-line-soft">
                    {item.categoryLabel}
                  </span>
                </div>
                
                <div className="col-span-7 font-medium text-[16px] text-neutral-900 group-hover:text-brand-700 transition-colors">
                  {item.title}
                </div>
                
                <div className="col-span-2 text-sm text-neutral-500 sm:text-center mt-2 sm:mt-0 font-mono">
                  {item.date}
                </div>
                
                <div className="col-span-1 flex items-center justify-end mt-2 sm:mt-0 sm:pr-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('파일 다운로드가 시작되었습니다. (Demo)');
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">다운로드</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-500 bg-surface-soft rounded-2xl border border-line-default mt-6">
          해당 분야의 자료가 없습니다.
        </div>
      )}
    </main>
  )
}

export default function DataIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[{ label: "데이터·자료" }]}
        title="데이터·자료 아카이브"
        description="정책 결정과 연구에 필요한 핵심 데이터 노트, One-Pager 브리프, 공모사업 정보를 투명하게 개방합니다."
      />
      <Suspense fallback={<div className="container mx-auto py-24 text-center">Loading Data Hub...</div>}>
        <DataContent />
      </Suspense>
    </div>
  )
}
