import { Webhook, Mail, Box } from "lucide-react"

export default function AdminIntegrationsPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Integrations</h1>
        <p className="text-body text-neutral-600">외부 서비스(이메일 발송, 슬랙 알림 등) 연동을 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-2 cursor-pointer hover:border-brand-300 transition-colors">
           <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-2">
              <Webhook className="w-6 h-6 text-purple-600" />
           </div>
           <h3 className="font-bold text-[18px] text-neutral-900">Teams / Slack Notifier</h3>
           <p className="text-sm text-neutral-500">신규 회원가입이나 파트너십 문의가 인입될 때 사내 메신저 웹훅으로 알림을 전송합니다.</p>
           <div className="mt-4 flex items-center gap-2 text-sm font-bold text-success-600 bg-success-50 px-3 py-1.5 rounded-full w-fit">
              Connected
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-2 cursor-pointer hover:border-brand-300 transition-colors">
           <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
              <Mail className="w-6 h-6 text-blue-600" />
           </div>
           <h3 className="font-bold text-[18px] text-neutral-900">SMTP Email Transport</h3>
           <p className="text-sm text-neutral-500">회원가입 승인 결과나 뉴스레터 발송 시 사용되는 외부 메일 서버(SMTP) 설정입니다.</p>
           <div className="mt-4 flex items-center gap-2 text-sm font-bold text-warning-600 bg-warning-50 px-3 py-1.5 rounded-full w-fit">
              Needs Configuration
           </div>
        </div>
        
        <div className="bg-neutral-50 rounded-3xl border border-line-default border-dashed p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]">
           <Box className="w-8 h-8 text-neutral-300" />
           <div>
             <h3 className="font-bold text-neutral-600">Add New Integration</h3>
             <p className="text-xs text-neutral-400 mt-1">추가 플러그인은 마켓플레이스를 통해 제공됩니다.</p>
           </div>
        </div>
      </div>
    </div>
  )
}
