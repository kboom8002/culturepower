import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface RegistrationCtaProps {
  status: "Upcoming" | "Open" | "Closed" | "Archived"
  registrationUrl?: string
}

export function RegistrationCta({ status, registrationUrl }: RegistrationCtaProps) {
  if (status === "Archived" || status === "Closed") {
    return (
      <div className="p-6 bg-surface-muted border border-line-default rounded-2xl text-center mb-10">
        <p className="text-body font-medium text-neutral-600">본 행사의 참가 접수가 마감되었습니다.</p>
        <p className="text-caption text-neutral-500 mt-1">행사 기록 및 자료는 하단 아카이브에서 확인 가능합니다.</p>
      </div>
    )
  }

  if (status === "Upcoming") {
    return (
      <div className="p-6 bg-surface-answer border border-brand-100 rounded-2xl text-center mb-10">
        <p className="text-[18px] font-bold text-brand-900 mb-2">참가 접수 예정입니다</p>
        <p className="text-body-sm text-neutral-600">일정이 확정되는 대로 뉴스레터 및 홈페이지를 통해 공지됩니다.</p>
      </div>
    )
  }

  // Open status
  return (
    <div className="p-8 bg-brand-050 border border-brand-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left mb-10 gap-6">
      <div>
        <h3 className="text-[20px] font-bold text-brand-900 mb-2">지금 참가 신청이 가능합니다</h3>
        <p className="text-body-sm text-neutral-600">사전 등록자에게는 당일 배포되는 자료집 원본이 제공됩니다.</p>
      </div>
      <Button variant="primary" size="lg" asChild className="shrink-0 w-full sm:w-auto">
        <Link href={registrationUrl || "#"}>참여 신청하기</Link>
      </Button>
    </div>
  )
}
