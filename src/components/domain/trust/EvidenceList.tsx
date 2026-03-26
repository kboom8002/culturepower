import * as React from "react"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Calendar } from "lucide-react"

export interface EvidenceItem {
  id: string
  title: string
  sourceType: string
  date: string
  url?: string
}

export interface EvidenceListProps {
  items: EvidenceItem[]
  title?: string
}

export function EvidenceList({ items, title = "참고 문헌 및 근거" }: EvidenceListProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="text-h4 text-neutral-900">{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between bg-white border border-line-default p-4 rounded-lg hover:border-brand-700 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="bg-surface-page p-2 rounded-md">
                <FileText className="w-5 h-5 text-neutral-600 group-hover:text-brand-700" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-body font-medium text-neutral-900">{item.title}</span>
                <div className="flex items-center gap-2 text-caption text-neutral-500">
                  <span className="font-medium text-brand-700">{item.sourceType}</span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.date).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
            </div>
            
            {item.url && (
              <Button variant="tertiary" size="sm" asChild className="hidden sm:flex">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  문서 보기
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
