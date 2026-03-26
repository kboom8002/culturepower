import { Rocket, Clock, Activity, Rss, Globe, CheckCircle2 } from "lucide-react"

const MOCK_PUBLISH_QUEUE = [
  { id: "A-1238", type: "AnswerCard", title: "로컬 크리에이터 창업 지원 사업의 본질적 목표", status: "Approved", autoPublish: "Will publish in 2 hrs" },
  { id: "S-088", type: "Story", title: "DDP 심포지엄 참관기: 우리는 왜 지금 K-문명을 논하는가", status: "Scheduled", autoPublish: "2026-03-27 09:00" },
]

export default function PublishingQueuePage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Publishing Hub</h1>
        <p className="text-body text-neutral-600">
          검수가 승인된 객체들의 퍼블릭 배포 상태를 관리하고, 검색 엔진 및 외부 AI 피드 파이프라인의 건강도를 모니터링합니다.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Publishing Queue */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-line-soft flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-neutral-900 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-brand-600" />
                Publish Queue
              </h2>
              <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full">{MOCK_PUBLISH_QUEUE.length} in queue</span>
            </div>
            <div className="divide-y divide-line-soft">
              {MOCK_PUBLISH_QUEUE.map((item) => (
                <div key={item.id} className="p-5 flex items-start justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-neutral-400">{item.id}</span>
                      <span className="bg-neutral-100 text-neutral-700 text-[11px] font-bold px-2 py-0.5 rounded uppercase">{item.type}</span>
                    </div>
                    <div className="font-bold text-neutral-900 text-[16px]">{item.title}</div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.autoPublish}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-xl hover:bg-neutral-800 transition-colors">
                    Publish Now
                  </button>
                </div>
              ))}
              
              {MOCK_PUBLISH_QUEUE.length === 0 && (
                <div className="p-12 text-center text-neutral-500 font-medium">
                  Queue is empty. No approved items waiting to be published.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Feed & Sitemap Status */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-line-default shadow-sm p-6 flex flex-col gap-6">
             <h2 className="text-[18px] font-bold text-neutral-900 flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-brand-600" />
              AEO & SEO Pipelines
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 font-bold text-neutral-700">
                  <Rss className="w-4 h-4 text-brand-500" /> 
                  AI Feed (NDJSON)
                </div>
                <span className="flex items-center gap-1 text-success-600 font-bold bg-success-bg px-2 py-0.5 rounded text-xs">
                  <CheckCircle2 className="w-3 h-3" /> Healthy
                </span>
              </div>
              <div className="pl-6 text-xs text-neutral-500 space-y-1">
                <p>Endpoint: <code className="bg-neutral-100 px-1 py-0.5 rounded">/api/ai/answers.ndjson</code></p>
                <p>Last Pulled: 2 hrs ago (Perplexity Bot)</p>
                <p>Public Entities Exported: 1,245</p>
              </div>
            </div>

            <hr className="border-line-soft" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 font-bold text-neutral-700">
                  <Globe className="w-4 h-4 text-brand-500" /> 
                  XML Sitemaps
                </div>
                <span className="flex items-center gap-1 text-success-600 font-bold bg-success-bg px-2 py-0.5 rounded text-xs">
                  <CheckCircle2 className="w-3 h-3" /> Updated
                </span>
              </div>
              <div className="pl-6 text-xs text-neutral-500 space-y-1">
                <p>Index: <code className="bg-neutral-100 px-1 py-0.5 rounded">sitemap.xml</code></p>
                <p>Last Sync: Today, 03:00 AM</p>
                <p>Google Search Console: Connected</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl border border-brand-200 p-6">
            <h3 className="text-brand-900 font-bold mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Pipeline Heartbeat
            </h3>
            <p className="text-xs text-brand-700 leading-relaxed">
              모든 배포(Publishing) 액션은 1분 내로 Vercel Edge Cache를 무효화(Revalidate)하며, AI 봇이 실시간으로 NDJSON 피드를 읽어갈 수 있도록 즉시 동기화됩니다.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
