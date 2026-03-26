import { Search } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Link from "next/link"

export function HeroSearch() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-16 md:py-24 max-w-[800px] mx-auto px-4">
      {/* Eyebrow */}
      <div className="mb-6">
        <Chip variant="primary">공식 질문형 문화 플랫폼</Chip>
      </div>
      
      {/* Title */}
      <h1 className="text-h2 md:text-h1 text-brand-900 mb-6 tracking-tight text-balance">
        당신의 질문이 <br className="md:hidden" />
        문화강국의 답이 됩니다
      </h1>
      
      <p className="text-body-lg text-neutral-600 mb-10 max-w-[600px] text-balance">
        K-문명이란 무엇인가, 지역문화는 어떻게 자립하는가. 파편화된 정보를 모아 검증된 하나의 정답(Media SSoT)으로 정리합니다.
      </p>
      
      {/* Search Bar */}
      <form action="/search" className="w-full max-w-[640px] relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-brand-700" />
        </div>
        <input 
          type="text" 
          name="q"
          placeholder="궁금한 문화강국 정책이나 키워드를 질문해 보세요" 
          className="w-full h-[56px] pl-12 pr-4 bg-white border border-line-strong rounded-xl text-body shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-all placeholder:text-neutral-400"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button type="submit" className="bg-brand-900 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-brand-800 transition-colors">
            찾기
          </button>
        </div>
      </form>
      
      {/* Quick Suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-caption mr-2 font-medium">많이 찾는 질문 :</span>
        <Link href="/search?q=K건축" className="text-caption text-brand-700 bg-brand-050 hover:bg-brand-100 px-3 py-1 rounded-full transition-colors">#K건축</Link>
        <Link href="/search?q=문화예산" className="text-caption text-brand-700 bg-brand-050 hover:bg-brand-100 px-3 py-1 rounded-full transition-colors">#문화예산</Link>
        <Link href="/search?q=K-문명 사례" className="text-caption text-brand-700 bg-brand-050 hover:bg-brand-100 px-3 py-1 rounded-full transition-colors">#K-문명 사례</Link>
      </div>
    </section>
  )
}
