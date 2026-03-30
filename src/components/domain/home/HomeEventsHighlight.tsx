import Link from "next/link"
import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react"

export function HomeEventsHighlight() {
  const events = [
    {
      title: "[10차] 한식의 세계화, K-푸드가 이끄는 국가 경쟁력",
      type: "정책토론회",
      date: "2026.02.06",
      href: "/events?series=policy-forum-series",
    },
    {
      title: "[9차] 대전환의 시대, 지역문화 진흥의 주요 과제",
      type: "지역문화대전환 Ⅳ",
      date: "2025.12.17",
      href: "/events?series=regional-culture-transition",
    },
    {
      title: "[8차] 사람이 머무는 지역, 콘텐츠로 순환하는 국가",
      type: "지역문화대전환 Ⅲ",
      date: "2025.12.05",
      href: "/events?series=regional-culture-transition",
    },
  ];

  return (
    <section className="w-full bg-surface-muted py-24 px-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-[600px]">
            <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-4">행사·토론회</h2>
            <p className="text-body text-neutral-600">
              문화강국네트워크는 문화산업, 정책, 지역문화대전환 등 다양한 주제로 
              간담회와 토론회를 이어오며 공론장과 교류의 장을 넓혀가고 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
             <Link href="/events?series=regional-culture-transition" className="px-4 py-2 bg-white border border-line-strong rounded-full text-sm font-semibold hover:text-brand-700 hover:border-brand-500 transition-colors">
               순회토론회 보기
             </Link>
             <Link href="/events/archive" className="px-4 py-2 border border-brand-900 text-brand-900 rounded-full text-sm font-semibold hover:bg-brand-900 hover:text-white transition-colors">
               지난 행사 아카이브
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((ev, idx) => (
            <Link 
              key={idx}
              href={ev.href} 
              className="group flex flex-col bg-white rounded-2xl p-6 border border-line-default hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-16">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full">
                  {ev.type}
                </span>
                <ArrowUpRight className="w-6 h-6 text-neutral-300 group-hover:text-brand-700 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-6 group-hover:text-brand-700 transition-colors leading-snug">
                {ev.title}
              </h3>
              <div className="flex items-center text-sm font-medium text-neutral-500 mt-auto">
                <Calendar className="w-4 h-4 mr-2" />
                {ev.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
