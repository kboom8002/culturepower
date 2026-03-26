import { PageHeader } from "@/components/layout/PageHeader"
import { FileText, Download, Calendar, Tag, FileArchive } from "lucide-react"
import Link from "next/link"

export default async function DataDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // MOCK data mimicking detail extraction
  const data = {
    id,
    title: "[Brief] 2026 문화예술진흥기금 운용 효율화 방안",
    categoryLabel: "One-Pager",
    date: "2026-03-25",
    author: "기획조정실",
    summary: "본 자료는 기존의 관행적인 지원금 분배 구조를 개혁하고 자생력을 갖춘 문화 생태계를 구축하기 위한 3개년 단기 예산 운용 가이드라인을 요약한 원페이지 브리프입니다.",
    fileSize: "1.2MB PDF",
    fileUrl: "/mock-download-url.pdf",
    relatedAnswers: [
      { id: "ans-1", title: "지역소멸 위기 속 문화 예산은 어떻게 쓰여야 하는가?" },
      { id: "ans-2", title: "성과 기반의 보조금 체계 개편 방향" }
    ]
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "데이터·자료", href: "/data" },
          { label: data.categoryLabel },
          { label: "상세자료" }
        ]}
        title={data.title}
        description={data.summary}
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-sm relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-500 mb-8 pb-6 border-b border-line-strong">
            <div className="flex items-center gap-1.5 text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
              <Tag className="w-4 h-4" />
              {data.categoryLabel}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {data.date}
            </div>
            <div className="w-[1px] h-4 bg-line-strong mx-1" />
            <div className="flex items-center gap-1.5">
              <span>작성:</span>
              <span className="text-neutral-900">{data.author}</span>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed mb-12">
            <p className="text-[17px]">{data.summary}</p>
            <h3>핵심 목차</h3>
            <ul>
              <li>1. 현행 예산 분배의 문제점 (중복 투자 및 사각지대 현황)</li>
              <li>2. SSoT 기반의 예산 배정 체인 구축 모델</li>
              <li>3. 권역별 로컬 크리에이터 거점 펀딩 시뮬레이션 결과</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            
            <div className="flex-1 bg-surface-soft border border-line-soft rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-4 hover:border-brand-300 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-line-strong flex items-center justify-center">
                <FileArchive className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">첨부파일 다운로드</h4>
                <p className="text-xs text-neutral-500">{data.fileSize} / 바이러스 검사 완료</p>
              </div>
              <button 
                className="mt-2 flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors w-full justify-center"
              >
                <Download className="w-4 h-4" /> 파일 내려받기
              </button>
            </div>

            <div className="flex-1 bg-white border border-line-strong rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                관련 정답 근거
              </h4>
              <ul className="flex flex-col gap-3">
                {data.relatedAnswers.map(ans => (
                  <li key={ans.id}>
                    <Link href={`/answers`} className="text-[14px] text-neutral-700 hover:text-brand-700 underline-offset-4 hover:underline leading-snug line-clamp-2">
                      {ans.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
