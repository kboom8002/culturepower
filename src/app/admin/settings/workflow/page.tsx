import { Info, GitCommit } from "lucide-react"

export default function WorkflowRulesPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Workflow Rules</h1>
        <p className="text-body text-neutral-600">콘텐츠의 상태 전이 규칙(Draft → Review → Public)과 승인 게이트웨이를 설정합니다. (현재 시스템 하드코딩 적용됨)</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm p-8 flex flex-col items-start justify-center">
        <h3 className="font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2"><GitCommit className="w-5 h-5 text-brand-600"/> 글로벌 콘텐츠 파이프라인</h3>
        <ul className="list-disc list-inside text-neutral-600 space-y-3 mb-8 ml-2">
          <li><strong>Draft (초안 작성):</strong> 모든 기획·편집/리서치 담당자가 자유롭게 작성할 수 있습니다.</li>
          <li><strong>Review (검수 대기):</strong> 작성 완료 후 검수자에게 내용 팩트체크를 요청하는 단계입니다. 외부(대국민)에는 노출되지 않습니다.</li>
          <li><strong>Public (발행 완료):</strong> 검수를 통과한 콘텐츠만 대국민 사이트(Webzine, SSoT 정답카드 등)에 실시간으로 노출됩니다. 오직 운영 총괄(또는 퍼블리싱 지정 권한)만 최종 발행이 가능합니다.</li>
          <li><strong>Archived (보관):</strong> 행사가 종료되거나 철회된 과거 콘텐츠는 비공개 아카이브로 안전하게 이동합니다.</li>
        </ul>
        <div className="p-4 bg-brand-50 border border-brand-100 rounded-xl text-brand-800 text-sm">
          <strong>현재 제어 상태:</strong> 기획 문서(22_RBAC 권한 정책 문서 v1.0)에 따라 위 규칙이 Backend Server Actions에 안전하게 하드코딩되어 있습니다. 드래그 앤 드롭 동적 워크플로우 편집기는 추후 Phase에서 제공됩니다.
        </div>
      </div>
    </div>
  )
}
