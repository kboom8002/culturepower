import { PageHeader } from "@/components/layout/PageHeader"
import { Users, Target, Building2, History, Handshake, Network, FileText } from "lucide-react"
import Link from "next/link"

export function generateStaticParams() {
  return [
    { slug: "about" },
    { slug: "greeting" },
    { slug: "vision" },
    { slug: "organization" },
    { slug: "partners" },
    { slug: "history" },
    { slug: "activities" },
  ]
}

export default async function NetworkSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // We define the render logic for each slug directly inline for clarity
  let title = ""
  let desc = ""
  let content = null

  if (slug === "about" || slug === "greeting") {
    title = slug === "about" ? "네트워크 소개" : "이사장 인사말"
    desc = "K-문명과 지역문화 발전의 이정표를 세우는 전문가 포럼과 데이터 플랫폼의 연합체입니다."
    content = (
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-sm prose prose-neutral max-w-none">
        <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
          <span className="text-brand-500">■</span> {title}
        </h2>
        <p className="text-[17px] leading-[1.8] text-neutral-700">
          문화가 국력을 좌우하는 시대입니다. 파편화된 문화 정책과 학술 담론을 하나로 모아, 누구나 쉽게 접근하고 학습할 수 있는 <strong>단일 진실 공급원(Single Source of Truth)</strong>을 구축하고자 문화강국네트워크가 출범했습니다.
        </p>
        <br/>
        <p className="text-[17px] leading-[1.8] text-neutral-700">
          우리는 현장 창작자들의 생생한 목소리와 학계의 견고한 이론, 그리고 정책 결정자들의 실천적 지혜를 촘촘히 엮어 대한민국이 진정한 문화강국으로 도약하기 위한 길잡이가 되겠습니다.
        </p>
      </section>
    )
  } else if (slug === "vision") {
    title = "비전 & 미션"
    desc = "문화강국네트워크가 지향하는 핵심 가치와 행동 강령입니다."
    content = (
      <section>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-brand-900 text-white p-8 md:p-12 rounded-3xl shadow-lg">
            <h3 className="text-[24px] font-bold mb-6 flex items-center gap-2">
               <Target className="w-6 h-6 text-brand-300" /> Vision
            </h3>
            <p className="text-brand-100 leading-[1.8] text-[18px] font-medium">
              새로운 상상력으로 세계 인류 보편의 평화와 문명 진보에 기여하는 글로벌 문화 허브
            </p>
          </div>
          <div className="bg-white border border-line-strong p-8 md:p-12 rounded-3xl shadow-sm">
            <h3 className="text-[24px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Network className="w-6 h-6 text-brand-600" /> Mission
            </h3>
            <p className="text-neutral-600 leading-[1.8] text-[17px]">
              정책 아젠다 발굴, 투명한 데이터 개방, AI 친화적 지식 구조화를 통해 지식의 불균형을 해소한다.
            </p>
          </div>
        </div>
      </section>
    )
  } else if (slug === "organization") {
    title = "조직구성"
    desc = "정책 의결부터 실무 집행, 학술 자문까지 긴밀하게 연결된 네트워크 조직도입니다."
    content = (
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <Building2 className="w-8 h-8 text-brand-600" />
          <h2 className="text-h3 text-neutral-900">조직도 및 이사회</h2>
        </div>
        <ul className="grid sm:grid-cols-2 gap-y-10 gap-x-12">
          <li className="flex flex-col gap-2 pb-6 border-b border-line-soft">
            <span className="text-[18px] font-bold text-brand-700">이사회</span>
            <span className="text-neutral-700 text-[16px] leading-relaxed">운영 정책 및 주요 사업 의결 (이사장, 상임이사, 외부 이사진 구성)</span>
          </li>
          <li className="flex flex-col gap-2 pb-6 border-b border-line-soft">
            <span className="text-[18px] font-bold text-brand-700">편집위원회</span>
            <span className="text-neutral-700 text-[16px] leading-relaxed">SSoT 정답카드 및 문강 RIO 발행 총괄 및 검수 규정 마련</span>
          </li>
          <li className="flex flex-col gap-2 pb-6 sm:pb-0 sm:border-b-0 border-line-soft">
            <span className="text-[18px] font-bold text-brand-700">운영사무국</span>
            <span className="text-neutral-700 text-[16px] leading-relaxed">행사 기획, 회원 관리, 플랫폼 실무 운영 및 CS 담당</span>
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-[18px] font-bold text-brand-700">전문가 위원단</span>
            <span className="text-neutral-700 text-[16px] leading-relaxed">섹션별 학술 자문 및 정책 데이터 증거 자료 교차 검증</span>
          </li>
        </ul>
      </section>
    )
  } else if (slug === "partners") {
    title = "협력기관"
    desc = "문화강국의 생태계를 함께 만들어가는 파트너 얼라이언스입니다."
    content = (
      <section className="bg-surface-soft p-10 md:p-16 rounded-3xl border border-line-default text-center">
        <Handshake className="w-12 h-12 text-brand-500 mx-auto mb-8" />
        <h2 className="text-[24px] font-bold text-neutral-900 mb-10">
          주요 파트너 및 데이터 제휴 기관
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-6 py-4 bg-white rounded-2xl border border-line-strong text-[16px] font-bold text-neutral-800 shadow-sm hover:border-brand-500 cursor-pointer transition-colors">한국문화예술위원회</div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-line-strong text-[16px] font-bold text-neutral-800 shadow-sm hover:border-brand-500 cursor-pointer transition-colors">예술경영지원센터</div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-line-strong text-[16px] font-bold text-neutral-800 shadow-sm hover:border-brand-500 cursor-pointer transition-colors">한국콘텐츠진흥원</div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-line-strong text-[16px] font-bold text-neutral-800 shadow-sm hover:border-brand-500 cursor-pointer transition-colors">전국지역문화재단연합회</div>
        </div>
        <p className="mt-12 text-neutral-500 text-sm">※ 현재 더 많은 유관 단체와 실무 협약을 진행 중입니다.</p>
      </section>
    )
  } else if (slug === "history") {
    title = "주요 연혁"
    desc = "출범부터 지금까지 거쳐온 발자취를 투명하게 공개합니다."
    content = (
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <History className="w-8 h-8 text-brand-600" />
          <h2 className="text-[24px] font-bold text-neutral-900">연혁표</h2>
        </div>
        <div className="flex flex-col gap-8 text-[16px] text-neutral-700 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-line-strong before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-500 text-brand-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="w-3 h-3 bg-white rounded-full"></span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-line-strong shadow-sm text-left">
              <strong className="text-brand-700 text-[18px] block mb-2">2026.03</strong> 
              <span className="font-bold text-neutral-900">Media SSoT 플랫폼(AI 홈페이지) 공식 통합 런칭</span>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-neutral-200 text-neutral-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-line-soft text-left">
              <strong className="text-neutral-500 text-[18px] block mb-2">2025.11</strong> 
              <span className="font-medium text-neutral-700">컨텐츠 아키텍처 수립 및 IT TF 결성</span>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-neutral-200 text-neutral-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-line-soft text-left">
              <strong className="text-neutral-500 text-[18px] block mb-2">2025.05</strong> 
              <span className="font-medium text-neutral-700">발기인 대회 및 문화강국네트워크 창립 총회 개최</span>
            </div>
          </div>

        </div>
      </section>
    )
  } else if (slug === "activities") {
    title = "주요 활동 내역"
    desc = "문화강국네트워크가 주최하거나 후원한 굵직한 온/오프라인 활동을 소개합니다."
    content = (
      <section className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <Link key={i} href="/events" className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 transition-colors">
            <div className="w-full sm:w-48 aspect-video bg-neutral-200 rounded-xl overflow-hidden shrink-0">
              <img src={`https://picsum.photos/seed/${i+50}/400/225`} alt="활동 썸네일" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-[11px] font-bold bg-brand-50 text-brand-700 rounded border border-brand-100">
                  {i === 1 ? "최근 활동" : "과거 활동"}
                </span>
                <span className="text-xs text-neutral-500 font-mono">2026.03.{10 * i}</span>
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-neutral-900 group-hover:text-brand-700 mb-3 leading-snug">
                {i === 1 ? "제1회 K-문명 글로벌 어젠다 세팅 컨퍼런스 개최" : i === 2 ? "대한민국 예산 개혁(Reform) 대국민 서명 운동 전개" : "지역 문화 크리에이터 얼라이언스 발대식"}
              </h3>
              <p className="text-sm text-neutral-600 line-clamp-2">자세한 영상과 성과 보고서는 행사·영상 아카이브 및 데이터·자료 탭에서 열람하실 수 있습니다.</p>
            </div>
          </Link>
        ))}
        <div className="flex justify-center mt-6">
           <Link href="/events" className="px-6 py-3 bg-white border border-line-strong rounded-lg font-bold text-neutral-700 hover:bg-neutral-50 transition-colors">
             행사 상세 아카이브 가기
           </Link>
        </div>
      </section>
    )
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "네트워크", href: "/network" },
          { label: title }
        ]}
        title={title}
        description={desc}
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        {content || (
          <div className="p-12 text-center text-neutral-500 bg-surface-soft border border-line-default rounded-2xl">
            준비 중인 페이지입니다 ({slug})
          </div>
        )}
      </main>
    </div>
  )
}
