import React from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

interface DynamicSectionHeroProps {
  topic?: {
    name: string
    description: string | null
  }
  heroItem?: {
    id: string
    title: string
    summary: string | null
    type: 'answers' | 'stories' | 'events'
    tagName?: string
    href?: string
  }
  defaultTitle: string
  defaultDescription: string
}

export function DynamicSectionHero({ topic, heroItem, defaultTitle, defaultDescription }: DynamicSectionHeroProps) {
  const isTopicView = !!topic

  return (
    <section className="relative w-full bg-[#1C2127] border-b border-line-strong overflow-hidden flex flex-col items-center">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="container relative z-10 px-4 md:px-6 py-16 md:py-20 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 items-center">
        
        {/* Left: Metadata */}
        <div className="flex-1 flex flex-col text-left">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/30 shadow-sm">
              {isTopicView ? "Topic Focus" : "Section"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
            {topic ? topic.name : defaultTitle}
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-xl text-balance drop-shadow-sm font-medium">
            {topic?.description || defaultDescription}
          </p>
        </div>

        {/* Right: Featured Hook (Hero Item) */}
        {heroItem && (
          <div className="flex-1 w-full max-w-xl relative">
            <Link 
              href={heroItem.href || `/${heroItem.type}/${heroItem.id}`}
              className="group block w-full bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl hover:bg-white/20 hover:border-white/40 transition-all shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/30 blur-3xl rounded-full group-hover:bg-blue-400/40 transition-colors"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span className="text-blue-300 font-bold text-xs uppercase tracking-wider">Editor's Pick</span>
                {heroItem.tagName && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="text-white/80 text-xs font-semibold">{heroItem.tagName}</span>
                  </>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-blue-200 transition-colors drop-shadow-sm">
                {heroItem.title}
              </h3>
              
              <p className="text-neutral-300 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
                {heroItem.summary || "이 콘텐츠의 핵심 요약을 읽어보세요."}
              </p>
              
              <div className="flex items-center text-blue-300 text-sm font-bold group-hover:translate-x-1 transition-transform group-hover:text-blue-200">
                더 깊게 알아보기 <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
