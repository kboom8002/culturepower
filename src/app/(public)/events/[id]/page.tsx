import { PageHeader } from "@/components/layout/PageHeader"
import { Calendar, MapPin, Tag, Download, Video, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Dummy data representing an Event or VOD Detail
  // We infer it's a video if the ID suggests it, or just mock a rich layout that handles both.
  const isVideo = id.includes('4') || id.includes('6') // Mock logic for VOD
  
  const data = {
    id,
    type: isVideo ? "명사 영상" : "현장 행사",
    title: isVideo 
      ? "[VOD] 존스홉킨스 석학 초청 강연: K-아키텍처의 세계화" 
      : "예산 구조 Reform 현장 대토론회",
    date: "2026-03-20(금) 14:00 - 16:00",
    location: isVideo ? "온라인 스트리밍 (종료됨)" : "서울 한국프레스센터 20층",
    description: "관행적인 예산 낭비를 막고 자생적인 문화 생태계를 구축하기 위한 근본적인 구조 개혁 과제에 대해 각계 전문가들이 모여 열띤 토론을 벌인 기록입니다.",
    videoUrl: isVideo ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : null, // Embedded Player URL
    materials: [
      { id: "m-1", name: "[현장 발제문] K-건축과 로컬의 미래.pdf", size: "3.2MB" },
      { id: "m-2", name: "[토론 요약] 질의응답 기록.docx", size: "1.5MB" }
    ]
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
          {!isVideo && (
            <div className="mt-12 bg-brand-900 p-8 rounded-2xl text-center text-white">
              <h3 className="text-[20px] font-bold mb-3">본 행사 참여를 희망하십니까?</h3>
              <p className="text-brand-100 text-sm mb-6">현재 잔여 좌석이 있습니다. 서둘러 사전등록을 완료하세요.</p>
              <button className="bg-white text-brand-900 font-bold px-8 py-3 rounded-lg hover:bg-neutral-100 transition-colors inline-flex items-center gap-2">
                사전 등록 신청하기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
