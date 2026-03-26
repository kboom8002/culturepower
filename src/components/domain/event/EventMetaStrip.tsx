import { Chip } from "@/components/ui/chip"
import { Calendar, MapPin } from "lucide-react"

export type EventStatus = "Upcoming" | "Open" | "Closed" | "Archived"

export interface EventMetaStripProps {
  eventType: string
  startDate: string
  endDate: string
  venue: string
  status: EventStatus
}

export function EventMetaStrip({ eventType, startDate, endDate, venue, status }: EventMetaStripProps) {
  // Determine status chip properties
  let statusVariant: "default" | "primary" | "reviewed" | "issue" | "success" = "default"
  let statusText: string = status

  if (status === "Upcoming") {
    statusVariant = "primary"
    statusText = "예정"
  } else if (status === "Open") {
    statusVariant = "success"
    statusText = "모집 중"
  } else if (status === "Closed") {
    statusVariant = "default"
    statusText = "마감"
  } else if (status === "Archived") {
    statusVariant = "reviewed"
    statusText = "기록 보관됨"
  }

  const formatDate = (ds: string, de: string) => {
    const s = new Date(ds).toLocaleDateString("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
    const e = new Date(de).toLocaleDateString("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
    return `${s} ~ ${e}`
  }

  return (
    <div className="flex flex-col gap-4 mb-6 text-neutral-600 bg-surface-soft p-5 rounded-2xl border border-line-default">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Chip variant="default">{eventType}</Chip>
        <Chip variant={statusVariant}>{statusText}</Chip>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-2 text-body-sm">
          <Calendar className="w-5 h-5 text-brand-700 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 mb-1">일시</span>
            <span>{formatDate(startDate, endDate)}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2 text-body-sm">
          <MapPin className="w-5 h-5 text-brand-700 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 mb-1">장소</span>
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
