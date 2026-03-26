import { Chip } from "@/components/ui/chip"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const MOCK_STORIES = [
  {
    id: "s1",
    section: "정책 하이라이트",
    type: "기획 기사",
    title: "K-건축, 전 세계가 한옥의 철학을 주목하는 이유 3가지",
    deck: "기후 변화와 거주 환경의 위기 속, 우리 고유의 방식이 어떻게 글로벌 스탠다드로 발전할 수 있는지 집중 조명합니다.",
    author: "김편집",
    date: "2026-03-22",
    href: "/webzine/stories/k-architecture-philosophy"
  },
  {
    id: "s2",
    section: "현장 인터뷰",
    type: "전문가 대담",
    title: "“예산보다 중요한 건 자생력입니다” - 로컬 크리에이터 3인 대담",
    deck: "지방 소멸을 방어하는 최전선, 현장에서 활동하는 크리에이터들에게 필요한 진짜 정책을 물었습니다.",
    author: "이리서치",
    date: "2026-03-24",
    href: "/webzine/stories/local-creator-interview"
  }
]

export function EditorCuration() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col mb-10 text-center items-center">
          <Chip variant="primary" className="mb-4">문강 RIO</Chip>
          <h2 className="text-h2 text-brand-900 mb-4">에디터 큐레이션</h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl">
            문화강국네트워크 편집진이 깊이 있게 다루는 핵심 기사와 현장의 해설을 만나보세요. 
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MOCK_STORIES.map((story) => (
            <Link 
              key={story.id} 
              href={story.href}
              className="group flex flex-col items-start bg-surface-soft p-8 rounded-2xl border border-line-default hover:border-brand-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Chip variant="default" className="h-7 text-xs px-3">{story.section}</Chip>
                <span className="text-caption font-medium border border-line-default rounded-sm px-2 py-0.5">{story.type}</span>
              </div>
              <h3 className="text-[24px] leading-[1.38] font-bold text-neutral-900 mb-4 group-hover:text-brand-700 transition-colors">
                {story.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-neutral-600 mb-6">
                {story.deck}
              </p>
              
              <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-line-default">
                <div className="flex items-center gap-3 text-caption text-neutral-500">
                  <span className="font-medium text-neutral-700">{story.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(story.date).toLocaleDateString("ko-KR")}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm font-medium text-brand-700 group-hover:translate-x-1 transition-transform">
                  기사 읽기 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="secondary" asChild>
            <Link href="/webzine/stories">문강 RIO 전체 보기</Link>
          </Button>
        </div>
        
      </div>
    </section>
  )
}
