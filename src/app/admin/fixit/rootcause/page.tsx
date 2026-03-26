import { PieChart } from "lucide-react"

export default function FixitRootcausePage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Root Cause Board</h1>
        <p className="text-body text-neutral-600">최근 발생하는 콘텐츠 결함의 근본 원인(Root Cause Bucket) 분포를 파악합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white rounded-3xl border border-line-default shadow-sm p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-line-soft pb-4">
               <PieChart className="w-6 h-6 text-brand-600" />
               <h3 className="font-bold text-neutral-900 text-lg">Defect Distribution by Cause</h3>
            </div>

            <div className="flex flex-col gap-4 mt-2">
               {[
                  { label: "Evidence / Trust (근거 부족)", val: 42, color: "bg-danger-500" },
                  { label: "Archive Completion (자료 누락)", val: 28, color: "bg-warning-500" },
                  { label: "Link Graph (고립 문서)", val: 15, color: "bg-brand-500" },
                  { label: "Schema / Feed (구조 오류)", val: 10, color: "bg-neutral-500" },
                  { label: "Tone / Framing (표현 일탈)", val: 5, color: "bg-neutral-300" }
               ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                     <div className="flex justify-between text-sm font-bold text-neutral-700">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                     </div>
                     <div className="w-full bg-neutral-100 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.val}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="bg-neutral-50 rounded-3xl border border-line-default p-8 flex flex-col justify-center items-center text-center">
            <p className="text-neutral-500 font-bold mb-4">가장 자주 발생하는 결함은<br/> <span className="text-danger-600 text-xl">&quot;정답카드 근거 문서 누락&quot;</span>입니다.</p>
            <p className="text-sm text-neutral-400">운영팀에 SSoT 작성 가이드라인 준수를 재차 공지하거나, 발행 단계(Publishing Queue)의 Linting Rule을 상향 조정할 필요가 있습니다.</p>
         </div>
      </div>
    </div>
  )
}
