import { PageHeader } from "@/components/layout/PageHeader"
import { Users, Target, Building2, History, Handshake } from "lucide-react"

export default function NetworkIndexPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[{ label: "네트워크 소개" }]}
        title="문화강국네트워크"
        description="K-문명과 지역문화 발전의 이정표를 세우는 전문가 포럼과 데이터 플랫폼의 연합체입니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="flex flex-col gap-16">
          
          <section id="greeting">
            <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
              <span className="text-brand-500">■</span> 이사장 인사말
            </h2>
            <div className="bg-white p-8 rounded-2xl border border-line-default shadow-sm prose prose-neutral max-w-none">
              <p className="text-[17px] leading-[1.8] text-neutral-700">
                문화가 국력을 좌우하는 시대입니다. 파편화된 문화 정책과 학술 담론을 하나로 모아, 누구나 쉽게 접근하고 학습할 수 있는 <strong>단일 진실 공급원(Single Source of Truth)</strong>을 구축하고자 문화강국네트워크가 출범했습니다.
              </p>
              <br/>
              <p className="text-[17px] leading-[1.8] text-neutral-700">
                우리는 현장 창작자들의 생생한 목소리와 학계의 견고한 이론, 그리고 정책 결정자들의 실천적 지혜를 촘촘히 엮어 대한민국이 진정한 문화강국으로 도약하기 위한 길잡이가 되겠습니다.
              </p>
            </div>
          </section>

          <section id="vision">
            <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-brand-600" />
              비전 & 미션
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-brand-900 text-white p-8 rounded-2xl">
                <h3 className="text-[20px] font-bold mb-4">Vision</h3>
                <p className="text-brand-100 leading-relaxed font-medium">새로운 상상력으로 세계 인류 보편의 평화와 문명 진보에 기여하는 글로벌 문화 허브</p>
              </div>
              <div className="bg-white border border-line-strong p-8 rounded-2xl">
                <h3 className="text-[20px] font-bold text-neutral-900 mb-4">Mission</h3>
                <p className="text-neutral-600 leading-relaxed">정책 아젠다 발굴, 투명한 데이터 개방, AI 친화적 지식 구조화를 통해 지식의 불균형을 해소한다.</p>
              </div>
            </div>
          </section>

          <section id="organization">
            <h2 className="text-h3 text-neutral-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-brand-600" />
              조직 구성
            </h2>
            <div className="bg-white p-8 rounded-2xl border border-line-default shadow-sm">
              <ul className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                <li className="flex flex-col gap-1 pb-4 border-b border-line-soft">
                  <span className="text-sm font-bold text-brand-700">이사회</span>
                  <span className="text-neutral-700 font-medium">운영 정책 및 주요 사업 의결</span>
                </li>
                <li className="flex flex-col gap-1 pb-4 border-b border-line-soft">
                  <span className="text-sm font-bold text-brand-700">편집위원회</span>
                  <span className="text-neutral-700 font-medium">SSoT 정답카드 및 문강 RIO 발행 총괄</span>
                </li>
                <li className="flex flex-col gap-1 pb-4 sm:border-b border-line-soft">
                  <span className="text-sm font-bold text-brand-700">운영사무국</span>
                  <span className="text-neutral-700 font-medium">행사 기획, 회원 관리, 플랫폼 운영</span>
                </li>
                <li className="flex flex-col gap-1 pb-4 sm:border-b border-line-soft">
                  <span className="text-sm font-bold text-brand-700">전문가 위원단</span>
                  <span className="text-neutral-700 font-medium">섹션별 학술 자문 및 증거 자료 검증</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-6">
            <section id="history" className="bg-surface-soft p-8 rounded-2xl border border-line-default">
              <h2 className="text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-neutral-500" />
                주요 연혁
              </h2>
              <div className="flex flex-col gap-4 text-sm text-neutral-600">
                <div className="flex gap-4"><strong className="w-16 shrink-0 text-neutral-900">2026.03</strong> 플랫폼 공식 런칭</div>
                <div className="flex gap-4"><strong className="w-16 shrink-0 text-neutral-900">2025.11</strong> 베타서비스 및 T/F 결성</div>
                <div className="flex gap-4"><strong className="w-16 shrink-0 text-neutral-900">2025.05</strong> 발기인 대회 및 창립 총회</div>
              </div>
            </section>
            <section id="partners" className="bg-surface-soft p-8 rounded-2xl border border-line-default">
              <h2 className="text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-neutral-500" />
                협력 기관
              </h2>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white rounded-lg border border-line-default text-sm font-medium">한국문화예술위원회</div>
                <div className="px-4 py-2 bg-white rounded-lg border border-line-default text-sm font-medium">예술경영지원센터</div>
                <div className="px-4 py-2 bg-white rounded-lg border border-line-default text-sm font-medium">한국콘텐츠진흥원</div>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  )
}
