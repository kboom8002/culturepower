import { FileText, Database, Layers, Mail } from "lucide-react"
import Link from "next/link"

export function HomeRioIntro() {
  const features = [
    {
      icon: <Layers className="text-brand-700 w-6 h-6" />,
      title: "RIO 프레임 (구조개혁·실행·영향)",
      description: "문화강국 의제를 Reform, Implementation, Outcomes의 관점으로 구조화하여 제시합니다.",
    },
    {
      icon: <FileText className="text-brand-700 w-6 h-6" />,
      title: "6개 핵심 섹션",
      description: "정책해설, 현장, 트렌드, 리포트 등 다각도의 관점으로 이슈를 리뷰합니다.",
    },
    {
      icon: <Database className="text-brand-700 w-6 h-6" />,
      title: "Data Lab 연계",
      description: "단순 평론을 넘어 실무와 통계에 기반한 신뢰도 높은 데이터를 제공합니다.",
    },
    {
      icon: <Mail className="text-brand-700 w-6 h-6" />,
      title: "정기 뉴스레터 매거진",
      description: "놓치지 않고 살펴봐야 할 핵심 문화정책 리포트를 정기로 발송해 드립니다.",
    },
  ];

  return (
    <section className="w-full bg-brand-900 text-white py-24 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-800 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto max-w-[1100px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* Left Text Block */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <span className="inline-block border border-brand-400 text-brand-100 text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-6">
              국가 문화전략 플랫폼
            </span>
            <h2 className="text-h2 md:text-[3rem] font-bold text-white mb-6 leading-tight">
              문강 <span className="text-brand-300">文江</span> RIO
            </h2>
            <p className="text-xl text-brand-100 font-semibold mb-6">
              기록이 아닌 제안, 평론이 아닌 대안.
            </p>
            <p className="text-brand-200 leading-relaxed mb-10 text-body-lg">
              문강 RIO는 일반 기사형 웹진이 아닙니다. 문화강국 관련 질문을 구조화하고 정리하며, 기사·리포트·데이터·뉴스레터를 통해 
              국회, 지자체, 현장 실무자가 바로 인용하고 사용할 수 있도록 하는 정책형 Media SSoT 서브 허브입니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/webzine/about" className="text-sm font-semibold text-brand-900 bg-white hover:bg-neutral-100 transition-colors px-6 py-3 rounded-full shadow-lg">
                문강 RIO 소개
              </Link>
              <Link href="/webzine/stories" className="text-sm font-semibold text-white border border-brand-300 hover:bg-brand-800 transition-colors px-6 py-3 rounded-full">
                6개 섹션 보기
              </Link>
              <button className="text-sm font-semibold text-brand-100 underline underline-offset-4 hover:text-white px-4 py-3">
                뉴스레터 구독
              </button>
            </div>
          </div>

          {/* Right Grid Features */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
             {features.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                      {item.icon}
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                   <p className="text-sm text-brand-100 leading-relaxed">{item.description}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  )
}
