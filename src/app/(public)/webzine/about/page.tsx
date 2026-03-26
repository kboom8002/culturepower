import { PageHeader } from "@/components/layout/PageHeader"
import { BookOpen, Target, PenTool } from "lucide-react"

export default function WebzineAboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "문강 RIO", href: "/webzine/stories" },
          { label: "문강 RIO 소개" }
        ]}
        title="문강 RIO 소개"
        description="파편화된 문화 정책과 학술 담론을 하나로 엮어내는 새로운 지식의 흐름(RIO)입니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="flex flex-col gap-16">
          
          <section id="intro" className="bg-white p-8 rounded-3xl border border-line-default shadow-sm">
            <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-600" />
              문강 RIO란?
            </h2>
            <p className="text-[17px] leading-[1.8] text-neutral-700">
              '문강 RIO(Review, Insight, Observer)'는 대한민국 문화 생태계의 복잡한 쟁점들을 깊이 있게 들여다보는 공식 웹진입니다. 단편적인 뉴스를 넘어, 정책의 이면과 현장의 목소리를 Media SSoT 철학에 기반하여 철저히 검증하고 입체적으로 재구성합니다.
            </p>
          </section>

          <section id="purpose">
            <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-brand-600" />
              발간 목적
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
                <h3 className="text-[18px] font-bold text-brand-900 mb-3">1. 지식의 파편화 극복</h3>
                <p className="text-sm leading-relaxed text-brand-800">흩어져 있는 정부 예산 분석, 학술 논문, 현장 취재 기사를 하나로 모아 구조화된 맥락을 제공합니다.</p>
              </div>
              <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
                <h3 className="text-[18px] font-bold text-brand-900 mb-3">2. 팩트 기반의 어젠다 세팅</h3>
                <p className="text-sm leading-relaxed text-brand-800">오직 검증된 데이터(정답카드)에 근거한 심층 해설로 소모적인 논쟁을 줄이고 생산적인 담론을 이끕니다.</p>
              </div>
              <div className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
                <h3 className="text-[18px] font-bold text-brand-900 mb-3">3. 현장 크리에이터 스피커 확성</h3>
                <p className="text-sm leading-relaxed text-brand-800">로컬 창작자들의 혁신 사례를 글로벌 K-문명 의제로 격상시켜 정책 입안자들에게 전달합니다.</p>
              </div>
            </div>
          </section>

          <section id="editorial" className="bg-surface-soft p-10 rounded-3xl border border-line-default">
            <h2 className="text-h3 text-neutral-900 mb-8 flex items-center gap-2">
              <PenTool className="w-6 h-6 text-brand-600" />
              창간사 / 편집장의 글
            </h2>
            <blockquote className="border-l-4 border-brand-500 pl-6 italic mb-6">
              <p className="text-[18px] leading-relaxed text-neutral-800 font-medium">
                "질문이 멈추면 문화도 성장을 멈춥니다. 문강 RIO는 좋은 질문을 찾고, 그 질문에 대한 가장 정확한 해설서를 써 내려갈 것입니다."
              </p>
            </blockquote>
            <p className="text-[16px] leading-[1.8] text-neutral-600">
              수많은 정보의 범람 속에서 진실을 가려내는 일은 점점 더 어려워지고 있습니다. 문강 RIO는 단일 진실 공급원(SSoT)의 가치를 언론과 웹진의 형태로 풀어낸 첫 번째 시도입니다. 우리는 흔들리지 않는 팩트 위에서 대한민국 문화강국의 비전을 이야기하겠습니다.
            </p>
            <div className="mt-8 pt-6 border-t border-line-strong text-right">
              <span className="font-bold text-neutral-900">제1대 편집장 김문강</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
