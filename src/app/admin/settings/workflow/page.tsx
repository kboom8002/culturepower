import { GitBranch, ShieldCheck } from "lucide-react"

export default function AdminWorkflowSettingsPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Workflow Rules</h1>
        <p className="text-body text-neutral-600">콘텐츠 발행 및 승인 절차에 대한 전역 정책을 구성합니다. (현재 읽기 전용 모드)</p>
      </div>

      <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 max-w-2xl flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-line-soft">
           <GitBranch className="w-6 h-6 text-brand-600" />
           <h3 className="font-bold text-neutral-900 text-lg">Publishing Policy</h3>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-line-soft">
           <div className="flex flex-col">
              <span className="font-bold text-neutral-900">Require Peer Review</span>
              <span className="text-sm text-neutral-500 mt-1">Editor가 글을 발행하기 전 반드시 Reviewer의 승인을 거쳐야 합니다.</span>
           </div>
           <div className="w-12 h-6 bg-brand-500 rounded-full relative shadow-inner opacity-70 cursor-not-allowed">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
           </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-line-soft">
           <div className="flex flex-col">
              <span className="font-bold text-neutral-900">Auto-publish Approved Stories</span>
              <span className="text-sm text-neutral-500 mt-1">Reviewer가 승인한 글을 대기열을 거치지 않고 즉시 Webzine에 노출합니다.</span>
           </div>
           <div className="w-12 h-6 bg-neutral-200 rounded-full relative shadow-inner opacity-70 cursor-not-allowed">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
           </div>
        </div>

        <div className="p-3 bg-brand-50 rounded-lg flex gap-3 mt-2 text-brand-700 text-sm">
           <ShieldCheck className="w-5 h-5 shrink-0" />
           <p>현재 워크플로우 정책은 환경 설정 파일(`next.config.js`)에 의해 오버라이드되어 인터페이스에서 수정할 수 없습니다.</p>
        </div>
      </div>
    </div>
  )
}
