import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Users, Mail, ArrowRight } from "lucide-react"
import { NewsletterForm } from "@/components/domain/participation/NewsletterForm"

export default function JoinPage() {
  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen">
      <PageHeader 
        breadcrumbs={[{ label: "참여하기" }]}
        title="네트워크 참여 및 연대"
        description="문화강국의 비전에 동의하는 누구나 지식 기여자로, 정회원으로 활동할 수 있습니다."
      />
      
      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Newsletter */}
          <div className="bg-white p-8 md:p-10 flex flex-col items-start rounded-3xl border border-line-default shadow-sm hover:border-brand-400 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-brand-050 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-brand-700" />
            </div>
            <h2 className="text-h3 text-neutral-900 mb-4">문강 RIO 뉴스레터 구독</h2>
            <p className="text-body text-neutral-600 mb-10 md:h-20">
              가장 뜨거운 문화/정책 쟁점과 심층 해설(Story)을 매주 이메일로 받아보세요. 
              국민 누구나 무료로 구독 가능합니다.
            </p>
            <NewsletterForm />
          </div>

          {/* Membership */}
          <div className="bg-surface-soft p-8 md:p-10 flex flex-col items-start rounded-3xl border border-line-default shadow-sm hover:border-brand-400 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-line-strong mb-6 shadow-sm">
              <Users className="w-7 h-7 text-brand-700" />
            </div>
            <h2 className="text-h3 text-neutral-900 mb-4">정회원 및 기여자 신청</h2>
            <p className="text-body text-neutral-600 mb-10 md:h-20">
              Media SSoT의 정답카드를 직접 제안하고 타인의 콘텐츠를 검수(Reviewer)할 권한을 획득하여 
              생산적인 담론 형성에 참여하세요.
            </p>
            <Button variant="secondary" size="lg" className="w-full justify-between mt-auto bg-white hover:bg-neutral-50">
              가입 신청서 작성 <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

        </div>

        {/* Culture Power Manifesto Block */}
        <div className="mt-16 p-8 md:p-12 bg-brand-900 rounded-3xl text-center text-white text-balance overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-[24px] md:text-[28px] font-bold mb-6">문화강국네트워크의 3대 운영 원칙</h3>
            <p className="text-brand-100 font-medium leading-[1.8] max-w-2xl mx-auto md:text-[18px]">
              우리는 편향과 선동을 배격하고 팩트에 기반한 정답(Answer-first)을 고민합니다.<br className="hidden md:block"/>
              모든 발제와 검수 증거를 투명하게 체인으로 관리(Trust visible)하며,<br className="hidden md:block"/>
              파편화된 사회의 정보를 하나의 보편 가치로 영구 기록(Graph linking)합니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
