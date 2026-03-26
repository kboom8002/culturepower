import * as React from "react"
import { Chip } from "@/components/ui/chip"
import { UserCheck, Clock, ShieldCheck } from "lucide-react"

export interface TrustStripProps {
  reviewerName?: string
  reviewerRole?: string
  authorName?: string
  updatedAt: string
  status?: string
}

export function TrustStrip({ 
  reviewerName, 
  reviewerRole,
  authorName, 
  updatedAt,
  status = "Public"
}: TrustStripProps) {
  return (
    <div className="bg-surface-soft border border-line-default p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 text-body-sm text-neutral-700">
      
      {/* Authors/Reviewers */}
      <div className="flex items-center gap-3 flex-wrap">
        {status === "Public" && (
          <Chip variant="reviewed">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            검수 완료
          </Chip>
        )}
        
        {reviewerName && (
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-trust-text" />
            <span className="font-medium text-neutral-900">검수: {reviewerName}</span>
            {reviewerRole && <span className="text-neutral-500">({reviewerRole})</span>}
          </div>
        )}
        
        {authorName && (
           <div className="flex items-center gap-2 border-l border-line-default pl-3 ml-1">
             <span className="text-neutral-600">작성: {authorName}</span>
           </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Date */}
      <div className="flex items-center gap-2 text-neutral-500">
        <Clock className="w-4 h-4" />
        <span>최종 업데이트: {new Date(updatedAt).toLocaleDateString("ko-KR")}</span>
      </div>

    </div>
  )
}
