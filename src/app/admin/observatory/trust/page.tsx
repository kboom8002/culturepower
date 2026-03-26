import { ShieldCheck, UserCheck } from "lucide-react"

export default function ObservatoryTrustPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Trust Health</h1>
        <p className="text-body text-neutral-600">신뢰 구조(Reviewer 식별, Evidence 노출, ChangeLog 연결)가 정상적으로 작동하는지 파악합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col items-center text-center justify-center gap-2">
            <UserCheck className="w-8 h-8 text-brand-600 mb-2" />
            <h3 className="font-bold text-neutral-500">Reviewer Visibility Rate</h3>
            <div className="text-[32px] font-extrabold text-neutral-900">92%</div>
            <p className="text-xs text-brand-600 font-bold mt-2">Satisfactory</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col items-center text-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8 text-brand-600 mb-2" />
            <h3 className="font-bold text-neutral-500">UpdatedAt Visibility Rate</h3>
            <div className="text-[32px] font-extrabold text-neutral-900">100%</div>
            <p className="text-xs text-brand-600 font-bold mt-2">Perfect</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-warning-200 shadow-sm flex flex-col items-center text-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8 text-warning-600 mb-2" />
            <h3 className="font-bold text-warning-700">Evidence Block Presence</h3>
            <div className="text-[32px] font-extrabold text-neutral-900">68%</div>
            <p className="text-xs text-warning-700 font-bold mt-2">Needs Improvement</p>
         </div>
      </div>
    </div>
  )
}
