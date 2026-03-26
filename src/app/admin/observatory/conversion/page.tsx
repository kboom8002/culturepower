import { ArrowRightLeft } from "lucide-react"

export default function ObservatoryConversionPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Conversion Health</h1>
        <p className="text-body text-neutral-600">콘텐츠(Story/Answer)에서 참여(Participation)로 넘어가는 전환율을 분석합니다.</p>
      </div>

      <div className="bg-white rounded-3xl border border-line-default shadow-sm p-8 max-w-4xl flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-line-soft pb-4">
           <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <ArrowRightLeft className="w-6 h-6" />
           </div>
           <div>
              <h3 className="font-bold text-neutral-900 text-lg">Conversion Funnels</h3>
           </div>
        </div>

        <div className="flex flex-col gap-4">
           <div className="flex items-center justify-between p-4 rounded-xl border border-line-soft bg-neutral-50">
              <div className="flex items-center gap-3">
                 <span className="font-bold text-neutral-800">Stories</span>
                 <ArrowRightLeft className="w-4 h-4 text-neutral-400" />
                 <span className="font-bold text-brand-600 text-sm bg-brand-100 px-2 py-1 rounded">Newsletter Subscriptions</span>
              </div>
              <span className="font-extrabold text-neutral-900 text-xl">2.8%</span>
           </div>

           <div className="flex items-center justify-between p-4 rounded-xl border border-line-soft bg-neutral-50">
              <div className="flex items-center gap-3">
                 <span className="font-bold text-neutral-800">Answers</span>
                 <ArrowRightLeft className="w-4 h-4 text-neutral-400" />
                 <span className="font-bold text-brand-600 text-sm bg-brand-100 px-2 py-1 rounded">Membership Sign-ups</span>
              </div>
              <span className="font-extrabold text-neutral-900 text-xl">1.4%</span>
           </div>

           <div className="flex items-center justify-between p-4 rounded-xl border border-line-soft bg-neutral-50">
              <div className="flex items-center gap-3">
                 <span className="font-bold text-neutral-800">Event Pages</span>
                 <ArrowRightLeft className="w-4 h-4 text-neutral-400" />
                 <span className="font-bold text-brand-600 text-sm bg-brand-100 px-2 py-1 rounded">Registrations</span>
              </div>
              <span className="font-extrabold text-neutral-900 text-xl text-success-600">7.2%</span>
           </div>
        </div>
      </div>
    </div>
  )
}
