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
            <span className="inline-block px-3 py-1 bg-white/10 text-brand-300 font-bold text-xs uppercase tracking-wider rounded-full border border-white/10">
              {isTopicView ? "Topic Focus" : "Section"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            {topic ? topic.name : defaultTitle}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl text-balance">
            {topic?.description || defaultDescription}
          </p>
        </div>

        {/* Right: Featured Hook (Hero Item) */}
        {heroItem && (
          <div className="flex-1 w-full max-w-xl">
            <Link 
              href={`/${heroItem.type}/${heroItem.id}`}
              className="group block w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:bg-white/10 hover:border-brand-500/50 transition-all shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 blur-3xl rounded-full group-hover:bg-brand-500/30 transition-colors"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="text-brand-300 font-bold text-xs uppercase tracking-wider">Editor's Pick</span>
                {heroItem.tagName && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="text-white/60 text-xs font-medium">{heroItem.tagName}</span>
                  </>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-brand-300 transition-colors">
                {heroItem.title}
              </h3>
              
              <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed mb-6">
                {heroItem.summary || "이 콘텐츠의 핵심 요약을 읽어보세요."}
              </p>
              
              <div className="flex items-center text-brand-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                더 깊게 알아보기 <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
