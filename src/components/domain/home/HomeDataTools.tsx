import Link from "next/link"
import { BarChart3, FileText, CalendarDays, BookOpen, ArrowRight } from "lucide-react"

export function HomeDataTools() {
  const tools = [
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-600" />,
      title: "Data Lab",
      desc: "정책 분석과 실증 연구를 위한 통계 데이터셋",
      href: "/data?section=data-lab"
    },
    {
      icon: <FileText className="w-8 h-8 text-brand-600" />,
      title: "One-Pager Brief",
      desc: "바쁜 실무자를 위한 핵심 이슈 1장 요약본",
      href: "/briefs"
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-brand-600" />,
      title: "지원사업 캘린더",
      desc: "주요 문화예술 공모 및 지원사업 일정 큐레이션",
      href: "/data?section=funding-calendar"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-600" />,
      title: "정책 브리핑 자료",
      desc: "국회 및 지자체 행정 보고를 위한 심층 리포트",
      href: "/reports"
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 border-t border-line-default">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-4">실무자가 바로 활용할 수 있는 도구</h2>
          <p className="text-body-lg text-neutral-600 max-w-[700px] mx-auto">
            문강 RIO는 기사와 해설만 제공하는 웹진이 아닙니다. 정책 브리핑과 행정 보고, 실무 검토에 
            바로 인용할 수 있는 통계와 요약 리포트를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => (
             <Link 
               key={idx}
               href={tool.href}
               className="group flex flex-col p-8 bg-surface-soft border border-line-default rounded-3xl hover:bg-brand-50 hover:border-brand-200 transition-colors"
             >
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                 {tool.icon}
               </div>
               <h3 className="text-lg font-bold text-neutral-900 mb-3">{tool.title}</h3>
               <p className="text-sm text-neutral-600 mb-6 flex-1">{tool.desc}</p>
               <div className="flex items-center text-sm font-bold text-brand-700">
                 바로가기 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
