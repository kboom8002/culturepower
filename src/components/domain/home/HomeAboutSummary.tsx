import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomeAboutSummary() {
  return (
    <section className="w-full bg-surface-soft py-20 px-4 border-b border-line-default">
      <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
        <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-6">
          문화강국네트워크는 무엇을 하는 곳인가
        </h2>
        <p className="text-body-lg text-neutral-600 mb-10 text-balance leading-relaxed">
          문화강국네트워크는 문화정책 연구, 공론장 형성, 국내외 문화교류를 통해 문화자치와 문화분권의 실질적 실현을 추진하는 문화정책 네트워크입니다. 지역과 시민 중심의 문화정책 발전에 기여하고, 지속가능한 문화강국 실현을 목표로 합니다.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/network#purpose" className="text-sm font-semibold text-neutral-700 bg-white border border-line-strong hover:border-brand-500 hover:text-brand-700 px-6 py-2.5 rounded-full transition-all flex items-center gap-2">
            설립 목적 보기 <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/network#vision" className="text-sm font-semibold text-neutral-700 bg-white border border-line-strong hover:border-brand-500 hover:text-brand-700 px-6 py-2.5 rounded-full transition-all flex items-center gap-2">
            비전과 미션 보기 <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/network#history" className="text-sm font-semibold text-neutral-700 bg-white border border-line-strong hover:border-brand-500 hover:text-brand-700 px-6 py-2.5 rounded-full transition-all flex items-center gap-2">
            연혁 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
