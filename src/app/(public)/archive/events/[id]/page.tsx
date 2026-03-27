import { getPublicEventById } from "@/lib/actions/public"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Video, FileText, Image as ImageIcon, ExternalLink, Download } from "lucide-react"

export default async function PublicEventDetailPage({ params }: { params: { id: string } }) {
  const event = await getPublicEventById(params.id)
  if (!event) return notFound()

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] pb-24">
      <section className="bg-white border-b border-line-default pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl relative">
          <Link href="/archive/events" className="inline-flex items-center text-brand-600 hover:text-brand-700 font-bold text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {event.status === 'Ongoing' && <span className="px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full shadow-sm">진행중</span>}
                {event.status === 'Upcoming' && <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-full shadow-sm">예정</span>}
                {event.status === 'Closed' && <span className="px-3 py-1 bg-neutral-500 text-white text-xs font-bold rounded-full shadow-sm">종료</span>}
                <span className="text-neutral-500 text-sm font-mono tracking-wider">{event.id.slice(0, 8)}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {event.title}
              </h1>
              <div className="flex flex-col gap-3 mt-6">
                {event.start_date && (
                  <div className="flex items-center gap-3 text-neutral-600 font-medium tracking-tight">
                    <Calendar className="w-5 h-5 text-neutral-400" /> 
                    {new Date(event.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                    {event.end_date && ` ~ ${new Date(event.end_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}`}
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center gap-3 text-neutral-600 font-medium tracking-tight">
                    <MapPin className="w-5 h-5 text-neutral-400" /> {event.venue}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col gap-16">
          
          {/* Videos Section */}
          {event.videos && event.videos.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Video className="w-6 h-6 text-brand-500" />
                <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">행사 영상</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.videos.map(video => (
                  <div key={video.id} className="bg-white rounded-2xl border border-line-default overflow-hidden shadow-sm flex flex-col group">
                    <div className="aspect-video bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                      {video.thumbnail_url ? (
                        <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex flex-col items-center text-neutral-400">
                          <Video className="w-10 h-10 mb-2 opacity-50" />
                          <span className="text-xs font-semibold">동영상 재생</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                         <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center pl-1 backdrop-blur-sm">
                            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z"/></svg>
                         </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <h3 className="font-bold text-lg text-neutral-900 leading-tight">{video.title}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                         <span className="text-xs font-mono text-neutral-500">{video.duration_seconds ? `${Math.floor(video.duration_seconds/60)}:${(video.duration_seconds%60).toString().padStart(2,'0')}` : '알 수 없음'}</span>
                         <a href={video.source_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-brand-600 hover:underline inline-flex items-center gap-1">
                           YouTube 보기 <ExternalLink className="w-3 h-3" />
                         </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          {event.documents && event.documents.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-brand-500" />
                <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">발제문 및 자료집</h2>
              </div>
              <div className="flex flex-col gap-3">
                {event.documents.map(doc => (
                  <a key={doc.id} href={doc.file_url} target="_blank" rel="noreferrer" className="bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 hover:shadow-md transition-all flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">{doc.title}</h3>
                      {doc.summary && <p className="text-sm text-neutral-500 line-clamp-1 mt-0.5">{doc.summary}</p>}
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">{doc.document_type}</span>
                      <button className="text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Galleries Section */}
          {event.galleries && event.galleries.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-brand-500" />
                <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">현장 갤러리</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.galleries.map(gal => (
                  <div key={gal.id} className="bg-white p-5 rounded-2xl border border-line-default shadow-sm flex flex-col gap-3">
                    <div className="w-full aspect-square bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-300 relative overflow-hidden">
                       <ImageIcon className="w-10 h-10" />
                       <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded backdrop-blur-sm">
                         +{gal.photo_count} 장
                       </div>
                    </div>
                    <h3 className="font-bold text-neutral-900 leading-tight mt-1">{gal.title}</h3>
                    {gal.caption_summary && <p className="text-sm text-neutral-500 line-clamp-2">{gal.caption_summary}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
