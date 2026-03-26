import { SearchCode, CheckCircle2, Clock } from "lucide-react"

export default function AdminPublishingSitemapPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Sitemap Generation</h1>
        <p className="text-body text-neutral-600">Google Search Console 및 네이버 웹마스터 도구를 위한 사이트맵 구조를 검증합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-2">
           <SearchCode className="w-6 h-6 text-brand-500 mb-2" />
           <h3 className="font-bold text-[18px] text-neutral-900">Primary Sitemap</h3>
           <p className="text-sm text-neutral-500">/sitemap.xml</p>
           <div className="mt-4 flex items-center gap-2 text-sm font-bold text-success-600">
              <CheckCircle2 className="w-4 h-4" /> 1,240 URLs indexed
           </div>
        </div>
        
        <div className="md:col-span-2 bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-4">
           <h3 className="font-bold text-[16px] text-neutral-900">Generation History</h3>
           <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-line-soft">
                  <div className="flex items-center gap-3">
                     <Clock className="w-4 h-4 text-neutral-400" />
                     <span className="text-sm font-mono text-neutral-700">2026-03-{25 - i} 00:00:00</span>
                  </div>
                  <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-1 rounded">SUCCESS</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
