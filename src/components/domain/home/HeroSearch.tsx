import { Search, ArrowRight } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Link from "next/link"

export function HeroSearch() {
  return (
    <section className="w-full flex md:pt-12 flex-col items-center justify-center text-center py-16 md:py-24 max-w-[900px] mx-auto px-4">
      {/* Eyebrow */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <Chip variant="primary">공식 문화정책 네트워크</Chip>
        <Chip variant="default">국가 문화전략 플랫폼</Chip>
      </div>
      
      {/* Title */}
      <h1 className="text-h2 md:text-h1 text-brand-900 mb-6 tracking-tight text-balance font-extrabold leading-tight">
        지역에서 세계로, <br className="md:hidden" />
        문화강국 대한민국
      </h1>
      
      <p className="text-body-lg text-neutral-600 mb-10 max-w-[700px] text-balance">
        사단법인 문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크입니다. 문화정책 연구와 공론장 형성, 국내외 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여하며, 지속가능한 문화강국 대한민국을 만들어갑니다.
      </p>
      
      {/* Search Bar */}
      <form action="/search" className="w-full max-w-[640px] relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-brand-700" />
        </div>
        <input 
          type="text" 
          name="q"
          placeholder="궁금한 문화정책 의제, 지역문화 질문, 문강 콘텐츠를 검색해 보세요" 
          className="w-full h-[60px] pl-14 pr-4 bg-white border-2 border-brand-100 rounded-2xl text-[16px] shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-500 transition-all placeholder:text-neutral-400 font-medium"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button type="submit" className="bg-brand-900 text-white text-[15px] font-bold px-6 py-2.5 rounded-xl hover:bg-brand-800 transition-colors shadow-md hover:shadow-lg">
            검색
          </button>
        </div>
      </form>
      
      {/* Quick Suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        <span className="text-sm mr-2 font-bold text-neutral-500 hidden md:inline-block">추천 키워드:</span>
        <Link href="/answers?topic=cultural-power-strategy" className="flex items-center text-[13px] font-semibold text-neutral-600 bg-white border border-line-default hover:border-brand-300 hover:text-brand-700 hover:bg-brand-050 px-4 py-1.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
           문화강국이란 무엇인가
        </Link>
        <Link href="/answers?topic=local-culture-autonomy" className="flex items-center text-[13px] font-semibold text-neutral-600 bg-white border border-line-default hover:border-brand-300 hover:text-brand-700 hover:bg-brand-050 px-4 py-1.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
           지역문화대전환은 무엇인가
        </Link>
        <Link href="/answers?topic=k-civilization-cultural-philosophy" className="flex items-center text-[13px] font-semibold text-neutral-600 bg-white border border-line-default hover:border-brand-300 hover:text-brand-700 hover:bg-brand-050 px-4 py-1.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
           K-문명이란 무엇인가
        </Link>
        <Link href="/answers?topic=cultural-policy-governance" className="flex items-center text-[13px] font-semibold text-neutral-600 bg-white border border-line-default hover:border-brand-300 hover:text-brand-700 hover:bg-brand-050 px-4 py-1.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm">
           문화정책 구조개혁은 왜 필요한가
        </Link>
      </div>

      {/* Hero CTA Block */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 w-full pt-8 border-t border-line-default">
        <Link href="/network" className="text-body-sm font-bold text-neutral-900 border border-line-strong hover:bg-neutral-50 px-6 py-3 rounded-xl transition-colors flex gap-2 items-center">
          협회 소개 보기
        </Link>
        <Link href="/webzine/stories" className="text-body-sm font-bold bg-brand-50 text-brand-800 hover:bg-brand-100 hover:text-brand-900 px-6 py-3 rounded-xl transition-colors flex gap-2 items-center">
          문강 RIO 바로가기
        </Link>
        <Link href="/join/about" className="text-body-sm font-bold text-neutral-900 border border-line-strong hover:bg-neutral-50 px-6 py-3 rounded-xl transition-colors flex gap-2 items-center">
          후원 안내 보기
        </Link>
      </div>
    </section>
  )
}
