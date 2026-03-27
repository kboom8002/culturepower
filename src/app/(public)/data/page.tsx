import { PageHeader } from "@/components/layout/PageHeader"
import { getPublicResources } from "@/lib/actions/public"
import { getFeaturedSlots } from "@/lib/actions/publishing"
import { DataFeatured } from "@/components/domain/data/DataFeatured"
import { FileText, Video, Image as ImageIcon, Calendar, ExternalLink } from "lucide-react"

export const revalidate = 60 // 1 min ISR

export default async function DataHubPage() {
  const [resources, featuredSlots] = await Promise.all([
    getPublicResources(),
    getFeaturedSlots('Data/Resources') // Matching SLOTS.id in FeaturedManager
  ])

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "데이터·자료", href: "/data" }]}
        title="데이터·자료"
        description="문화강국네트워크가 제공하는 심층 보고서, 통계 자료, 행사 영상 및 시각 자산들을 통합 제공합니다."
      />
      
      <main className="container mx-auto px-4 md:px-6 py-12 flex-1">
        {/* Featured Control Section */}
        <DataFeatured items={featuredSlots} resources={resources} />

        {/* All Hub Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Documents */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2 border-b border-line-default pb-4">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">발제문 및 문서</h2>
              <span className="ml-auto bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded-full">{resources.documents.length}</span>
            </div>
            {resources.documents.length === 0 && <p className="text-sm text-neutral-500 py-8 text-center bg-white rounded-xl border border-line-soft">등록된 문서가 없습니다.</p>}
            {resources.documents.map(doc => (
              <div key={doc.id} className="bg-white rounded-xl p-5 border border-line-soft shadow-sm hover:border-brand-300 transition-colors">
                <div className="text-xs font-bold text-blue-600 mb-2">{doc.document_type || "일반 문서"}</div>
                <h3 className="font-bold text-neutral-900 mb-2 leading-snug">{doc.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-4">{doc.summary}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-neutral-400 font-mono">{new Date(doc.created_at).toISOString().split('T')[0]}</span>
                  {doc.file_url && (
                    <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 flex items-center hover:underline">
                      다운로드 <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Videos */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2 border-b border-line-default pb-4">
              <div className="bg-red-100 text-red-700 p-2 rounded-xl">
                <Video className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">영상 자료</h2>
              <span className="ml-auto bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded-full">{resources.videos.length}</span>
            </div>
            {resources.videos.length === 0 && <p className="text-sm text-neutral-500 py-8 text-center bg-white rounded-xl border border-line-soft">등록된 영상이 없습니다.</p>}
            {resources.videos.map(vid => (
              <div key={vid.id} className="bg-white rounded-xl overflow-hidden border border-line-soft shadow-sm hover:border-brand-300 transition-colors">
                {vid.thumbnail_url ? (
                  <div className="w-full aspect-video bg-neutral-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-neutral-800 flex items-center justify-center">
                    <Video className="w-8 h-8 text-neutral-600" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 mb-2 leading-snug">{vid.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-neutral-400 font-mono">{new Date(vid.created_at).toISOString().split('T')[0]}</span>
                    {vid.source_url && (
                      <a href={vid.source_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-red-600 flex items-center hover:underline">
                        시청하기 <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Galleries */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2 border-b border-line-default pb-4">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-xl">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">현장 갤러리</h2>
              <span className="ml-auto bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded-full">{resources.galleries.length}</span>
            </div>
            {resources.galleries.length === 0 && <p className="text-sm text-neutral-500 py-8 text-center bg-white rounded-xl border border-line-soft">등록된 갤러리가 없습니다.</p>}
            {resources.galleries.map(gal => (
              <div key={gal.id} className="bg-white rounded-xl p-5 border border-line-soft shadow-sm hover:border-brand-300 transition-colors">
                <h3 className="font-bold text-neutral-900 mb-2 leading-snug">{gal.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-4">{gal.caption_summary}</p>
                <div className="flex justify-between items-center mt-auto border-t border-line-soft pt-4">
                  <span className="text-xs font-bold text-neutral-400">사진 {gal.photo_count || 0}장</span>
                  <span className="text-xs text-neutral-400 font-mono">{new Date(gal.created_at).toISOString().split('T')[0]}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
