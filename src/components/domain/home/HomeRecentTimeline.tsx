import Link from "next/link"
import { Clock, ExternalLink } from "lucide-react"

export function HomeRecentTimeline() {
  const records = [
    {
      label: "[10차] 토론회",
      text: "한식의 세계화, K-푸드가 이끄는 국가 경쟁력",
      date: "2026.02.06",
      href: "/events?series=policy-forum-series"
    },
    {
      label: "[11차] 토론회",
      text: "기초예술 진흥과 예술인 복지 – 국가 시스템 구축 필요",
      date: "2026.04.01",
      href: "/events?series=policy-forum-series"
    },
    {
      label: "후원의 밤",
      text: "문화강국네트워크 후원의 밤",
      date: "2024.12.18",
      href: "/join/about"
    }
  ];

  return (
    <section className="w-full bg-surface-soft py-24 px-4 border-t border-b border-line-default">
      <div className="container mx-auto max-w-[800px]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-h4 md:text-h3 font-bold text-neutral-900 border-l-4 border-brand-500 pl-4 py-1">
            최근 활동
          </h2>
          <Link href="/network#history" className="text-sm font-semibold text-neutral-600 hover:text-brand-700 hover:underline underline-offset-4">
            연혁 전체 보기
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {records.map((rec, idx) => (
             <Link 
               key={idx}
               href={rec.href}
               className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-line-default rounded-xl hover:border-brand-400 hover:shadow-md transition-all gap-4"
             >
               <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 flex-1">
                  <span className="shrink-0 bg-neutral-100 text-neutral-700 font-bold text-xs px-3 py-1.5 rounded-md text-center">
                    {rec.label}
                  </span>
                  <span className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors text-base">
                    {rec.text}
                  </span>
               </div>
               <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t border-line-default sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                  <span className="text-sm text-neutral-500 flex items-center font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {rec.date}
                  </span>
                  <ExternalLink className="w-4 h-4 text-neutral-300 group-hover:text-brand-600 transition-colors" />
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
