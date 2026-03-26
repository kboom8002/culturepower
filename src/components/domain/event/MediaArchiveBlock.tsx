import { EvidenceList, EvidenceItem } from "@/components/domain/trust/EvidenceList"

export interface MediaArchiveBlockProps {
  videoId?: string
  documents: EvidenceItem[]
}

export function MediaArchiveBlock({ videoId, documents }: MediaArchiveBlockProps) {
  if (!videoId && (!documents || documents.length === 0)) return null

  return (
    <div className="mb-12 border-t border-line-default pt-10">
      <h3 className="text-h3 text-neutral-900 mb-6">행사 아카이브</h3>
      
      {videoId && (
        <div className="mb-8">
          <h4 className="text-h4 text-neutral-800 mb-4">다시 보기</h4>
          <div className="relative w-full overflow-hidden rounded-2xl border border-line-default aspect-video">
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}`} 
              title="Event Video"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="mt-8">
          <EvidenceList items={documents} title="발제문 및 행사 자료" />
        </div>
      )}
    </div>
  )
}
