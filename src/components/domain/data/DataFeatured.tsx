"use client"

import { FileText, Video, Image as ImageIcon, ExternalLink, Calendar } from "lucide-react"

export function DataFeatured({ items, resources }: { items: any[], resources: any }) {
  if (items.length === 0) return null

  // Map slots to actual data
  const contentMap: Record<string, any[]> = {
    'Document': resources.documents,
    'Video': resources.videos,
    'Gallery': resources.galleries
  }

  const featured = items
    .sort((a, b) => a.display_order - b.display_order)
    .map(slot => {
      const list = contentMap[slot.content_type] || []
      const data = list.find(l => l.id === slot.content_id)
      if (data) return { ...data, _type: slot.content_type }
      return null
    })
    .filter(Boolean)

  if (featured.length === 0) return null

  return (
    <section className="mb-16 bg-brand-50 rounded-3xl p-8 border border-brand-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-900 mb-2">오늘의 추천 자료</h2>
          <p className="text-brand-700">문화강국네트워크가 큐레이션한 핵심 인사이트를 먼저 확인하세요.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {/* Decorative elements */}
          <span className="w-2 h-2 rounded-full bg-brand-400"></span>
          <span className="w-2 h-2 rounded-full bg-brand-300"></span>
          <span className="w-2 h-2 rounded-full bg-brand-200"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((item, idx) => {
          const isDoc = item._type === 'Document'
          const isVid = item._type === 'Video'
          const isGal = item._type === 'Gallery'
          
          return (
            <div key={`${item.id}-${idx}`} className="bg-white rounded-2xl p-6 shadow-sm border border-line-soft hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${isDoc ? 'bg-blue-50 text-blue-600' : isVid ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'}`}>
                  {isDoc && <FileText className="w-4 h-4" />}
                  {isVid && <Video className="w-4 h-4" />}
                  {isGal && <ImageIcon className="w-4 h-4" />}
                </span>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{item._type}</span>
              </div>
              
              <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 hover:text-brand-600 cursor-pointer">{item.title}</h3>
              <p className="text-sm text-neutral-600 line-clamp-3 mb-6 flex-1">
                {item.summary || item.caption_summary || "자세한 내용을 확인하려면 클릭하세요."}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-line-soft">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                {isDoc && item.file_url && (
                  <a href={item.file_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-bold text-brand-600 hover:text-brand-700">
                    문서 열기 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
                {isVid && item.source_url && (
                  <a href={item.source_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-bold text-brand-600 hover:text-brand-700">
                    영상 보기 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
