import { Suspense } from "react"
import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"
import { ExpertsClient } from "@/components/domain/expert/ExpertsClient"
import { getPublicExperts } from "@/lib/actions/public"
import { ShieldCheck } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ExpertsIndexPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const resolvedParams = await searchParams
  const roleSlug = resolvedParams.role
  
  const experts = await getPublicExperts()

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      
      {/* 커스텀 전문가 히어로 베이스라인 (DynamicSectionHero 변형 테마) */}
      <section className="relative w-full bg-neutral-900 border-b border-line-strong overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="container relative z-10 px-4 md:px-6 py-20 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1 flex flex-col text-left">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600/20 text-brand-300 font-bold text-xs uppercase tracking-wider rounded-lg border border-brand-500/30 shadow-[0_0_15px_rgba(36,92,147,0.4)]">
                <ShieldCheck className="w-4 h-4" />
                EEAT Proven Network
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight mb-6 leading-tight">
              전문가 위원단
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl font-medium">
              신뢰할 수 있는 문화강국의 단일 진실 공급망(SSoT)은 
              현장 전문가들과 학계 권위자들의 실명 검증 및 활발한 편집위원회 참여로 완성됩니다.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 md:px-6 pb-24">
        <Suspense fallback={<div className="py-32 text-center text-neutral-400 font-medium">검증된 디렉토리를 구축 중입니다...</div>}>
          <ExpertsClient experts={experts} initialRole={roleSlug} />
        </Suspense>
      </div>
    </div>
  )
}
