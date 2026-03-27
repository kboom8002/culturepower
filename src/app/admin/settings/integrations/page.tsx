import { Info } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Integrations</h1>
        <p className="text-body text-neutral-600">외부 API 호출용 Webhook 엔드포인트와 인증 키를 설정합니다. (향후 개발 예정)</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <Info className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">통합 기능이 준비 중입니다</h3>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">
          이메일 자동 발송 모듈 연동, 사용자 행동 분석(Mixpanel), 검색 엔진 고급 인덱싱(Algolia) 등 외부 서비스와의 확장 연동은 Phase 15 이후 추가될 예정입니다.
        </p>
      </div>
    </div>
  )
}
