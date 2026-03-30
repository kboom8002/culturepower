import { Button } from "@/components/ui/button"
import Link from "next/link"

export function JoinCtaBlock() {
  return (
    <section className="py-32 bg-brand-50 border-t border-line-default">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-[900px] mx-auto bg-white border border-brand-200 rounded-[2rem] p-10 md:p-20 text-center shadow-xl shadow-brand-100/50">
          <h2 className="text-h2 md:text-[3rem] text-brand-900 mb-6 font-bold tracking-tight">
            후원으로 함께 만드는 문화강국
          </h2>
          <p className="text-body-lg text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            문화강국네트워크는 문화정책 연구, 웹진 발간, 토론회 개최, 문화교류 활동 등을 추진하고 있습니다. 
            여러분의 후원은 이러한 활동이 지속적으로 이어질 수 있는 중요한 기반이 됩니다. 
            후원을 통해 문화정책 발전과 문화강국 대한민국을 만들어가는 여정에 함께해 주시기 바랍니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild className="w-full sm:w-auto min-w-[180px] h-14 text-base rounded-2xl shadow-md">
              <Link href="/join/about#purpose">후원 취지 보기</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto min-w-[180px] h-14 text-base rounded-2xl border-2 hover:border-brand-500 hover:text-brand-900">
              <Link href="/join/benefits">후원자 혜택 보기</Link>
            </Button>
            <Button variant="tertiary" size="lg" asChild className="w-full sm:w-auto min-w-[180px] h-14 text-base rounded-2xl border-line-strong hover:bg-neutral-50 text-neutral-700">
              <Link href="/network#contact">협력 제안하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
