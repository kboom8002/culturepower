import { getPublicEvents, getPublicResources } from "@/lib/actions/public"
import { PlayCircle, Award, Calendar, ChevronRight, Video, CalendarDays, MapPin, History } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function EventsAboutDashboardPage() {
  const [events, resources] = await Promise.all([
    getPublicEvents(),
    getPublicResources()
  ])

  // 1. VIP 명사 영상 (Curated Video)
  const videos = resources?.videos || []
  // 실제 DB에 영상이 없을 수도 있으므로 가장 최근 이벤트를 대체 수단으로 섞어 사용하거나 fallback 제공
  const featuredVideo = videos.length > 0 ? videos[0] : null
  const fallbackVideoThumb = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=2000"

  // 2. 최신 릴레이 행사 (시간순 정렬)
  const recentEvents = [...events].sort((a, b) => {
    return new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime()
  })
  
  // 3. 주요 기획 행사 (Major Events Bento Grid) - 가장 임팩트 있는 최근 2개 추출
  const majorEvents = recentEvents.slice(0, 2)
  const timelineEvents = recentEvents.slice(2, 7) // 나머지 타임라인으로

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24 selection:bg-brand-200">
      
      {/* ─────────────────────────────────────────────────────────
          [Tier 1] 시네마틱 명사 영상 Hero (유튜브/최신 VOD 하이라이트)
         ───────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] bg-neutral-900 overflow-hidden flex items-center justify-center group">
        {/* Background Video / Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={featuredVideo?.thumbnail_url || fallbackVideoThumb} 
            alt="VIP 강연 하이라이트"
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-900/20 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-600 border border-brand-400 text-white font-bold text-xs uppercase tracking-widest rounded-full mb-6 shadow-lg shadow-brand-500/20">
            <Award className="w-3.5 h-3.5" />
            프레스티지 VOD 시리즈
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight max-w-4xl text-balance drop-shadow-2xl">
            {featuredVideo?.title || "초기 문화강국의 위상, 명사들의 지혜를 잇다"}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-medium max-w-2xl text-balance mb-10 drop-shadow-md">
            과거와 현재를 아우르는 국내외 최고 권위자들의 문화 정책 인사이트와 글로벌 K-문명의 비전을 영상으로 확인하세요.
          </p>
          
          <Link 
            href={featuredVideo?.embed_url ? `/events` : `/events?category=video`}
            className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-brand-50 text-brand-900 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <PlayCircle className="w-6 h-6 text-brand-600" />
            마스터 클래스 시청하기
          </Link>
        </div>
        
        {/* 장식용 노이즈 패턴 */}
        <div className="absolute inset-0 bg-[url('https://pattern-base.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </section>

      {/* 대시보드 본문 컨테이너 */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-30 pt-16">
        
        {/* ─────────────────────────────────────────────────────────
            [Tier 2] 주요 기획 행사 (Major Events Bento Grid)
           ───────────────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
                <Calendar className="w-8 h-8 text-brand-600" />
                주요 기획 행사
              </h2>
              <p className="text-neutral-500 mt-2 font-medium">문화강국네트워크가 주도하는 스페셜 포럼과 정기 네트워킹</p>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors">
              전체 일정 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {majorEvents.length > 0 ? majorEvents.map((evt, idx) => (
              <Link 
                href={`/events/${evt.id}`} 
                key={evt.id}
                className={`group relative overflow-hidden rounded-3xl border border-line-default bg-white flex flex-col justify-end p-8 min-h-[380px] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 ${idx === 0 ? "lg:col-span-1" : "lg:col-span-1"}`}
              >
                {/* 썸네일 배경 처리 */}
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800">
                  {evt.thumbnail_url ? (
                    <img src={evt.thumbnail_url} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-300 group-hover:scale-110 transition-transform duration-700"></div>
                  )}
                  {/* 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
                </div>

                {/* 텍스트 컨텐츠 */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="self-start">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2 shadow-sm">
                      {evt.status === 'Upcoming' ? '💥 모집중' : evt.status === 'Ongoing' ? '🔥 진행중' : '🏆 행사 완료'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-snug mb-3 group-hover:text-brand-300 transition-colors line-clamp-2">
                      {evt.title}
                    </h3>
                    <div className="flex flex-col gap-1.5 text-neutral-300 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-brand-400" />
                        {evt.start_date ? new Date(evt.start_date).toLocaleDateString('ko-KR') : '날짜 미상'} 
                        {evt.end_date && evt.end_date !== evt.start_date ? ` ~ ${new Date(evt.end_date).toLocaleDateString('ko-KR')}` : ''}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                        {evt.venue || '장소 미상 / 온라인'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-2 py-20 text-center bg-surface-muted border border-line-default rounded-3xl text-neutral-500 font-medium">
                등록된 기획 행사가 아직 없습니다.
              </div>
            )}
          </div>
          <div className="mt-4 text-right sm:hidden">
            <Link href="/events" className="inline-flex items-center gap-1 text-sm font-bold text-brand-600">
              전체 일정 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            [Tier 3] 최신 행사 타임라인 (Chronological List)
           ───────────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-line-default pb-4">
            <History className="w-7 h-7 text-neutral-500" />
            <h2 className="text-2xl font-bold text-neutral-900">최신 행사 타임라인</h2>
          </div>

          {timelineEvents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {timelineEvents.map((evt) => (
                <Link 
                  href={`/events/${evt.id}`} 
                  key={evt.id}
                  className="group bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:items-center w-full">
                    {/* 날짜 박스 */}
                    <div className="w-24 h-24 shrink-0 bg-surface-muted rounded-xl border border-line-strong flex flex-col items-center justify-center text-center group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                      <span className="text-brand-600 font-extrabold text-2xl leading-none mb-1">
                        {evt.start_date ? new Date(evt.start_date).getDate() : '-'}
                      </span>
                      <span className="text-neutral-500 font-bold text-xs">
                        {evt.start_date ? `${new Date(evt.start_date).getFullYear()}년 ${new Date(evt.start_date).getMonth() + 1}월` : '-'}
                      </span>
                    </div>

                    {/* 정보 텍스트 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                          evt.status === 'Upcoming' ? 'bg-red-100 text-red-700' : 
                          evt.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {evt.status}
                        </span>
                        <span className="text-xs text-neutral-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {evt.venue || '온/오프라인'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-700 transition-colors mb-2 line-clamp-1">
                        {evt.title}
                      </h3>
                      {/* 짧은 서머리 (DB schema에 별도 summary 컬럼이 있을 경우 사용, 없으면 생략) */}
                      <p className="text-sm text-neutral-500 line-clamp-1">미래를 준비하는 문화강국네트워크의 철학과 비전에 동참해 보십시오.</p>
                    </div>
                  </div>

                  <div className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-surface-page items-center justify-center text-neutral-400 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 text-center text-neutral-500 bg-white border border-line-soft rounded-2xl font-medium">
              등록된 과거 행사가 없습니다.
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
