import { PageHeader } from "@/components/layout/PageHeader"
import { Calendar, MapPin, Tag, Download, Video, ArrowRight } from "lucide-react"
import Link from "next/link"

import { getPublicEventDetail } from "@/lib/actions/public"
import { notFound } from "next/navigation"
import { ShareButtons } from "@/components/ui/ShareButtons"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const rawEvent = await getPublicEventDetail(id)
  if (!rawEvent) {
    return notFound()
  }

  const isVideo = (rawEvent.title || '').includes("VOD") || (rawEvent.title || '').includes("영상") || (rawEvent.videos && rawEvent.videos.length > 0)
  const seriesObj = rawEvent.event_series?.[0]?.series
  
  const data = {
    id: rawEvent.id,
    type: isVideo ? "명사 영상" : "현장 행사",
    title: rawEvent.title,
    date: rawEvent.start_at ? new Date(rawEvent.start_at).toLocaleString("ko-KR") : "KST 미정",
    location: rawEvent.location_name || "장소 미정 (온라인/오프라인)",
    posterImageUrl: rawEvent.poster_image_asset?.public_url || null,
    description: rawEvent.summary || rawEvent.body_text || "내용이 등록되지 않았습니다.",
    videoUrl: null as string | null, // To be integrated with real videos if they exist
    materials: [] as any[], // To be integrated with real documents if they exist
    seriesName: seriesObj ? seriesObj.name_ko : null,
    videos: [] as any[], // To be integrated
    isPast: false
  }

  const now = new Date().getTime()
  const endAt = rawEvent.end_at ? new Date(rawEvent.end_at).getTime() : null
  const startAt = rawEvent.start_at ? new Date(rawEvent.start_at).getTime() : null
  
  if (rawEvent.event_status === 'finished') {
    data.isPast = true
  } else if (endAt && endAt < now) {
    data.isPast = true
  } else if (!endAt && startAt && startAt < now) {
    data.isPast = true
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "행사·영상", href: "/events" },
          { label: data.type },
          { label: "상세" }
        ]}
        title="기록과 행사"
        description="대한민국 문화강국을 향한 SSoT 지식 생태계의 모든 생생한 현장을 기록합니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="bg-white p-6 md:p-12 rounded-3xl border border-line-default shadow-sm relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-sm font-bold rounded-lg border border-brand-100">
              {data.type}
            </span>
            {data.seriesName && (
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-sm font-bold rounded-lg border border-neutral-200">
                {data.seriesName}
              </span>
            )}
          </div>
          
          <h1 className="text-h2 md:text-[36px] text-neutral-900 mb-8 leading-snug tracking-tight text-balance">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[15px] font-medium text-neutral-600 mb-10 pb-8 border-b border-line-strong">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              {data.date}
            </div>
            <div className="w-[1px] h-5 bg-line-strong" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-neutral-400" />
              {data.location}
            </div>
          </div>

          {data.posterImageUrl && (
            <div className="w-full flex justify-center mb-12">
              <img 
                src={data.posterImageUrl} 
                alt={`${data.title} 포스터`} 
                className="w-full max-w-2xl h-auto shadow-sm"
              />
            </div>
          )}

          {/* VOD Player Area */}
          {data.videoUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-line-default bg-neutral-900 aspect-video relative shadow-lg">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1&showinfo=0&rel=0" // Safe placeholder
                title="VOD Player"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          )}

          <div className="prose prose-neutral max-w-none text-neutral-800 leading-[1.8] text-[17px] mb-12 bg-surface-soft p-8 rounded-2xl border border-line-soft">
            <p className="m-0">{data.description}</p>
          </div>

          {/* Materials Section */}
          {data.materials.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[18px] text-neutral-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-brand-600" />
                관련 첨부 자료
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {data.materials.map(mat => (
                  <button key={mat.id} className="flex items-center justify-between p-4 rounded-xl border border-line-strong bg-white hover:border-brand-500 hover:shadow-sm transition-all text-left group">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="font-medium text-[15px] text-neutral-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                        {mat.name}
                      </span>
                      <span className="text-xs text-neutral-500">{mat.size}</span>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Call to action for Schedule events */}
          {!isVideo && !data.isPast && (
            <div className="mt-12 bg-brand-900 p-8 rounded-2xl text-center text-white">
              <h3 className="text-[20px] font-bold mb-3">본 행사 참여를 희망하십니까?</h3>
              <p className="text-brand-100 text-sm mb-6">현재 잔여 좌석이 있습니다. 서둘러 사전등록을 완료하세요.</p>
              <a href={rawEvent.registration_url || "#"} className="bg-white text-brand-900 font-bold px-8 py-3 rounded-lg hover:bg-neutral-100 transition-colors inline-flex items-center gap-2">
                사전 등록 신청하기 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {!isVideo && data.isPast && (
            <div className="mt-12 bg-neutral-900 p-8 rounded-2xl text-center text-white">
              <h3 className="text-[20px] font-bold mb-3">종료된 행사입니다</h3>
              <p className="text-neutral-300 text-sm mb-6">해당 행사는 사전 등록이 마감되었습니다. 문강 RIO에서 관련 기록물을 확인하세요.</p>
              <Link href="/webzine" className="bg-white text-neutral-900 font-bold px-8 py-3 rounded-lg hover:bg-neutral-100 transition-colors inline-flex items-center gap-2">
                관련 아카이브 문서 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <ShareButtons title={data.title} description={data.description} />

        </div>
      </main>
    </div>
  )
}
