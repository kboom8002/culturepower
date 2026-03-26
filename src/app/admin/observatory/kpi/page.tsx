import { Activity, Target, Zap, Link as LinkIcon, AlertCircle, Clock } from "lucide-react"
import { getObservatoryStats } from "@/lib/actions/fixit"

export default async function ObservatoryKpiPage() {
  const stats = await getObservatoryStats()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">KPI Overview (KPI6)</h1>
        <p className="text-body text-neutral-600">안정적인 SSoT 운영을 위한 6대 핵심 지표(Coverage, Citation, TTI 등) 요약입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* KPI Cards based on AIO-PR KPI6 */}
         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-brand-700">
               <Target className="w-6 h-6" />
               <h3 className="font-bold">Question Coverage</h3>
            </div>
            <div className="text-[36px] font-extrabold text-neutral-900 tracking-tight">{stats.coverage}%</div>
            <p className="text-sm text-neutral-500 mt-2">QAMS 표준 질문 세트 대비 정답 확보율 (목표: 80%)</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-brand-700">
               <LinkIcon className="w-6 h-6" />
               <h3 className="font-bold">SSoT Citation</h3>
            </div>
            <div className="text-[36px] font-extrabold text-neutral-900 tracking-tight">{stats.ssotCitation}%</div>
            <p className="text-sm text-neutral-500 mt-2">퍼블릭 웹진/행사에서 SSoT 정답카드를 인용한 비율</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-brand-700">
               <Activity className="w-6 h-6" />
               <h3 className="font-bold">Claim Capture</h3>
            </div>
            <div className="text-[36px] font-extrabold text-neutral-900 tracking-tight">{stats.claimCapture}%</div>
            <p className="text-sm text-neutral-500 mt-2">외부 매체 주장/질문을 얼마나 신속히 수집했는가</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-brand-700">
               <Zap className="w-6 h-6" />
               <h3 className="font-bold">Evidence Align</h3>
            </div>
            <div className="text-[36px] font-extrabold text-neutral-900 tracking-tight">{stats.evidenceAlign}%</div>
            <p className="text-sm text-neutral-500 mt-2">정답카드 중 백업 근거(문서/자료)가 충분히 연결된 비율</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-danger-600">
               <AlertCircle className="w-6 h-6" />
               <h3 className="font-bold">Contradiction</h3>
            </div>
            <div className="text-[36px] font-extrabold text-danger-600 tracking-tight">{stats.contradiction}%</div>
            <p className="text-sm text-neutral-500 mt-2">과거 정답과 현재 정답의 충돌 가능성 (목표: 0%)</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-neutral-700">
               <Clock className="w-6 h-6" />
               <h3 className="font-bold">Time to Insight (TTI)</h3>
            </div>
            <div className="text-[36px] font-extrabold text-neutral-900 tracking-tight">{stats.tti} <span className="text-xl text-neutral-500 font-bold">Days</span></div>
            <p className="text-sm text-neutral-500 mt-2">새로운 외부 주장 인입 후 공식 정답이 퍼블리싱 되기까지 평균</p>
         </div>
      </div>
    </div>
  )
}
