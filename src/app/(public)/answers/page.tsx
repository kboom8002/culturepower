import { Suspense } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { AnswersClient } from "@/components/domain/answer/AnswersClient"
import { getPublicAnswers } from "@/lib/actions/public"

export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function AnswersIndexPage() {
  const answers = await getPublicAnswers()

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "정답카드 보관소" }]}
        title="정답카드 보관소"
        description="파편화된 정책과 문화 담론을 검증된 하나의 정답(Media SSoT)으로 정리하여 제공합니다."
      />
      <Suspense fallback={<div className="container mx-auto py-24 text-center">Loading answers...</div>}>
        <AnswersClient initialAnswers={answers} />
      </Suspense>
    </div>
  )
}
