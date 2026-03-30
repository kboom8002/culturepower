import { 
  Building2, 
  MessageCircle, 
  Globe2, 
  Target, 
  BookOpen, 
  Sparkles, 
  User, 
  Compass, 
  ScrollText, 
  Map, 
  TrendingUp, 
  Calendar, 
  Database,
  Share2,
  Mail,
  Users,
  Grid,
  PenTool,
  Network
} from "lucide-react"
import Link from "next/link"

export default function WebzineAboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen font-sans pb-24 selection:bg-brand-200">
      
      {/* ---------------------------------------------------- */}
      {/* Section A: Hero */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full bg-brand-900 overflow-hidden pt-32 pb-24 px-4 border-b border-brand-800">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-900/50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="container relative z-20 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-white text-[13px] font-bold tracking-widest uppercase">
                국가 문화전략 플랫폼
              </span>
              <h1 className="text-[44px] md:text-[56px] font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                문강 文江 RIO
              </h1>
              <p className="text-[20px] md:text-[24px] text-white/90 font-bold tracking-tight mb-8">
                기록이 아닌 제안, 평론이 아닌 대안
              </p>
              <p className="text-[17px] md:text-[18px] text-white/80 leading-[1.7] max-w-2xl font-medium mb-10 text-balance">
                문강 RIO는 문화강국 의제를 정책설계, 현장증명, 실무도구의 구조로 번역하는 정책형 웹진입니다. 
                단순 뉴스가 아닌, 국회·지자체·현장 실무자가 행정과 기획에 즉시 인용할 수 있는 
                기사·리포트·원페이저·캘린더·데이터·뉴스레터를 생산합니다.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a href="#rio-framework" className="px-5 py-3 rounded-lg bg-white text-brand-900 font-bold hover:bg-neutral-100 transition-colors shadow-sm text-[15px]">
                  문강의 구조 보기
                </a>
                <a href="#sections" className="px-5 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors shadow-sm border border-white/20 text-[15px]">
                  6개 섹션 보기
                </a>
                <a href="#newsletter" className="px-5 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors shadow-sm border border-white/20 text-[15px]">
                  뉴스레터 구독
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 h-full flex flex-col justify-center">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
                <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-6">문강 작업 흐름 다이어그램</h3>
                
                <div className="flex flex-col gap-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/30 shadow-inner">1</div>
                    <div>
                      <span className="text-white font-bold text-[16px] block mb-1">Question</span>
                      <p className="text-white/70 text-[13px] leading-relaxed">파편화된 현상과 정책 수요를 발견하고 구조화된 문화강국 핵심 질문을 설계합니다.</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/30 shadow-inner">2</div>
                    <div>
                      <span className="text-white font-bold text-[16px] block mb-1">R·I·O</span>
                      <p className="text-white/70 text-[13px] leading-relaxed">무엇을 바꿀 것인지(Reform), 어떻게 실행할지(Implementation), 어떤 효과가 날지(Outcomes) 3단계로 치밀하게 분석합니다.</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-900 font-extrabold text-sm shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/50">3</div>
                    <div>
                      <span className="text-white font-bold text-[16px] block mb-1">Tools</span>
                      <p className="text-white/80 text-[13px] leading-relaxed font-medium">단순 기사 외에 One-Pager, Data Lab, 지원사업 Calendar, Subscription 형태로 번역되어 배포됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section B: 왜 문강 RIO인가 (Why RIO) */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-surface-page">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
            
            <div className="lg:w-5/12">
              <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">Why 문강 RIO</span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-neutral-900 tracking-tight leading-[1.2] mb-6">
                왜 문강 RIO가<br className="hidden lg:block"/> 필요한가
              </h2>
              <p className="text-[17px] text-neutral-600 leading-[1.7] text-balance">
                문화정책과 문화산업, 지역문화 현장은 늘 많은 정보와 이슈를 생산하지만, 
                실제 정책과 제도, 행정과 현장에 바로 <strong>'인용 가능한'</strong> 형태로 정리되는 경우는 드뭅니다.<br /><br />
                문강 RIO는 이 간극을 확실히 줄이기 위해 탄탄한 질문을 구조화하고, 막연한 비판 대신 구체적인 정책 대안을 설계하며, 
                실무자가 책상 위에서 바로 활용할 수 있는 문서 형식으로 SSoT(Single Source of Truth)를 구축합니다.
              </p>
            </div>
            
            <div className="lg:w-7/12 flex flex-col gap-5">
              <div className="bg-white rounded-[20px] p-8 border border-line-default shadow-sm hover:border-brand-300 hover:shadow-md transition-all flex items-start gap-5">
                <div className="w-12 h-12 bg-surface-soft border border-line-strong rounded-xl flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-neutral-900 mb-2">1. 정책 설계 (Policy Design)</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">현상을 가볍게 설명하는 데서 끝나지 않고, 제도와 예산이 수반되는 구체적인 실행 설계안을 제시합니다.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-[20px] p-8 border border-line-default shadow-sm hover:border-brand-300 hover:shadow-md transition-all flex items-start gap-5">
                <div className="w-12 h-12 bg-surface-soft border border-line-strong rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-neutral-900 mb-2">2. 현장 증명 (Field Proof)</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">이론적인 탁상공론을 배제하고, 현장의 사례와 당사자들의 목소리를 모아 정책 단위로 승격시킬 가능성을 증명합니다.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-[20px] p-8 border border-line-default shadow-sm hover:border-brand-300 hover:shadow-md transition-all flex items-start gap-5">
                <div className="w-12 h-12 bg-brand-50 border border-brand-200 rounded-xl flex items-center justify-center shrink-0">
                  <PenTool className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-neutral-900 mb-2">3. 실무 도구화 (Utility Tooling)</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">모든 정보를 긴 줄글 기사(Webzine)로만 두지 않고, One-Pager Brief / Data Lab / Newsletter 포맷으로 묶어 실무적인 도구로 지급합니다.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section C: 문강의 편집 프레임 (RIO Framework) */}
      {/* ---------------------------------------------------- */}
      <section id="rio-framework" className="w-full py-24 bg-brand-900/5 scroll-mt-24 border-y border-line-default">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">근본적인 사고 체계</span>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-neutral-900 tracking-tight leading-[1.2] mb-6">
            문강의 편집 프레임: <span className="text-brand-600">RIO</span>
          </h2>
          <p className="text-[17px] text-neutral-600 leading-[1.6] max-w-2xl mx-auto mb-16 text-balance">
            문강 RIO의 모든 주요 콘텐츠는 단순한 현상 나열을 넘어,<br className="hidden md:block"/> 
            <strong>무엇을 바꿀 것인가(R) → 어떻게 실행할 것인가(I) → 무엇이 달라질 것인가(O)</strong> 의 
            강력한 3단 논리 흐름을 기준으로 정제됩니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* R */}
            <div className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-[100px] -z-0"></div>
              <span className="text-[64px] font-black text-brand-100 group-hover:text-brand-200 transition-colors leading-none tracking-tighter -mt-4 mb-2 relative z-10">R</span>
              <h3 className="text-[22px] font-extrabold text-neutral-900 mb-4 relative z-10">Reform<br/><span className="text-[16px] text-neutral-500 font-bold block mt-1">(무엇을 바꿀 것인가)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.8] space-y-3 relative z-10 flex-1">
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 낡은 틀을 깨는 새로운 구조개혁 의제 설정</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 제도·재정·거버넌스 차원의 근본적 전환 제안</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 예: 지역 주도 문화정책 설계, 문화재정 자율권 확보 등</li>
              </ul>
            </div>
            
            {/* I */}
            <div className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-[100px] -z-0"></div>
              <span className="text-[64px] font-black text-brand-100 group-hover:text-brand-200 transition-colors leading-none tracking-tighter -mt-4 mb-2 relative z-10">I</span>
              <h3 className="text-[22px] font-extrabold text-neutral-900 mb-4 relative z-10">Implementation<br/><span className="text-[16px] text-neutral-500 font-bold block mt-1">(어떻게 실행할 것인가)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.8] space-y-3 relative z-10 flex-1">
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 막연한 당위를 넘어, 현장에서 즉각 실행 가능한 대안 설계</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 최소(Min) / 중간(Mid) / 공세(Max)의 3단계 복수 시나리오 제공</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 실효성을 증명하는 단계별 실행 로드맵 및 예산 추계</li>
              </ul>
            </div>
            
            {/* O */}
            <div className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-[100px] -z-0"></div>
              <span className="text-[64px] font-black text-brand-100 group-hover:text-brand-200 transition-colors leading-none tracking-tighter -mt-4 mb-2 relative z-10">O</span>
              <h3 className="text-[22px] font-extrabold text-neutral-900 mb-4 relative z-10">Outcomes<br/><span className="text-[16px] text-neutral-500 font-bold block mt-1">(어떤 효과가 나는가)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.8] space-y-3 relative z-10 flex-1">
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 실행이 가져올 실질적인 정책 효과와 성과 논리를 수치화하여 정리</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 국정감사·업무보고·실무 브리핑에 그대로 복사해 인용 가능한 근거 제공</li>
                <li className="flex items-start gap-2"><span className="text-brand-500 font-bold mt-0.5">•</span> 리스크 방어 논리와 KPI 설정 가이드라인 지향</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section D: 3대 편집 원칙 (3 Pillars) */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug">
              문강이 지키는 3대 편집 원칙
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-surface-page rounded-[20px] p-8 shadow-sm flex flex-col h-full border border-line-soft">
              <div className="w-12 h-12 rounded-xl bg-white border border-line-default flex justify-center items-center shadow-sm mb-6">
                <Target className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-[20px] font-extrabold text-neutral-900 mb-4">Pillar 1. 국가 전략 설계<br/><span className="text-[15px] text-neutral-500 font-medium">(Policy Design)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.7] space-y-2 mb-8 flex-1">
                <li>• 문화를 단순한 향유가 아닌 국가 생존 전략으로 정의</li>
                <li>• 수동적 해설이 아닌 능동적 문화 아젠다 선제 제시</li>
                <li>• 대안 3안 + 로드맵 + 추계를 더한 “Why this matters” 강제 적용</li>
              </ul>
              <div className="mt-auto px-4 py-3 bg-brand-50 border border-brand-100 rounded-lg">
                <p className="text-[13px] font-bold text-brand-800"><span className="text-brand-500 mr-2">➜</span>대표 산출물 : Policy Insight / Brief</p>
              </div>
            </div>

            <div className="bg-surface-page rounded-[20px] p-8 shadow-sm flex flex-col h-full border border-line-soft">
              <div className="w-12 h-12 rounded-xl bg-white border border-line-default flex justify-center items-center shadow-sm mb-6">
                <Map className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-[20px] font-extrabold text-neutral-900 mb-4">Pillar 2. 현장 증명 및 연결<br/><span className="text-[15px] text-neutral-500 font-medium">(Field Proof)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.7] space-y-2 mb-8 flex-1">
                <li>• 중앙 하달식 정책의 한계를 넘어선 풀뿌리 현장 증명 강화</li>
                <li>• 실제 존재/작동하는 공동체 사례의 정책 승격 가능성 분석</li>
                <li>• 현장 기획자 등 <span className="font-bold text-neutral-800">"정책은 현장에서 완성된다"</span> 철학 증명</li>
              </ul>
              <div className="mt-auto px-4 py-3 bg-brand-50 border border-brand-100 rounded-lg">
                <p className="text-[13px] font-bold text-brand-800"><span className="text-brand-500 mr-2">➜</span>대표 산출물 : 사례 / 인터뷰 / 순회토론회 기록</p>
              </div>
            </div>

            <div className="bg-surface-page rounded-[20px] p-8 shadow-sm flex flex-col h-full border border-line-soft">
              <div className="w-12 h-12 rounded-xl bg-white border border-line-default flex justify-center items-center shadow-sm mb-6">
                <ScrollText className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-[20px] font-extrabold text-neutral-900 mb-4">Pillar 3. 읽히는 실용성<br/><span className="text-[15px] text-neutral-500 font-medium">(Readable Utility)</span></h3>
              <ul className="text-[15px] text-neutral-600 leading-[1.7] space-y-2 mb-8 flex-1">
                <li>• 어렵고 지루한 학술적 분석보다 바쁜 실무자의 즉시 활용성 우선</li>
                <li>• 반드시 핵심 요약이 반영된 직관적인 원페이지 구조 동반 제공</li>
                <li>• 지원사업별 캘린더 등 파편화된 행정적 맥락의 데이터 연동</li>
              </ul>
              <div className="mt-auto px-4 py-3 bg-brand-50 border border-brand-100 rounded-lg">
                <p className="text-[13px] font-bold text-brand-800"><span className="text-brand-500 mr-2">➜</span>대표 산출물 : Data Lab / Calendar / Newsletter</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section E: 6개 콘텐츠 섹션 (Sections) */}
      {/* ---------------------------------------------------- */}
      <section id="sections" className="w-full py-24 bg-surface-page border-t border-line-default scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-12">
            <div>
              <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">카테고리 아키텍처</span>
              <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug">
                문강의 6개 콘텐츠 섹션
              </h2>
            </div>
            <Link href="/webzine/stories" className="px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-bold border border-line-strong hover:bg-neutral-50 transition-colors shadow-sm text-sm shrink-0">
               최신 콘텐츠 전체 보기
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <BookOpen className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">1. Policy Insight</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                가장 무겁고 중요한 섹션입니다. 문화강국 3대 핵심 아젠다와 치밀한 정책 설계(RIO) 및 제안 패키지를 제시하는 기획/해설 칼럼입니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <TrendingUp className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">2. Culture Power Report</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                국회/지자체 토론회, 입법 동향, 그리고 치열한 공론장 현장의 파편화된 기록들을 하나의 정제된 고품질 리포트 형식으로 요약·기록합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <Compass className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">3. 지역이 문화가 되다</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                지방 소멸의 해법을 지역문화 혁신 사례와 문화자치 실험에서 찾으며, 이들의 성과를 전국적인 표준 정책으로 복제 및 승격화하는 진단 섹션입니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <User className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">4. Culture People</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                진짜 정책은 사람 안에서 완성됨을 조명합니다. 기획자·예술가·현장 실무자의 치열한 증언을 인터뷰하여 정책의 빈틈과 가능성을 발굴합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <Globe2 className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">5. Global & Trend</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                생성형 AI의 충격, K-컬처 글로벌 확장 이슈, 주요국의 해외 선진 문화정책 동향 변화를 짧고 명확하고 트렌디하게 브리핑하는 데스크입니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] border border-line-default shadow-sm hover:border-brand-300 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <Calendar className="w-5 h-5 text-neutral-600 group-hover:text-brand-600" />
                </div>
                <h3 className="text-[17px] font-bold text-neutral-900">6. 지원사업 캘린더</h3>
              </div>
              <p className="text-[14.5px] text-neutral-600 leading-[1.6]">
                단순 달력 제공이 아니라 쏟아지는 관 주도 공모사업 및 지원사업 정보들을 창작자 생애주기와 타깃 유형별로 큐레이션하여 적시 배포하는 실무 섹션입니다.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section F: Data Lab */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-white border-t border-line-default">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-brand-50 p-8 md:p-12 rounded-[32px] border border-brand-100 shadow-sm flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-line-soft">
                 <Database className="w-8 h-8 text-brand-600" />
              </div>
              <h2 className="text-[28px] md:text-[32px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-4">
                Data Lab :<br />
                인용 가능한 데이터 레이어
              </h2>
              <p className="text-[16px] text-neutral-700 leading-[1.7] font-medium mb-6">
                문강 RIO는 긴 글의 기사와 해설만 묶어놓은 문집이 아닙니다.<br className="hidden lg:block"/>
                <strong className="text-brand-800">국회 정책 브리핑, 지자체 행정 보고서, 학계 논문 검토에 즉각적으로 복사&붙여넣기 할 수 있는 데이터 중심의 산출물을 함께 제공합니다.</strong>
              </p>
              <ul className="text-[15px] font-bold text-neutral-800 space-y-3">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>주요 지표 타일맵카드</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>공공 개방형 정책 관련 통계/로데이터 다운로드 제공</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>간단하고 직관적인 차트와 해석 본문 동반 배치</li>
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full h-full relative min-h-[300px] flex items-center justify-center">
               <div className="absolute inset-0 bg-white/60 rounded-3xl border border-white backdrop-blur-sm shadow-md flex items-center justify-center flex-col gap-4 p-8">
                  <Grid className="w-16 h-16 text-brand-300 opacity-50" />
                  <p className="text-neutral-500 font-bold tracking-widest uppercase text-sm">Data Dashboard Visualization Area</p>
                  <p className="text-neutral-400 text-xs text-center">웹진 각 아티클/인포그래픽에 삽입될 데이터랩 시각화 블록 구조 모식도</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section G: Delivery Strategy */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-surface-page border-y border-line-default">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">배포와 확산 전략</span>
          <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-6">
            문강은 어떻게 읽히고 확산되는가
          </h2>
          <p className="text-[17px] text-neutral-600 leading-[1.7] max-w-3xl mx-auto mb-16">
            문강은 단순히 URL을 찍어 보내고 누군가 들어오길 기다리는 "평범한 웹사이트"가 아닙니다. 
            상시 접근을 위한 웹 아카이브와 직접 찾아가는 PDF 브리핑, 능동적인 뉴스레터를 입체적으로 결합한 <strong>하이브리드 유통망</strong>을 가동합니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm flex flex-col items-center">
               <Globe2 className="w-8 h-8 text-neutral-400 mb-4" />
               <span className="font-bold text-[15px] text-neutral-900 mb-2 whitespace-nowrap">Online Web</span>
               <span className="text-xs text-neutral-500">검색·아카이브 기반의<br/>누적 정보 지식망 구축</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm flex flex-col items-center">
               <Share2 className="w-8 h-8 text-neutral-400 mb-4" />
               <span className="font-bold text-[15px] text-neutral-900 mb-2 whitespace-nowrap">Offline Direct</span>
               <span className="text-xs text-neutral-500">PDF 브리핑 출력물<br/>국회·지자체 직접 배포</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm flex flex-col items-center">
               <ScrollText className="w-8 h-8 text-brand-500 mb-4" />
               <span className="font-bold text-[15px] text-brand-800 mb-2 whitespace-nowrap">Citable Source</span>
               <span className="text-xs text-neutral-500">국정감사 / 업무보고 등<br/>각종 검토문서 즉시 인용</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm flex flex-col items-center">
               <Network className="w-8 h-8 text-neutral-400 mb-4" />
               <span className="font-bold text-[15px] text-neutral-900 mb-2 whitespace-nowrap">Community</span>
               <span className="text-xs text-neutral-500">독자 커뮤니티 정책 제안 및<br/>양방향 여론 수렴 피드백</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-line-strong shadow-sm flex flex-col items-center col-span-2 md:col-span-1">
               <BookOpen className="w-8 h-8 text-neutral-400 mb-4" />
               <span className="font-bold text-[15px] text-neutral-900 mb-2 whitespace-nowrap">Utility Toolkit</span>
               <span className="text-xs text-neutral-500">원페이지 브리핑 및 카운트업<br/>큐레이션 캘린더 지급</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section H: 뉴스레터 */}
      {/* ---------------------------------------------------- */}
      <section id="newsletter" className="w-full py-24 bg-brand-900 text-white scroll-mt-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 p-8 md:p-12 rounded-[32px] border border-white/10">
            <div className="md:w-1/2 flex flex-col gap-6">
              <Mail className="w-12 h-12 text-white/80" />
              <h2 className="text-[32px] md:text-[36px] font-extrabold tracking-tight leading-snug text-balance">
                문강 RIO 뉴스레터
              </h2>
              <p className="text-[16px] text-white/80 leading-[1.8] font-medium text-balance">
                매월 첫째 주, <strong>“한 장 요약 + 캘린더”</strong>를 중심으로 핵심 정책 이슈와 중요 지원사업 정보를 가장 짧고 구조적인 이메일로 정리해 당신의 책상으로 전달합니다.
              </p>
              <div className="bg-black/30 w-max px-4 py-2 rounded-lg border border-white/10 mt-2">
                 <p className="text-xs font-bold text-white/60 italic">“이런 분께 추천합니다”</p>
                 <p className="text-sm font-medium text-white/90 mt-1">정책 동향을 10분 만에 훑고 본인의 문서에 인용하려는 실무자</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <button className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold hover:bg-neutral-100 transition-colors shadow-sm text-sm">
                  뉴스레터 구독하기
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-bold hover:bg-white/20 transition-colors shadow-sm text-sm">
                  최근 발행본 보기
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full">
               <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-2xl p-6 relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10 text-neutral-900">
                  <div className="h-4 w-1/3 bg-neutral-200 rounded-full mb-8"></div>
                  <div className="h-10 w-3/4 bg-brand-900 rounded-lg mb-4"></div>
                  <div className="h-6 w-full bg-neutral-100 rounded-md mb-2"></div>
                  <div className="h-6 w-5/6 bg-neutral-100 rounded-md mb-8"></div>
                  
                  <div className="w-full h-32 bg-brand-50 border border-brand-100 rounded-xl mb-4 flex items-center justify-center flex-col">
                     <span className="font-bold text-brand-700 text-lg mb-1">One-Pager Brief (이달의 한장)</span>
                     <span className="text-xs text-brand-500">다운로드 후 즉시 출력 가능 구조</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto">
                     <div className="h-20 bg-neutral-50 rounded-lg border border-line-soft"></div>
                     <div className="h-20 bg-neutral-50 rounded-lg border border-line-soft"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section I: 활용 대상 (Target Audience) */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-surface-page">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-4 text-balance">
            문강은 누구를 위한 웹진인가
          </h2>
          <p className="text-[17px] text-neutral-500 leading-[1.7] max-w-3xl mx-auto mb-16 text-balance">
            문강 RIO는 그저 "읽는 일반 사람"만을 위한 매거진이 아니라, 지금 당장의 문화 현장을 바꾸기 위해<br className="hidden md:block"/> 
            <strong className="text-brand-700">바로 참고하고, 즉시 브리핑하고, 곧바로 제안해야 하는 실행자들</strong>을 위한 강력한 무기입니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto mb-12">
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">🏛 국회 문화체육관광 분야 보좌진</span>
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">🏢 중앙부처 및 지자체 소속 문화행정 실무자</span>
            <span className="px-6 py-3 bg-white border-2 border-brand-200 rounded-full text-[15px] font-extrabold text-brand-800 bg-brand-50 shadow-sm cursor-default">📊 핵심 문화정책 및 데이터 연구자</span>
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">🌾 지역문화 융성 로컬 크리에이터 기획자</span>
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">🎨 생태계의 최전선 예술가 및 현장 활동가</span>
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">📈 문화산업 생태계 파트너 관계자</span>
            <span className="px-6 py-3 bg-white border-2 border-line-strong rounded-full text-[15px] font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700 shadow-sm cursor-default">👀 고밀도 문화정책 담론에 관심 있는 시민·독자</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section J: 문강의 토픽 구조 및 최종 문안 */}
      {/* ---------------------------------------------------- */}
      <section className="w-full pt-24 pb-12 bg-white border-t border-line-strong">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
             <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">근본적 질문 계층도</span>
             <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-4">
               문강은 어떤 질문을 다루는가
             </h2>
             <p className="text-[17px] text-neutral-600 leading-[1.7] max-w-2xl mx-auto">
               포맷과 별개로 콘텐츠를 꿰뚫는 근본적인 6대 토픽과 3대 주요 아젠다를 바탕으로, 지식이 Search / Archive / Related 연결망으로 강력하게 응집됩니다.
             </p>
          </div>

          <div className="bg-surface-page p-8 md:p-12 rounded-3xl border border-line-default shadow-sm mb-16">
             <h3 className="font-bold text-[18px] text-neutral-900 mb-6 border-b border-line-strong pb-4">6대 최상위 토픽 대분류 체계</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-10">
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2"></div>
                   <span className="font-extrabold text-[15px] text-neutral-900">문화강국 전략</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2"></div>
                   <span className="font-extrabold text-[15px] text-neutral-900">문화정책 구조개혁</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-brand-500 mb-2 shadow-[0_0_8px_rgba(34,184,199,0.5)]"></div>
                   <span className="font-extrabold text-[15px] text-brand-700">지역문화와 문화자치</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2"></div>
                   <span className="font-extrabold text-[15px] text-neutral-900">문화산업과 기술 전환</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2"></div>
                   <span className="font-extrabold text-[15px] text-neutral-900">사람과 현장</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2"></div>
                   <span className="font-extrabold text-[15px] text-neutral-900">실무 도구와 기회</span>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-500"></div>
                <h4 className="font-bold text-[15px] text-brand-700 mb-3">현재 집중 관측 중인 3대 핵심 아젠다</h4>
                <ul className="text-[15px] font-bold text-neutral-800 space-y-2 ml-4">
                   <li className="list-disc text-brand-300"><span className="text-neutral-900">지역이 스스로 설계하고 책임지는 자율적 문화정책 구조</span></li>
                   <li className="list-disc text-brand-300"><span className="text-neutral-900">지방 문화재정의 분권화 및 자율성 보장 시스템 확립</span></li>
                   <li className="list-disc text-brand-300"><span className="text-neutral-900">문화예술인들이 지속가능하게 작업할 수 있는 보호 생태계 구축</span></li>
                </ul>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center pt-8 border-t border-line-soft">
             <blockquote className="text-center mb-10 max-w-2xl">
               <span className="text-4xl text-brand-200 block mb-2 leading-none">"</span>
               <p className="text-[20px] md:text-[22px] leading-relaxed text-neutral-800 font-extrabold break-keep text-balance">
                 질문이 많을수록 문화도 성장합니다.<br />
                 문강 RIO는 좋은 질문을 찾고, 그 질문에 대한<br />가장 정확한 해설과 대안을 구조화해 전달합니다.
               </p>
               <cite className="block mt-6 text-[15px] font-bold text-neutral-500 not-italic">— 제1대 편집장 김문강</cite>
             </blockquote>
             
             <div className="bg-brand-50 w-full max-w-2xl rounded-[24px] p-8 md:p-10 border border-brand-100 flex flex-col items-center text-center">
                <h3 className="text-[24px] font-extrabold text-brand-900 mb-6 tracking-tight">문강 RIO를 시작해보세요</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/webzine/stories" className="px-6 py-3 rounded-xl bg-brand-900 text-white font-bold hover:bg-brand-800 transition-colors shadow-sm focus:ring-4 ring-brand-200">
                    최신 콘텐츠 둘러보기
                  </Link>
                  <a href="#sections" className="px-6 py-3 rounded-xl bg-white text-brand-800 font-bold border border-brand-200 hover:bg-brand-100 transition-colors shadow-sm focus:ring-4 ring-brand-100">
                    6개 섹션 전체 목록
                  </a>
                </div>
             </div>
          </div>
          
        </div>
      </section>
      
    </div>
  )
}
