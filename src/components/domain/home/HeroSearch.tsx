import { Search, ArrowRight, Library, Building2, HeartHandshake } from "lucide-react"
import Link from "next/link"

export function HeroSearch() {
  return (
    <div className="w-full relative flex flex-col">
      {/* Premium Visual Hero Section */}
      <section 
        className="relative w-full flex flex-col items-center justify-center text-center pt-32 pb-40 px-4 overflow-hidden min-h-[720px]"
        style={{ backgroundImage: "url('/images/home_hero_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dynamic Overlays for contrast */}
        <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-[2px] z-0 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        
        <div className="relative z-20 w-full max-w-[900px] mx-auto flex flex-col items-center -mt-10">
          {/* Eyebrow */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-extrabold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              공식 문화정책 네트워크
            </span>
            <span className="px-5 py-2 rounded-full bg-brand-500/30 backdrop-blur-md border border-brand-400/30 text-white text-[13px] font-extrabold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              국가 문화전략 플랫폼
            </span>
          </div>
          
          {/* Title (Semantic H1 Intact) */}
          <h1 className="text-[44px] md:text-[60px] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 mb-6 tracking-tight text-balance font-black leading-[1.1] drop-shadow-xl">
            지역에서 세계로, <br className="md:hidden" />
            문화강국 대한민국
          </h1>
          
          <p className="text-[17px] md:text-[19px] text-white/90 mb-12 max-w-[760px] text-balance font-medium leading-[1.7] drop-shadow-md">
            사단법인 문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크입니다. 문화정책 연구와 공론장 형성, 국내외 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여하며, 지속가능한 문화강국 대한민국을 만들어갑니다.
          </p>
          
          {/* Search Bar (AEO entry) */}
          <form action="/answers" className="w-full max-w-[720px] relative mb-10 group">
            <div className="absolute inset-0 bg-brand-400/20 blur-[30px] rounded-full transition-all group-hover:bg-brand-400/40 z-0"></div>
            <div className="relative z-10 flex w-full">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-brand-600" />
              </div>
              <input 
                type="text" 
                name="topic"
                placeholder="궁금한 문화정책 의제나 문강 RIO 지식을 검색해 보세요" 
                className="w-full h-[76px] pl-16 pr-[140px] bg-white/95 backdrop-blur-md border-2 border-white/50 rounded-2xl text-[17px] shadow-[0_16px_40px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-4 focus:ring-brand-400/50 focus:border-white transition-all placeholder:text-neutral-400 font-extrabold text-neutral-900"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button type="submit" className="bg-brand-900 text-white text-[16px] font-bold px-7 py-4 rounded-xl hover:bg-brand-800 transition-transform active:scale-95 shadow-lg flex items-center gap-2">
                  AEO 검색 <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
          
          {/* Quick Suggestions - Glass chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[14px] mr-2 font-black text-white/80 hidden md:inline-block drop-shadow-sm">추천 키워드:</span>
            <Link href="/answers?topic=cultural-power-strategy" className="flex items-center text-[13px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
               문화강국이란 무엇인가
            </Link>
            <Link href="/answers?topic=local-culture-autonomy" className="flex items-center text-[13px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
               지역문화대전환은 무엇인가
            </Link>
            <Link href="/answers?topic=k-civilization-cultural-philosophy" className="flex items-center text-[13px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
               K-문명이란 무엇인가
            </Link>
            <Link href="/answers?topic=cultural-policy-governance" className="flex items-center text-[13px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
               문화정책 구조개혁은 왜 필요한가
            </Link>
          </div>
        </div>
      </section>

      {/* Hero CTA Block - Overlapping the gradient fade */}
      <div className="relative z-20 w-full max-w-[900px] mx-auto px-4 -mt-16 mb-8 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-line-soft">
          <Link href="/network" className="w-full md:w-auto flex-1 text-center font-bold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-line-default px-6 py-4 rounded-xl transition-colors flex justify-center gap-2 items-center text-[15px]">
            <Building2 className="w-5 h-5 text-neutral-500" /> 협회 소개 보기
          </Link>
          <Link href="/webzine/stories" className="w-full md:w-auto flex-1 text-center font-extrabold bg-brand-50 text-brand-800 hover:bg-brand-100 border border-brand-100 px-6 py-4 rounded-xl transition-colors flex justify-center gap-2 items-center text-[15px]">
            <Library className="w-5 h-5 text-brand-600" /> 문강 RIO 바로가기
          </Link>
          <Link href="/join/about" className="w-full md:w-auto flex-1 text-center font-bold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-line-default px-6 py-4 rounded-xl transition-colors flex justify-center gap-2 items-center text-[15px]">
            <HeartHandshake className="w-5 h-5 text-neutral-500" /> 후원 안내 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
