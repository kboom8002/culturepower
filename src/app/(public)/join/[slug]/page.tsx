"use client"

import { use } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, CheckCircle2, Mail, Users, Building } from "lucide-react"

const PAGE_DATA: Record<string, any> = {
  about: {
    title: "회원 소개",
    desc: "문화강국네트워크의 회원은 정보의 수용자를 넘어 지식의 기여자로 활동합니다.",
    icon: Users,
    content: "우리는 누구나 문화를 즐기고 정책을 이해할 수 있는 사회를 꿈꿉니다. 정회원이 되시면 SSoT 기반의 정책 플랫폼에서 발제하고 검수할 수 있는 자격이 주어집니다."
  },
  benefits: {
    title: "회원 혜택",
    desc: "정회원에게 제공되는 전용 데이터 접근권 및 행사 우선 참여 혜택을 안내합니다.",
    icon: CheckCircle2,
    content: "모든 SSoT 데이터 원문(Raw Data) 무제한 열람, 주요 학술 토론회 및 VIP 네트워킹 행사 우선 초청, 자체 발행 인사이트 리포트 무료 제공 등 다양한 혜택이 준비되어 있습니다."
  },
  guide: {
    title: "가입 안내",
    desc: "월회비 납부 및 가입 절차에 대한 상세 안내입니다.",
    icon: FileText,
    content: "일반회원은 무료로 기본 뉴스레터를 받아볼 수 있으며, 정회원(월 1만원)은 SSoT 권한과 프리미엄 리포트를 제공받습니다. 홈페이지 정책에 동의한 후 신청할 수 있습니다."
  },
  apply: {
    title: "가입 신청서 작성",
    desc: "대한민국 문화강국을 향한 여정에 함께해 주십시오.",
    icon: Building,
    formType: "membership"
  },
  newsletter: {
    title: "문강 RIO 뉴스레터 구독",
    desc: "가장 뜨거운 문화/정책 쟁점과 심층 해설을 매주 이메일로 받아보세요.",
    icon: Mail,
    formType: "newsletter"
  },
  partnership: {
    title: "협력/제휴 문의",
    desc: "데이터 제공, 행사 공동주최 등 기관 간 제휴를 원하시면 연락주세요.",
    icon: Users,
    formType: "partnership"
  }
}

