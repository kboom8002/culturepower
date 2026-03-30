import { Users, Target, Building2, History, Handshake, Quote, Sparkles } from "lucide-react"

export default function NetworkIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24 selection:bg-brand-200">
      
      {/* 1. 브랜드 Hero 구역 */}
      <section className="relative w-full bg-neutral-900 overflow-hidden pt-32 pb-24 mb-16 px-4">
        <div className="absolute inset-0 bg-[url('https://pattern-base.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-page to-transparent z-10"></div>
        
        <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-brand-300 text-sm font-bold tracking-widest backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            사단법인 소개
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            새로운 문화 문명을 여는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">문화강국네트워크</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            K-문명과 지역문화 발전의 이정표를 세우는<br className="hidden md:block"/> 전문가 포럼과 데이터 플랫폼의 연합체입니다.
          </p>
        </div>
      </section>

      {/* 2. Bento Grid 메인 컨텐츠 */}
      <main className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-30 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Block A: 설립 개요 및 이사장 인사말 (Hero Span) */}
          <section id="greeting" className="scroll-mt-32 lg:col-span-12 group">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-lg flex flex-col md:flex-row gap-12 items-center hover:border-brand-500/30 transition-colors">
              <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-muted mb-6 border-4 border-surface-page shadow-inner">
                  <div className="w-full h-full bg-gradient-to-br from-brand-100 to-neutral-200 flex items-center justify-center">
                    <Users className="w-12 h-12 text-brand-400" />
                  </div>
                </div>
                <h2 className="text-h3 text-neutral-900 mb-2">김문강</h2>
                <p className="text-neutral-500 font-medium mb-6">사단법인 문화강국네트워크 초대 이사장<br/>(Culture Power Network 초대 대표)</p>
              </div>
              
              <div className="w-full md:w-2/3 relative">
                <Quote className="absolute -top-6 -left-8 w-16 h-16 text-brand-100/50 -z-10" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 leading-snug">
                  "문화가 곧 국력인 시대,<br className="hidden md:block"/> 흩어진 정책과 학술 담론을 통합합니다."
                </h3>
                <p className="text-lg leading-relaxed text-neutral-600 mb-6">
                  수많은 문화 정책과 데이터들이 파편화되어 창작자들과 정책 입안자들에게 제대로 결합되지 못하고 있습니다. 누구나 쉽게 접근하고 신뢰할 수 있는 <strong>단일 진실 공급원(Single Source of Truth)</strong>을 구축해야 할 때입니다.
                </p>
                <p className="text-lg leading-relaxed text-neutral-600">
                  우리는 현장 창작자들의 생생한 목소리와 학계의 견고한 이론, 그리고 정책 결정자들의 실천적 지혜를 촘촘히 엮어 대한민국이 진정한 문화강국으로 도약하기 위한 길잡이가 되겠습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Block B: 비전 및 미션 (Dark Mode) */}
          <section id="vision" className="scroll-mt-32 lg:col-span-7">
            <div className="h-full bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden group hover:border-brand-500/50 transition-colors flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-3xl rounded-full"></div>
              
              <div className="flex items-center gap-3 mb-10">
                <Target className="w-7 h-7 text-brand-400" />
                <h2 className="text-h3 text-white">비전 & 미션</h2>
              </div>
              
              <div className="mb-10 relative z-10">
                <span className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-3 block">Vision</span>
                <p className="text-2xl md:text-3xl font-bold text-white leading-snug text-balance">
                  새로운 상상력으로 세계 인류 보편의 평화와 문명 진보에 기여하는 <span className="text-brand-300">글로벌 문화 허브</span>
                </p>
              </div>
              
              <div className="relative z-10 pt-8 border-t border-white/10">
                <span className="text-neutral-400 text-sm font-bold uppercase tracking-widest mb-3 block">Mission</span>
                <p className="text-lg text-neutral-300 leading-relaxed font-medium">
                  정책 아젠다 발굴, 투명한 데이터 개방, AI 친화적 지식 구조화를 통해 지식의 불균형을 해소한다.
                </p>
              </div>
            </div>
          </section>

          {/* Block C: 조직 구성 (Light Glass) */}
          <section id="organization" className="scroll-mt-32 lg:col-span-5">
            <div className="h-full bg-white p-8 md:p-10 rounded-3xl border border-line-default shadow-sm hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <Building2 className="w-6 h-6 text-brand-600" />
                <h2 className="text-h3 text-neutral-900">조직 구성</h2>
              </div>
              
              <div className="flex flex-col gap-4 flex-1 justify-center">
                <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-soft border border-transparent hover:border-line-default transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-1 group-hover/item:text-brand-700 transition-colors">이사회</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">법인 운영 정책 및 주요 사업 의결 기구</p>
                  </div>
                </div>
                
                <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-soft border border-transparent hover:border-line-default transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-1 group-hover/item:text-brand-700 transition-colors">편집위원회</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">SSoT 정답카드 및 문강 RIO 편찬 총괄</p>
                  </div>
                </div>
                
                <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-soft border border-transparent hover:border-line-default transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-1">전문가 위원단</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">상임위 및 섹션별 학술 자문, 데이터 검증</p>
                  </div>
                </div>
                
                <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-soft border border-transparent hover:border-line-default transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-1">운영사무국</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">플랫폼 운영, 정기 행사 기획, 회원 관리</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Block D: 주요 연혁 및 협력기관 */}
          <section id="history" className="scroll-mt-32 lg:col-span-12">
            <div className="grid md:grid-cols-2 gap-6 h-full">
              {/* History */}
              <div className="bg-surface-soft p-8 md:p-10 rounded-3xl border border-line-default flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <History className="w-6 h-6 text-neutral-500" />
                  <h2 className="text-h3 text-neutral-900">주요 연혁</h2>
                </div>
                <div className="relative pl-6 border-l-2 border-line-strong py-2 flex flex-col gap-8 flex-1">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-600 border-4 border-surface-soft"></div>
                    <span className="text-brand-700 font-bold text-lg block mb-1">2026. 03</span>
                    <p className="text-neutral-700 font-medium">문화강국네트워크 공식 플랫폼(SSoT) 런칭</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-neutral-300 border-4 border-surface-soft"></div>
                    <span className="text-neutral-500 font-bold text-lg block mb-1">2025. 11</span>
                    <p className="text-neutral-700 font-medium">베타서비스 오픈 및 T/F 출범식</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-neutral-300 border-4 border-surface-soft"></div>
                    <span className="text-neutral-500 font-bold text-lg block mb-1">2025. 05</span>
                    <p className="text-neutral-700 font-medium">발기인 대회 및 사단법인 창립 총회</p>
                  </div>
                </div>
              </div>

              {/* Partners */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-line-default shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake className="w-6 h-6 text-brand-600" />
                    <h2 className="text-h3 text-neutral-900">함께하는 사람들</h2>
                  </div>
                  <p className="text-neutral-500 mb-8">대한민국을 대표하는 문화예술 유관 기관과 민간 파트너들이 진실 공급망 형성에 동참하고 있습니다.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="px-5 py-3 bg-surface-page rounded-xl border border-line-default font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 transition-colors shadow-sm">한국문화예술위원회</div>
                  <div className="px-5 py-3 bg-surface-page rounded-xl border border-line-default font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 transition-colors shadow-sm">예술경영지원센터</div>
                  <div className="px-5 py-3 bg-surface-page rounded-xl border border-line-default font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 transition-colors shadow-sm">한국콘텐츠진흥원</div>
                  <div className="px-5 py-3 flex items-center gap-2 bg-brand-50 rounded-xl border border-brand-200 font-bold text-brand-700 shadow-sm cursor-pointer hover:bg-brand-100 transition-colors">
                    <Sparkles className="w-4 h-4" />
                    파트너스 조인하기
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
