import { Rss, RefreshCcw, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPublishingFeedPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">RSS & JSON Feed Status</h1>
        <p className="text-body text-neutral-600">외부 플랫폼(검색엔진, 뉴스기반 앱 등)으로 공급되는 웹진 콘텐츠 피드 배포 상태를 모니터링합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Rss className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="font-bold text-[18px] text-neutral-900">Stories RSS Feed</h3>
                    <p className="text-xs text-neutral-500">/feed.xml</p>
                 </div>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success-50 text-success-700 font-bold text-xs rounded-full">
                 <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
           </div>
           
           <div className="bg-neutral-50 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                 <span className="text-neutral-500 font-medium">Last Generated</span>
                 <span className="font-mono font-bold text-neutral-900">2026. 3. 24. 12:00:00</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-neutral-500 font-medium">Items Included</span>
                 <span className="font-mono font-bold text-neutral-900">50 latest</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-neutral-500 font-medium">Byte Size</span>
                 <span className="font-mono font-bold text-neutral-900">45.2 KB</span>
              </div>
           </div>
           
           <div className="flex gap-3">
              <Button variant="secondary" className="flex-1"><RefreshCcw className="w-4 h-4 mr-2" /> 강제 생성</Button>
              <Button variant="tertiary" className="flex-1">피드 보기</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
