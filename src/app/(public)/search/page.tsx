import { PageHeader } from "@/components/layout/PageHeader"
import { Search, FileText, LayoutTemplate, MapPin, Download, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import { searchAllContent } from "@/lib/actions/public"

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const query = q || "";

  // Mock search results check
  const hasQuery = query.trim().length > 0;
  
  // Fetch real data
  const { answers, stories, events } = await searchAllContent(query)
  
  const totalResults = answers.length + stories.length + events.length;

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
              className="w-full bg-white text-[16px] md:text-[18px] py-4 pl-14 pr-6 rounded-2xl outline-none shadow-lg text-neutral-900 border-2 border-transparent focus:border-brand-500 transition-colors"
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
                <strong className="text-brand-700 font-bold border-b-2 border-brand-300">"{query}"</strong> 에 대한 통합 검색 결과입니다. (총 {totalResults}건)
              </p>
            </div>

            {totalResults === 0 && (
               <div className="text-center py-24 bg-white rounded-3xl border border-line-default shadow-sm">
                 <p className="text-lg text-neutral-500 mb-2">"{query}"에 대한 검색 결과가 없습니다.</p>
                 <p className="text-sm text-neutral-400">다른 키워드로 검색해 보시거나 철자를 확인해 주세요.</p>
               </div>
            )}

            {/* Answers Results */}
            {answers.length > 0 && (
              <section>
                <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-brand-600" /> 
                  SSoT 정답카드 <span className="text-brand-500 text-sm ml-1">{answers.length}건</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {answers.map(ans => (
                    <Link href={`/answers/${ans.slug}`} key={ans.id} className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm hover:border-brand-500 transition-colors group">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-brand-50 text-brand-700 text-[11px] font-bold px-2 py-0.5 rounded">{ans.topics?.name || "분류 없음"}</span>
                      </div>
                      <h4 className="text-[17px] font-bold text-neutral-900 group-hover:text-brand-700 mb-2">
                        {ans.title}
                      </h4>
                      <p className="text-sm text-neutral-600 line-clamp-2">{ans.summary || "설명이 등록되지 않았습니다."}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Magazine Results */}
            {stories.length > 0 && (
              <section>
                <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-600" /> 
                  문강 RIO 스토리 <span className="text-brand-500 text-sm ml-1">{stories.length}건</span>
                </h3>
                <div className="flex flex-col gap-4">
                  {stories.map((story) => (
                    <Link href={`/webzine/stories/${story.slug}`} key={story.id} className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm hover:border-brand-500 transition-colors flex flex-col md:flex-row gap-6 group">
                      <div className="w-full md:w-48 aspect-video bg-neutral-100 rounded-xl overflow-hidden shrink-0">
                        {story.featured_image ? (
                           <img src={story.featured_image.url} alt={story.featured_image.alt || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                             <BookOpen className="w-8 h-8 opacity-20" />
                           </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                         <span className="text-xs font-bold text-brand-700 mb-2">{story.topics?.name || 'Story'}</span>
                         <h4 className="text-[18px] font-bold text-neutral-900 group-hover:text-brand-700 mb-2">
                          {story.title}
                        </h4>
                        <p className="text-sm text-neutral-600 line-clamp-2">{story.deck || story.why_this_matters || "내용이 등록되지 않았습니다."}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

             {/* Documents/Events Results */}
             {events.length > 0 && (
               <section>
                <h3 className="text-[20px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" /> 
                  행사·영상 등 데이터 <span className="text-brand-500 text-sm ml-1">{events.length}건</span>
                </h3>
                <div className="bg-white rounded-2xl border border-line-strong overflow-hidden flex flex-col divide-y divide-line-soft shadow-sm">
                  {events.map((ev) => (
                    <Link href={`/events/${ev.id}`} key={ev.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-brand-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5 text-neutral-500" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-neutral-900 group-hover:text-brand-700 mb-1">
                            {ev.title}
                          </h4>
                          <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-3">
                            {ev.series_name && <span className="font-bold text-brand-600">{ev.series_name}</span>}
                            <span>{ev.venue || "온/오프라인"}</span>
                            <span>{ev.start_date ? new Date(ev.start_date).toLocaleDateString() : '일정미정'}</span>
                            {ev.status === 'Archived' && (
                              <span className="font-mono bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded">자료 공개</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
             )}

          </div>
        )}
      </main>
    </div>
  )
}
