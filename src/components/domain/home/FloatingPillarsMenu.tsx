"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Combine, Zap, CheckCircle2 } from "lucide-react"

export function FloatingPillarsMenu() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // SSR 방지 ( hydration mismatch 방지 )
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0)
    // 3초 후 자동으로 한번 열어서 힌트 제공
    const timer = setTimeout(() => setIsOpen(true), 1500)
    const timerClose = setTimeout(() => setIsOpen(false), 5000)
    return () => {
      clearTimeout(timer)
      clearTimeout(timerClose)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div 
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-3 pointer-events-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 3 Pillars 메인 트리거 버블 */}
      <div className="pointer-events-auto bg-neutral-900/80 backdrop-blur-md border border-white/10 p-1 rounded-full shadow-2xl flex flex-col gap-2 items-center w-14 group transition-all duration-300 hover:bg-neutral-900/95 overflow-hidden">
        
        {/* Title / Indicator */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-700/50 border border-brand-400/30 text-white font-black text-xs flex-col leading-none tracking-tighter shadow-[0_0_15px_rgba(36,92,147,0.5)]">
          <span className="text-[10px] text-brand-200 uppercase mb-0.5">Core</span>
          3P
        </div>

        {/* Pillar Items */}
        <div className="flex flex-col gap-2 pb-2">
          
          {/* Pillar 1: Reform */}
          <Link 
            href="/pillars/reform"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:bg-brand-600 hover:border-brand-400 transition-all group/item"
          >
            <span className="font-bold text-white text-sm">R</span>
            
            {/* Tooltip (Slide Out) */}
            <div className={`absolute right-full mr-4 bg-brand-900/90 backdrop-blur-md border border-brand-500/30 text-white px-4 py-2 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2 transition-all duration-300 origin-right ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4 pointer-events-none'}`}>
              <Zap className="w-4 h-4 text-brand-400" />
              <div className="flex flex-col">
                <span className="text-xs text-brand-300 font-bold uppercase tracking-wider mb-0.5">Pillar 1</span>
                <span className="text-sm font-bold tracking-tight">Reform (체질/관행 개선)</span>
              </div>
            </div>
          </Link>

          {/* Pillar 2: Implementation */}
          <Link 
            href="/pillars/implementation"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:bg-brand-600 hover:border-brand-400 transition-all group/item"
          >
            <span className="font-bold text-white text-sm">I</span>
            
            {/* Tooltip (Slide Out) */}
            <div className={`absolute right-full mr-4 bg-brand-900/90 backdrop-blur-md border border-brand-500/30 text-white px-4 py-2 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2 transition-all duration-300 origin-right delay-75 ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4 pointer-events-none'}`}>
              <Combine className="w-4 h-4 text-brand-400" />
              <div className="flex flex-col">
                <span className="text-xs text-brand-300 font-bold uppercase tracking-wider mb-0.5">Pillar 2</span>
                <span className="text-sm font-bold tracking-tight">Implementation (실행/공유)</span>
              </div>
            </div>
          </Link>

          {/* Pillar 3: Outcomes */}
          <Link 
            href="/pillars/outcomes"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:bg-brand-600 hover:border-brand-400 transition-all group/item"
          >
            <span className="font-bold text-white text-sm">O</span>
            
            {/* Tooltip (Slide Out) */}
            <div className={`absolute right-full mr-4 bg-brand-900/90 backdrop-blur-md border border-brand-500/30 text-white px-4 py-2 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2 transition-all duration-300 origin-right delay-150 ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4 pointer-events-none'}`}>
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <div className="flex flex-col">
                <span className="text-xs text-brand-300 font-bold uppercase tracking-wider mb-0.5">Pillar 3</span>
                <span className="text-sm font-bold tracking-tight">Outcomes (성과/결과)</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
