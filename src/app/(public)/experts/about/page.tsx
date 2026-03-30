import { ShieldCheck, CheckCircle2, Award, UserCheck } from "lucide-react"

export default function ExpertsAboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      
      {/* 1. 브랜드 Hero 구역 형식 차용 */}
      <section className="relative w-full bg-neutral-900 overflow-hidden pt-32 pb-24 mb-16 px-4">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-page to-transparent z-10"></div>
        
        <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-brand-600/20 text-brand-300 font-bold text-sm tracking-wider border border-brand-500/30">
            <ShieldCheck className="w-4 h-4" />
            EEAT Proven Network
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            진실을 만드는 사람들,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">전문가 위원단</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl font-medium">
            플랫폼 내 모든 아젠다와 데이터의 무결성을 검증하고,<br className="hidden md:block"/>단일 진실 공급원(SSoT)의 수준을 끌어올리는 학술 코어입니다.
          </p>
        </div>
      </section>

      {/* 2. 철학 및 참여 안내 */}
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-30 -mt-24">
        
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-xl flex flex-col gap-10">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">최고의 전문성, 무분별한 정보 생태계의 방파제</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              문화강국네트워크의 전문가 위원단은 단순한 자문 기구가 아닙니다. 
              현장에서 활동하는 실무진과 학계의 교수진이 명예와 실명을 걸고 모든 <strong className="text-brand-700">정답카드</strong>와 <strong className="text-brand-700">문강 RIO</strong>의 내용을 감수하고 확정 짓습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Award className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Expertise</h3>
              <p className="text-neutral-600 text-sm">해당 분야 10년 이상의 연구원/전문위원으로 구성된 학술 코어 집단</p>
            </div>
            
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Trust</h3>
              <p className="text-neutral-600 text-sm">데이터 무결성 서약을 통과한 실명 위주 활동으로 투명한 신뢰 확보</p>
            </div>
            
            <div className="bg-surface-soft p-6 rounded-2xl border border-line-default flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <UserCheck className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Authority</h3>
              <p className="text-neutral-600 text-sm">정부·공공기관의 흩어진 담론을 모아 단일한 정책 해법(SSoT)으로 도출</p>
            </div>
          </div>
          
        </div>

      </main>
    </div>
  )
}