export default function JoinSubPage({ params }: { params: Promise<{ slug: string }> }) {
  // Extract slug from the Next.js App Router Promise
  const { slug } = use(params);
  const data = PAGE_DATA[slug] || PAGE_DATA.about;
  const Icon = data.icon;

  const handleAlert = (e: React.FormEvent, msg: string) => {
    e.preventDefault();
    alert(msg);
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <PageHeader 
        breadcrumbs={[
          { label: "참여·회원", href: "/join" },
          { label: data.title }
        ]}
        title={data.title}
        description={data.desc}
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-3xl py-12">
        <div className={`bg-white p-8 md:p-12 rounded-3xl border border-line-default shadow-sm flex flex-col items-center ${data.formType === 'newsletter' ? 'text-center' : 'text-left w-full'}`}>
          
          <div className="w-16 h-16 bg-brand-050 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-brand-700" />
          </div>
          
          <h2 className="text-[28px] font-bold text-neutral-900 mb-2">{data.title}</h2>
          {data.formType === "newsletter" && (
             <p className="text-neutral-500 mb-8">국민 누구나 100% 무료로 구독 가능합니다.</p>
          )}

          {/* NEWSLETTER FORM */}
          {data.formType === "newsletter" && (
            <form className="w-full max-w-md flex flex-col gap-4 mx-auto" onSubmit={(e) => handleAlert(e, "구독 신청이 완료되었습니다! 📬")}>
              <div className="flex flex-col gap-2 text-left">
                <input type="text" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 ring-brand-100 transition-all" placeholder="성함 (예: 홍길동)" />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <input type="email" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 ring-brand-100 transition-all" placeholder="수신 이메일 주소" />
              </div>
              <label className="flex items-center gap-2 mt-2 text-sm text-neutral-600 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer" />
                <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
              </label>
              
              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 py-6 text-[16px] shadow-md hover:shadow-lg transition-all bg-brand-700 hover:bg-brand-800">
                무료 구독 신청하기
              </Button>
            </form>
          )}

          {/* MEMBERSHIP FORM */}
          {data.formType === "membership" && (
            <form className="w-full flex flex-col gap-6 mt-8" onSubmit={(e) => handleAlert(e, "정회원 가입 신청이 접수되었습니다. 담당자 확인 후 연락드리겠습니다. 🤝")}>
              
              <div className="bg-surface-soft p-6 rounded-2xl border border-line-default mb-2">
                <h3 className="font-bold text-brand-900 mb-2">SSoT 지식 기여자 (정회원) 신청 자격</h3>
                <p className="text-sm text-brand-800 leading-relaxed">
                  문화강국네트워크의 정회원은 단순 거수기를 넘어, 자신이 속한 지역이나 분야의 정책 아젠다를 
                  단일 진실 공급원(SSoT)에 등재하고, 타인의 정보(정답카드)를 교차 검수(Review)할 책임을 가집니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left text-neutral-900">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">이름 (실명)</label>
                  <input type="text" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-all" placeholder="홍길동" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">출생연도</label>
                  <input type="text" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-all" placeholder="YYYY" maxLength={4} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold">이메일 주소</label>
                  <input type="email" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-all" placeholder="example@email.com" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold">소속 기관 및 직함 (선택)</label>
                  <input type="text" className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-all" placeholder="예) OO문화재단 기획실장 / 프리랜서 기획자" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold">휴대전화 번호</label>
                  <input type="tel" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-all" placeholder="010-0000-0000" />
                </div>
              </div>

              <div className="border border-line-strong rounded-2xl p-6 mt-4 opacity-90 text-left">
                <h4 className="font-bold text-neutral-800 text-[15px] mb-3">SSoT 윤리 및 운영 원칙 (약관)</h4>
                <div className="h-24 overflow-y-auto text-xs text-neutral-500 leading-relaxed bg-neutral-50 p-4 border border-line-soft rounded-lg mb-4">
                  1. 목적: 본 규정은 문화강국네트워크의 SSoT 발행 및 검수에 기여하는 정회원의 기본적인 책무와 권리를 규정합니다.<br/>
                  2. 팩트(Fact)의 투명성: 회원은 데이터를 등재하거나 정책 리포트를 작성함에 있어 검증 불가능한 허위 사실이나 편향된 논리를 배제하고, 반드시 공개 가능한 출처(url 등)를 명시해야 합니다.<br/>
                  3. 회비 운영: 정회원은 문화강국네트워크의 서버 유지보수와 운영을 위해 월 1만원의 후원 회비를 납부할 의무를 가집니다.<br/>
                  4. 데이터 자산 권리: SSoT에 등록된 모든 데이터의 저작권은 네트워크 공공재로 귀속되며...
                </div>
                <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer font-bold select-none cursor-pointer">
                  <input type="checkbox" required className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500" />
                  <span>위의 SSoT 윤리 강령 및 정회원 운영 약관에 모두 동의합니다. (필수)</span>
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 py-6 text-[18px]">
                가입 신청서 접수하기 <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </form>
          )}

          {/* PARTNERSHIP FORM */}
          {data.formType === "partnership" && (
            <form className="w-full flex flex-col gap-5 text-left mt-8 w-full max-w-md mx-auto" onSubmit={(e) => handleAlert(e, "제휴 문의가 등록되었습니다. 곧 회신 드리겠습니다. 🏢")}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-800">기관 / 기업명</label>
                <input type="text" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-800">담당자 이메일</label>
                <input type="email" required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-800">제휴 내용 상세</label>
                <textarea rows={5} required className="px-4 py-3 rounded-xl border border-line-strong bg-neutral-50 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none" placeholder="데이터 교환, 학술 토론회 공동 주최 등 내용을 적어주세요." />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full mt-6 py-6 text-[16px]">
                문의 접수하기
              </Button>
            </form>
          )}

          {/* Static Content (About, Benefits, Guide) */}
          {!data.formType && (
            <div className="text-left bg-surface-soft p-6 md:p-8 rounded-2xl w-full">
              <p className="text-[17px] leading-[1.8] text-neutral-700 m-0 text-center">
                {data.content}
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
