import { Chip } from "@/components/ui/chip"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFeaturedSlots } from "@/lib/actions/publishing"
import { getPublicStories } from "@/lib/actions/public"

export async function EditorCuration() {
  const featured = await getFeaturedSlots('Home Hero') 
  const allStories = await getPublicStories()
  
  const stories = featured
    .sort((a, b) => a.display_order - b.display_order)
    .map(f => allStories.find(a => a.id === f.content_id))
    .filter(Boolean)

  if (stories.length === 0) return null
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
          {stories.map((story: any) => (
            <Link 
              key={story.id} 
              href={`/webzine/stories/${story.id}`}
              className="group flex flex-col items-start bg-surface-soft p-8 rounded-2xl border border-line-default hover:border-brand-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Chip variant="default" className="h-7 text-xs px-3">{story.section || "기사"}</Chip>
                <span className="text-caption font-medium border border-line-default rounded-sm px-2 py-0.5">{story.story_type || "웹진"}</span>
              </div>
              <h3 className="text-[24px] leading-[1.38] font-bold text-neutral-900 mb-4 group-hover:text-brand-700 transition-colors">
                {story.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-neutral-600 mb-6">
                {story.deck}
              </p>
              
              <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-line-default">
                <div className="flex items-center gap-3 text-caption text-neutral-500">
                  <span className="font-medium text-neutral-700">{story.experts?.name || "편집부"}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(story.published_at || story.created_at).toLocaleDateString("ko-KR")}</span>
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
