import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function BriefDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )

  const { data: statusObj } = await supabase.from('workflow_statuses').select('id').eq('slug', 'published').maybeSingle()
  
  let query = supabase.from('briefs').select('*')
  
  // Try matching by slug first
  let { data: brief } = await query.eq('slug', slug).eq('workflow_status_id', statusObj?.id).maybeSingle()
  
  // Try matching by ID if slug not found
  if (!brief) {
    const { data: briefById } = await supabase.from('briefs').select('*').eq('id', slug).eq('workflow_status_id', statusObj?.id).maybeSingle()
    brief = briefById
  }

  if (!brief) {
    notFound()
  }

  return (
    <div className="w-full bg-surface-muted min-h-[90vh] pb-16">
      {/* Dark Theme Hero Header */}
      <header className="bg-neutral-900 px-8 py-16 text-center mb-10 w-full">
        <div className="max-w-[720px] mx-auto">
          <div className="inline-block px-4 py-1 mb-6 text-xs font-bold text-white tracking-widest uppercase bg-white/10 rounded-full">
            1-PAGER BRIEF
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-6">
            {brief.title}
          </h1>
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-colors shadow-lg">
              <span>📄</span> PDF 원본 다운로드
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[720px] mx-auto px-6">
        {/* Answer Card / Core Conclusion */}
        <div className="bg-white rounded-xl shadow-md border-t-4 border-brand-500 p-8 mb-10">
          <h2 className="text-lg font-bold text-brand-600 mb-4 flex items-center gap-2">
            ✅ 핵심 요약
          </h2>
          <p className="text-[17px] leading-relaxed text-text-primary whitespace-pre-wrap">
            {brief.one_line_answer || brief.summary}
          </p>
        </div>

        {/* Top Points (if available) */}
        {brief.top_points && brief.top_points.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-text-primary mb-6">📌 주요 논점</h3>
            <ul className="space-y-4">
              {brief.top_points.map((point: any, idx: number) => (
                <li key={idx} className="flex items-start gap-4 p-5 bg-white border border-line-default rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div className="pt-1 text-[15px] leading-relaxed text-text-secondary">
                    {typeof point === 'string' ? point : (point.point || point.content)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Body */}
        {brief.body_text && (
          <div className="prose prose-lg max-w-none text-text-secondary pb-16">
             <div dangerouslySetInnerHTML={{ __html: brief.body_text.replace(/\n/g, '<br/>') }} />
          </div>
        )}
      </div>
    </div>
  )
}
