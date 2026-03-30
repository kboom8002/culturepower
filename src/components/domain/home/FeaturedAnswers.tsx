import Link from "next/link"
import { ArrowRight, HelpCircle } from "lucide-react"

export function FeaturedAnswers() {
  const coreQuestions = [
    {
      topic: "국가 문화전략",
      title: "문화강국이란 무엇인가",
      href: "/answers/what-is-cultural-power"
    },
    {
      topic: "정책 혁신",
      title: "문화정책 구조개혁은 왜 필요한가",
      href: "/answers/why-cultural-policy-reform"
    },
    {
      topic: "지역문화",
      title: "지역문화대전환은 무엇을 말하는가",
      href: "/answers/what-is-local-culture-transition"
    },
    {
      topic: "K-문명",
      title: "K-문명이란 무엇인가",
      href: "/answers/what-is-k-civilization"
    },
    {
      topic: "문화 산업",
      title: "K-컬처의 힘은 어디에서 오는가",
      href: "/answers/where-k-culture-power-comes-from"
    },
    {
      topic: "예술인 복지",
      title: "예술인 복지의 핵심 과제는 무엇인가",
      href: "/answers/core-issues-of-artist-welfare"
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 border-t border-line-default">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-[700px]">
            <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-brand-600" />
              핵심 질문에 먼저 답합니다
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed">
              문강의 토픽 체계는 단순 섹션형 구조에 머물지 않습니다. 
              국가 문화전략과 관련된 가장 근본적인 핵심 질문 6가지를 통해 방향성을 제시합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
             <Link href="/answers" className="px-5 py-2.5 bg-brand-900 text-white rounded-full text-sm font-bold hover:bg-brand-800 transition-colors shadow-sm">
               정답카드 전체 보기
             </Link>
             <Link href="/answers/topics" className="px-5 py-2.5 bg-white border border-line-strong text-neutral-700 rounded-full text-sm font-bold hover:border-brand-500 hover:text-brand-700 transition-colors shadow-sm">
               토픽별로 보기
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreQuestions.map((q, idx) => (
             <Link
               key={idx}
               href={q.href}
               className="group flex flex-col p-6 bg-surface-muted border border-line-default rounded-2xl hover:bg-brand-50 hover:border-brand-300 transition-colors relative overflow-hidden"
             >
               <span className="text-xs font-bold text-brand-500 mb-3">{q.topic}</span>
               <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-700 mb-6 leading-snug">
                 {q.title}
               </h3>
               <div className="mt-auto flex items-center text-sm font-semibold text-neutral-500 group-hover:text-brand-600">
                 SSoT 읽기 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
