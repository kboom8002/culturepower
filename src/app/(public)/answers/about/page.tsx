import { ShieldCheck, Database, Link as LinkIcon, HelpCircle } from "lucide-react"

export default function AnswersAboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      
      {/* 1. 브랜드 Hero 구역 형식 차용 */}
      <section className="relative w-full bg-neutral-900 overflow-hidden pt-32 pb-24 mb-16 px-4">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-page to-transparent z-10"></div>
        
        <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-brand-600/20 text-brand-300 font-bold text-sm tracking-wider border border-brand-500/30">
            <Database className="w-4 h-4" />
            Single Source of Truth
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            단 하나의 진실 기준표,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">정답카드 (SSoT)</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl font-medium">
            산발적으로 흩어진 담론과 가짜 뉴스 사이에서 갈 길을 잃지 않도록,<br className="hidden md:block"/>명확한 사실 관계와 솔루션만을 압축한 백과사전형 지식 허브입니다.
          </p>
        </div>
      </section>

      {/* 2. 철학 및 기능 안내 */}
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-30 -mt-24">
        
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-xl flex flex-col gap-10">
          
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">모든 담론의 종착지이자 출발점</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              문화강국네트워크의 '정답카드'는 단순한 Q&A 게시판이 아닙니다. 
              현장 전문가들이 엄밀하게 팩트를 체크하고 규합한 <strong className="text-brand-700">핵심 지식 모델</strong>로서, 
              문강 RIO(스토리)와 실무 자료들이 의존하는 최상위 기준(Reference) 역할을 수행합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <HelpCircle className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Clarity (명확성)</h3>
              <p className="text-neutral-600 text-sm">추상적인 정책 이슈를 다루기 쉬운 하나의 카드로 압축하여 직관적이고 즉각적인 형태의 해답을 제공합니다.</p>
            </div>
            
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Verification (검증)</h3>
              <p className="text-neutral-600 text-sm">편집 운영위와 외부 전문가 집단(Reviewers)의 엄격한 교차 검수를 통과한 정보만이 SSoT로 시스템에 등재될 수 있습니다.</p>
            </div>
            
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <LinkIcon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Connectivity (연결)</h3>
              <p className="text-neutral-600 text-sm">정답카드는 분리되어 존재하지 않습니다. 모든 기사와 행사, 발제문은 반드시 이 카드를 팩트의 기준으로 인용(Reference)합니다.</p>
            </div>
          </div>
          
        </div>

      </main>
    </div>
  )
}
