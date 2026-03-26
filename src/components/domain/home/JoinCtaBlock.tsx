import { Button } from "@/components/ui/button"
import Link from "next/link"

export function JoinCtaBlock() {
  return (
    <section className="py-24 bg-surface-page">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white border border-line-default rounded-3xl p-8 md:p-16 text-center shadow-sm">
          <h2 className="text-h2 text-brand-900 mb-6">문화강국의 가치를 함께 키워주세요</h2>
          <p className="text-body-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
            매월 발행되는 주요 아젠다 리포트와 함께, 문화 관련 최신 행사와 정책 소식을 가장 빨리 만나보실 수 있습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild className="w-full sm:w-auto min-w-[160px]">
              <Link href="/join">정회원 가입안내</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto min-w-[160px]">
              <Link href="/join#newsletter">뉴스레터 구독</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
