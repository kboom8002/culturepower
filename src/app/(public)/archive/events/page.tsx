import { getPublicEvents } from "@/lib/actions/public"
import { getFeaturedSlots } from "@/lib/actions/publishing"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"

export default async function PublicEventsPage() {
  const [events, featuredSlots] = await Promise.all([
    getPublicEvents(),
    getFeaturedSlots('events_hub')
  ])

  const featuredIds = featuredSlots.map(f => f.content_id)
  const curatedEvents = events.filter(e => featuredIds.includes(e.id))
  // Filter out curated from the main list so they don't duplicate, or just keep them (let's keep for simplicity, but maybe highlight top)
  const regularEvents = events.filter(e => !featuredIds.includes(e.id))

  const renderEventCard = (event: any, isCurated: boolean = false) => (
    <Link key={event.id} href={`/archive/events/${event.id}`} className={`group relative bg-white rounded-3xl overflow-hidden border ${isCurated ? 'border-brand-300 shadow-md ring-2 ring-brand-100 ring-offset-2' : 'border-line-default shadow-sm'} hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col`}>
      <div className={`${isCurated ? 'aspect-[16/7] md:aspect-video' : 'aspect-video'} bg-neutral-100 overflow-hidden relative`}>
        {event.thumbnail_url ? (
          <img src={event.thumbnail_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
             <Calendar className="w-12 h-12 mb-2" />
             <span className="text-sm font-semibold">No Image</span>
          </div>
        )}
        {event.status === 'Ongoing' && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full shadow-sm">진행중</div>
        )}
        {event.status === 'Upcoming' && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-full shadow-sm">예정</div>
        )}
        {event.status === 'Closed' && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-500 text-white text-xs font-bold rounded-full shadow-sm opacity-90">종료</div>
        )}
        {isCurated && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md text-brand-700 text-xs font-black rounded-full shadow-sm border border-brand-200">Featured</div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className={`${isCurated ? 'text-2xl' : 'text-xl'} font-bold text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug`}>
          {event.title}
        </h3>
        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-line-soft">
          {event.start_date && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium tracking-tight">
              <Calendar className="w-4 h-4 text-neutral-400" /> 
              {new Date(event.start_date).toLocaleDateString()} {event.end_date && `~ ${new Date(event.end_date).toLocaleDateString()}`}
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium tracking-tight">
              <MapPin className="w-4 h-4 text-neutral-400" /> {event.venue}
            </div>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-line-default pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">행사 아카이브</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-2xl leading-relaxed">
            문화강국네트워크가 주최하는 다양한 행사, 발제문, 영상 기록들을 한곳에서 확인하세요.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col gap-12">
          
          {curatedEvents.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-brand-600 tracking-widest uppercase">Spotlight</span>
                <h2 className="text-2xl font-bold text-neutral-900">주목할 만한 행사</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {curatedEvents.map(e => renderEventCard(e, true))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-neutral-900 border-b border-line-strong pb-4">전체 행사 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map(e => renderEventCard(e))}
              
              {regularEvents.length === 0 && curatedEvents.length === 0 && (
                 <div className="col-span-full py-24 text-center rounded-3xl border border-dashed border-line-strong bg-white">
                   <p className="text-neutral-500 text-lg">아직 공개된 행사 기록이 없습니다.</p>
                 </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
