import { PageHeader } from "@/components/layout/PageHeader"
import { Search, FileText, LayoutTemplate, MapPin, Download, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const query = q || "";

  // Mock search results
  const hasQuery = query.length > 0;
  
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <div className="bg-brand-900 pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="text-h2 md:text-[36px] text-white font-bold mb-8">
            무엇을 찾고 계신가요?
          </h1>
          <form action="/search" className="relative max-w-2xl mx-auto">
            <input 
              name="q"
              defaultValue={query}
              type="text" 
              placeholder="정책 키워드, 정답카드, 연사 이름 등을 검색해 보세요" 
              className="w-full text-[16px] md:text-[18px] py-4 pl-14 pr-6 rounded-2xl outline-none shadow-lg text-neutral-900 border-2 border-transparent focus:border-brand-500 transition-colors"
              autoFocus
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-brand-800 transition-colors">
              검색
            </button>
          </form>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-12">
        {!hasQuery ? (
          <div className="text-center py-20 text-neutral-500 bg-white rounded-3xl border border-line-default shadow-sm h-[400px] flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-neutral-300 mb-4" />
            <p className="text-[18px] font-medium text-neutral-700">검색어를 입력해 주세요.</p>
            <p className="text-sm mt-2 text-neutral-400">인기 검색어: K-문명, 지역소멸, 지원 예산, SSoT</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-[18px] font-medium text-neutral-700 mb-6">
                <strong className="text-brand-700 font-bold border-b-2 border-brand-300">"{query}"</strong> 에 대한 통합 검색 결과입니다.
              </p>
            </div>

            {/* Answers Results */}
            <section>
              <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-brand-600" /> 
                SSoT 정답카드 <span className="text-brand-500 text-sm ml-1">2건</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <Link href={`/answers/ans-${i}`} key={i} className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm hover:border-brand-500 transition-colors group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-50 text-brand-700 text-[11px] font-bold px-2 py-0.5 rounded">정책/행정</span>
                    </div>
                    <h4 className="text-[17px] font-bold text-neutral-900 group-hover:text-brand-700 mb-2">
                      지역 소멸에 대응하는 K-컬처 예산 활용 방안은 어떻게 설계되어 있나요?
                    </h4>
                    <p className="text-sm text-neutral-600 line-clamp-2">문화강국네트워크가 검증한 2026 집중 육성 가이드라인에 따르면, {query} 중심의 인프라 지원이 핵심입니다...</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Magazine Results */}
            <section>
              <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" /> 
                문강 RIO 스토리 <span className="text-brand-500 text-sm ml-1">1건</span>
              </h3>
              <div className="flex flex-col gap-4">
                <Link href={`/webzine/stories/story-1`} className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm hover:border-brand-500 transition-colors flex flex-col md:flex-row gap-6 group">
                  <div className="w-full md:w-48 aspect-video bg-neutral-200 rounded-xl overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/search1/400/225" alt="story" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center">
                     <span className="text-xs font-bold text-brand-700 mb-2">Policy Insight</span>
                     <h4 className="text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 mb-2">
                      {query}를 넘어: 차세대 SSoT 플랫폼이 바꾸는 데이터 생태계
                    </h4>
                    <p className="text-sm text-neutral-600 line-clamp-2">파편화된 정보의 호수 속에서 어떻게 하나의 진실된 등대를 세울 것인가? 문강 RIO 편집부의 집중 분석 리포트.</p>
                  </div>
                </Link>
              </div>
            </section>

             {/* Documents Results */}
             <section>
              <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" /> 
                데이터·자료 <span className="text-brand-500 text-sm ml-1">3건</span>
              </h3>
              <div className="bg-white rounded-2xl border border-line-strong overflow-hidden flex flex-col divide-y divide-line-soft shadow-sm">
                {[1, 2, 3].map(i => (
                  <Link href={`/data/data-${i}`} key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-brand-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                        <Download className="w-5 h-5 text-neutral-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-neutral-900 group-hover:text-brand-700 mb-1">
                          [One-Pager] 2026 {query} 육성 공모사업 요강 요약본
                        </h4>
                        <div className="text-xs text-neutral-500 flex items-center gap-3">
                          <span>문화예술위원회</span>
                          <span>2026-03-24</span>
                          <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded">1.2MB PDF</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        )}
      </main>
    </div>
  )
}
