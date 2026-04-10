import { 
  Building2, 
  MessageCircle, 
  Globe2, 
  Target, 
  BookOpen, 
  Mic2, 
  Sparkles, 
  User, 
  Compass, 
  ScrollText, 
  Map, 
  Library, 
  TrendingUp, 
  Calendar, 
  HeartHandshake
} from "lucide-react"
import Link from "next/link"

export default function NetworkIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen selection:bg-brand-200 font-sans pb-24">
      {/* ---------------------------------------------------- */}
      {/* Section 1: Hero */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full overflow-hidden pt-32 pb-32 px-4 flex items-center justify-center min-h-[700px] border-b border-neutral-900" 
               style={{ backgroundImage: "url('/images/network_hero_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface-page to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-[2px] z-10 mix-blend-multiply pointer-events-none"></div>
        
        <div className="container relative z-20 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-1" /> {/* Spacer for centering */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left drop-shadow-xl p-8 rounded-[32px]">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-extrabold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                사단법인 소개
              </span>
              <h1 className="text-[48px] md:text-[64px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-brand-300 tracking-tight leading-[1.05] mb-8">
                지역에서 세계로,<br />
                문화강국 대한민국
              </h1>
              <p className="text-[18px] md:text-[20px] text-white/90 leading-[1.75] max-w-2xl font-medium mb-12 text-balance drop-shadow-2xl">
                문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크입니다. 연구와 공론장, 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여합니다.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#purpose" className="px-6 py-4 rounded-2xl bg-gradient-to-r from-white to-white/90 text-brand-900 font-extrabold hover:bg-neutral-100 transition-all shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 text-[16px] flex items-center gap-2 border border-white/50">
                  설립 목적 보기
                </a>
                <a href="#vision" className="group px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 text-[16px] flex items-center gap-2">
                  비전과 미션 보기 <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a href="#history" className="px-6 py-4 rounded-2xl bg-transparent text-white/80 font-bold hover:text-white transition-colors text-[16px] flex items-center gap-2 underline underline-offset-4 decoration-white/30 hover:decoration-white">
                  연혁 보기
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-4 h-full flex flex-col justify-center hidden lg:flex">
              <div className="grid grid-cols-2 gap-5 relative group">
                {/* Back glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-400/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-400/30 transition-colors duration-700"></div>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col items-center lg:items-start text-center lg:text-left hover:border-brand-300/30 transition-colors transform hover:-translate-y-1 duration-300 relative z-10">
                  <span className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80 mb-2 block drop-shadow-md tracking-tight">2025.03</span>
                  <span className="text-brand-300 font-extrabold text-[15px] tracking-wide">법인 등록 완료</span>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col items-center lg:items-start text-center lg:text-left hover:border-brand-300/30 transition-colors transform hover:-translate-y-1 duration-300 relative z-10">
                  <span className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80 mb-2 block flex items-baseline drop-shadow-md tracking-tight">11<span className="text-[20px] font-bold ml-1 text-white/70">회</span></span>
                  <span className="text-brand-300 font-extrabold text-[15px] tracking-wide">정책토론회 시리즈</span>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col items-center lg:items-start text-center lg:text-left hover:border-brand-300/30 transition-colors transform hover:-translate-y-1 duration-300 relative z-10">
                  <span className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80 mb-2 block drop-shadow-md tracking-tight">I–IV</span>
                  <span className="text-brand-300 font-extrabold text-[15px] tracking-wide">지역문화대전환 순회</span>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col items-center lg:items-start text-center lg:text-left hover:border-brand-300/30 transition-colors transform hover:-translate-y-1 duration-300 relative z-10">
                  <span className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80 mb-2 block flex items-baseline drop-shadow-md tracking-tight">100<span className="text-[20px] font-bold ml-0.5 text-brand-400">+</span></span>
                  <span className="text-brand-300 font-extrabold text-[15px] tracking-wide">전문가 네트워킹</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 2: 설립 목적 */}
      {/* ---------------------------------------------------- */}
      <section id="purpose" className="w-full py-24 bg-surface-page scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">설립 목적</span>
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-6">
              왜 문화강국네트워크가 만들어졌는가
            </h2>
            <p className="text-[17px] text-neutral-600 leading-[1.7] max-w-[68ch]">
              대한민국의 문화정책이 중앙집중형에서 지역과 시민 중심으로 전환되는 시대 흐름 속에서, 
              문화자치와 문화분권의 실질적 실현을 목표로 2025년 3월 설립되었습니다. 
              문화정책 연구, 네트워크 구축, 국제교류를 통해 지속가능한 문화강국 실현에 기여하고자 합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-8 border border-line-default flex flex-col shadow-sm">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-700 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">문화정책 연구</h3>
              <p className="text-[15px] text-neutral-600 leading-relaxed">
                거시적이고 근본적인 국가 문화전략과 지역기반 문예진흥 정책, 창작환경 등 다양한 의제를 발굴하고 연구합니다.
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-8 border border-line-default flex flex-col shadow-sm">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-700 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">공론장 형성</h3>
              <p className="text-[15px] text-neutral-600 leading-relaxed">
                파편화된 학계와 현장의 목소리를 모아, 입법 및 행정에 반영할 수 있는 탄탄한 공론장을 상시 운영하고 단일 진실로 구축합니다.
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-8 border border-line-default flex flex-col shadow-sm">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-700 rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">국내외 문화교류</h3>
              <p className="text-[15px] text-neutral-600 leading-relaxed">
                K-컬처의 긍정적 확산과 지속가능한 글로벌 스탠다드 확립을 위하여 해외 문화기관 및 학술단체와 교류 협력을 증진합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 3: 비전과 미션 */}
      {/* ---------------------------------------------------- */}
      <section id="vision" className="w-full py-24 bg-white border-y border-line-default scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          
          <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">비전과 미션</span>
          <div className="flex flex-col lg:flex-row gap-16 lg:items-start lg:justify-between">
            <div className="lg:w-5/12">
              <h2 className="text-[40px] md:text-[48px] font-extrabold text-neutral-900 tracking-tight leading-[1.2] text-balance">
                지역에서 세계로,<br />
                <span className="text-brand-600">문화강국 대한민국</span>
              </h2>
            </div>
            
            <div className="lg:w-7/12 flex flex-col gap-4">
              <div className="bg-surface-page rounded-2xl p-6 border border-line-strong flex items-start gap-4 hover:border-brand-300 transition-colors">
                <div className="bg-white p-2.5 rounded-lg border border-line-default shadow-sm shrink-0">
                  <Target className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-neutral-900 mb-1">문화정책 공론장 조성 및 입법 지원</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">
                    단발적인 이벤트가 아니라 연속적인 집담회를 통해 법제화 가능한 실체적 대안을 만들어 냅니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-surface-page rounded-2xl p-6 border border-line-strong flex items-start gap-4 hover:border-brand-300 transition-colors">
                <div className="bg-white p-2.5 rounded-lg border border-line-default shadow-sm shrink-0">
                  <Compass className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-neutral-900 mb-1">지역문화 기반의 정책 제안 및 연구</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">
                    소멸 위기의 지역을 살리는 힘은 문화에 있습니다. 지역 고유의 자산을 기반으로 패러다임 전환을 이끕니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-surface-page rounded-2xl p-6 border border-line-strong flex items-start gap-4 hover:border-brand-300 transition-colors">
                <div className="bg-white p-2.5 rounded-lg border border-line-default shadow-sm shrink-0">
                  <Globe2 className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-neutral-900 mb-1">국내외 문화교류 네트워크 구축</h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">
                    선진 문화연대 및 글로벌 문화기구와의 직접적 소통 채널을 개설하고 민간 외교의 영역을 넓힙니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 4: 주요 활동 */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-surface-page">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">주요 활동</span>
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-6">
              무엇을 하고 있는가
            </h2>
            <p className="text-[17px] text-neutral-600 leading-[1.7] max-w-[68ch]">
              문화강국네트워크는 문화정책 연구와 공론장 형성, 지역문화대전환 순회토론회, 특별 행사와 전시, 
              국제교류 네트워크 구축을 통해 문화강국 의제를 제도와 현장에 연결합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[20px] border border-line-default shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-neutral-800" />
                <h3 className="text-[20px] font-bold text-neutral-900">정책 연구와 공론장</h3>
              </div>
              <p className="text-[15px] text-neutral-600 leading-relaxed mt-2 flex-1">
                문화정책 연구와 공론장 형성을 통해 지역과 시민 중심의 문화정책 발전에 기여합니다. 
                문화산업, 문화가치, 지속가능성, AI, 기초예술 등 주요 정책 의제를 토론회와 간담회로 다룹니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[20px] border border-line-default shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Map className="w-6 h-6 text-neutral-800" />
                <h3 className="text-[20px] font-bold text-neutral-900">지역문화대전환 순회토론회</h3>
              </div>
              <p className="text-[15px] text-neutral-600 leading-relaxed mt-2 flex-1">
                고흥, 전북, 거제, 제주 등 지역 현장을 중심으로 지역문화 생태계, 문화자치, 
                지역 정주와 콘텐츠 순환, 지역문화 진흥 과제를 논의해 왔습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[20px] border border-line-default shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-neutral-800" />
                <h3 className="text-[20px] font-bold text-neutral-900">특별 행사·전시</h3>
              </div>
              <p className="text-[15px] text-neutral-600 leading-relaxed mt-2 flex-1">
                광복 80주년 맞이 미술 전시회와 후원의 밤 등 문화적 공감과 네트워크 
                확장을 위한 특별 행사를 추진합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[20px] border border-line-default shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Globe2 className="w-6 h-6 text-neutral-800" />
                <h3 className="text-[20px] font-bold text-neutral-900">국내외 문화교류·네트워크</h3>
              </div>
              <p className="text-[15px] text-neutral-600 leading-relaxed mt-2 flex-1">
                국내외 문화교류 네트워크 구축은 협회의 핵심 미션 중 하나입니다. 구체 사례는 향후 본격적인 프로젝트 발족 후 확장하여 안내될 예정입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 5: 연혁/타임라인 */}
      {/* ---------------------------------------------------- */}
      <section id="history" className="w-full py-24 bg-white border-y border-line-default scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:items-start lg:justify-between">
            <div className="lg:w-4/12 lg:sticky top-32">
              <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block">히스토리</span>
              <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-snug mb-6">
                연혁
              </h2>
              <p className="text-[17px] text-neutral-600 leading-[1.7]">
                문화강국네트워크는 출범 준비 모임과 정기총회를 거쳐 2025년 3월 법인 등록 이후, 
                문화정책과 지역문화, AI, K-푸드, 기초예술 등 다양한 주제로 토론회와 전시, 네트워크 행사를 이어오고 있습니다.
              </p>
            </div>
            
            <div className="lg:w-7/12">
              <div className="relative border-l-[3px] border-line-strong pl-8 pb-8 space-y-12">
                
                {/* Milestone 1 */}
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2024. 05</span>
                  <p className="text-[16px] text-neutral-800 font-bold">출범 준비 모임</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2024. 08</span>
                  <p className="text-[16px] text-neutral-800 font-bold">사단법인 출범 정기총회</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-brand-500 shadow-sm border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2025. 03</span>
                  <p className="text-[16px] text-neutral-800 font-bold">관할 부처 법인 등록 완료</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2025. 03 ~ 2026. 04</span>
                  <p className="text-[16px] text-neutral-800 font-bold mb-2">정책토론회 연속 개최</p>
                  <p className="text-[14px] text-neutral-500">지역문화대전환 시리즈 및 K-컬처 심층 의제 다룸</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2025. 08</span>
                  <p className="text-[16px] text-neutral-800 font-bold mb-2">광복 80주년 미술 전시회</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2026. 01</span>
                  <p className="text-[16px] text-neutral-800 font-bold mb-2">후원의 밤</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2026. 02</span>
                  <p className="text-[16px] text-neutral-800 font-bold mb-2">K-푸드 토론회</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 w-[22px] h-[22px] rounded-full bg-line-strong border-4 border-white pointer-events-none"></div>
                  <span className="text-brand-600 font-extrabold text-[20px] mb-1 block">2026. 04</span>
                  <p className="text-[16px] text-neutral-800 font-bold mb-2">기초예술·예술인 복지 토론회</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 6: 이사장 인사말 (Placeholder) */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-surface-page">
        <div className="container mx-auto max-w-4xl px-4 text-center items-center flex flex-col">
          <div className="w-24 h-24 bg-neutral-200 border border-line-default rounded-full flex justify-center items-center mb-6 shadow-inner">
             <User className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-[28px] md:text-[32px] font-extrabold text-neutral-900 mb-2 tracking-tight">
            이우종 이사장 인사말
          </h2>
          <p className="text-[15px] font-bold text-neutral-500 mb-8">
            사단법인 문화강국네트워크 초대 이사장
          </p>
          <div className="max-w-[600px] mx-auto bg-white p-6 rounded-2xl border border-line-default shadow-sm border-dashed">
            <p className="text-[15px] text-neutral-500 leading-relaxed italic text-balance">
              이사장 인사말 전문은 추가 자료 확보 후 반영됩니다. <br className="hidden md:block"/>
              현재 페이지 구조 확립을 위한 안내 블록입니다.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 7: 문강 RIO 연결 블록 */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-brand-50 border-y border-brand-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-brand-600 text-[13px] font-bold tracking-widest uppercase mb-3 block flex items-center gap-2">
                <Library className="w-4 h-4" /> 서브 허브 플랫폼 연결
              </span>
              <h2 className="text-[32px] md:text-[36px] font-extrabold text-brand-900 tracking-tight leading-snug mb-6 text-balance">
                문강 RIO:<br className="hidden lg:block"/> 국가 문화전략 플랫폼
              </h2>
              <p className="text-[17px] text-brand-800/80 leading-[1.7] max-w-[68ch] mb-8">
                문강 文江 RIO는 문화강국 의제를 정책 설계, 현장 증명, 실용 도구의 구조로 번역하는 국가 문화전략 웹진입니다. 
                단순한 소식이 아니라 기사, 리포트, 원페이저, 데이터로 배포되는 <strong>정책형 Media SSoT 서브 허브</strong>의 역할을 수행합니다.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/webzine/about" className="px-5 py-2.5 rounded-lg bg-brand-900 text-white font-bold hover:bg-brand-800 transition-colors shadow-sm text-sm flex items-center gap-2">
                  문강 RIO 소개 보기
                </Link>
                <Link href="/webzine/stories" className="px-5 py-2.5 rounded-lg bg-white text-brand-800 border-2 border-brand-200 font-bold hover:bg-brand-50 hover:border-brand-300 transition-colors shadow-sm text-sm">
                  최신 아카이브 보기
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <div className="bg-white rounded-[24px] p-8 border border-brand-100 shadow-md">
                <h3 className="font-bold text-brand-900 text-[15px] mb-6 flex items-center gap-2 border-b border-brand-50 pb-3">주제별 포맷 제공 내역</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-line-soft">
                    <ScrollText className="w-5 h-5 text-brand-500" />
                    <span className="font-bold text-[14px] text-neutral-800">Policy Insight</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-line-soft">
                    <TrendingUp className="w-5 h-5 text-brand-500" />
                    <span className="font-bold text-[14px] text-neutral-800">Culture Power Report</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-line-soft">
                    <Map className="w-5 h-5 text-brand-500" />
                    <span className="font-bold text-[14px] text-neutral-800">지역이 문화가 되다</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-line-soft">
                    <User className="w-5 h-5 text-brand-500" />
                    <span className="font-bold text-[14px] text-neutral-800">Culture People</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-line-soft">
                    <Globe2 className="w-5 h-5 text-brand-500" />
                    <span className="font-bold text-[14px] text-neutral-800">Global & Trend</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl border border-brand-200">
                    <Calendar className="w-5 h-5 text-brand-600" />
                    <span className="font-bold text-[14px] text-brand-800">지원사업 캘린더</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Section 8: 후원 CTA */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex justify-center items-center mx-auto mb-6">
            <HeartHandshake className="w-8 h-8 text-neutral-600" />
          </div>
          <h2 className="text-[32px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight leading-loose mb-4 text-balance">
            후원으로 함께 만드는 <span className="text-brand-600">문화강국</span>
          </h2>
          <p className="text-[17px] text-neutral-600 leading-[1.7] max-w-2xl mx-auto mb-8 text-balance font-medium mt-2">
            문화강국네트워크는 문화정책 연구, 웹진 발간, 토론회 개최, 문화교류 활동 등을 추진하고 있습니다. 
            여러분의 후원은 이러한 활동이 지속적으로 이어질 수 있는 중요한 기반이 됩니다. 후원을 통해 문화정책 발전과 문화강국 대한민국을 만들어가는 여정에 함께해 주시기 바랍니다.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors shadow-sm text-sm w-full md:w-auto">
              후원 취지 보기
            </button>
            <button className="px-6 py-3 rounded-xl bg-white text-neutral-800 border border-line-strong font-bold hover:bg-neutral-50 transition-colors shadow-sm text-sm w-full md:w-auto">
              후원자 혜택 보기
            </button>
            <button className="px-6 py-3 rounded-xl bg-white text-neutral-800 border border-line-strong font-bold hover:bg-neutral-50 transition-colors shadow-sm text-sm w-full md:w-auto flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> 후원 문의하기
            </button>
          </div>
          
          <p className="text-[13px] text-neutral-400 mt-8 italic">
            구체 후원 방식과 절차는 별도 안내 예정입니다. 
          </p>
        </div>
      </section>
      
    </div>
  )
}
