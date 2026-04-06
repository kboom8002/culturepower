import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Link from "next/link"
import { DynamicSectionHero } from "@/components/layout/DynamicSectionHero"

export default async function BriefsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )

  const { data: statusObj } = await supabase.from('workflow_statuses').select('id').eq('slug', 'published').maybeSingle()
  
  let briefs: any[] = []
  if (statusObj) {
    const { data } = await supabase
      .from('briefs')
      .select('id, slug, title, summary, published_at, created_at')
      .eq('workflow_status_id', statusObj.id)
      .order('published_at', { ascending: false })
    if (data) briefs = data
  }

  return (
    <div className="w-full">
      <DynamicSectionHero
        defaultTitle="One-Pager 브리프"
        defaultDescription="핵심 문제와 정책 대안을 한 장에 담아 전달하는 요약 보고서"
      />
      <main className="container mx-auto px-4 py-12 max-w-[1200px]">
        {briefs.length === 0 ? (
          <div className="bg-surface-muted rounded-2xl py-32 flex flex-col items-center justify-center border border-line-default text-neutral-500">
            <p className="text-lg font-medium">One-Pager 브리프 시스템 준비 중입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {briefs.map(brief => (
              <Link key={brief.id} href={`/briefs/${brief.slug || brief.id}`} className="group bg-white border border-line-default rounded-xl overflow-hidden hover:border-brand-500 transition-colors shadow-sm cursor-pointer flex flex-col h-full">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-brand-600 mb-3 uppercase tracking-wide">ONE-PAGER BRIEF</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-600 line-clamp-2">
                    {brief.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                    {brief.summary || '상세 내용이 없습니다.'}
                  </p>
                  <div className="text-xs text-text-tertiary">
                    {new Date(brief.published_at || brief.created_at || new Date()).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
