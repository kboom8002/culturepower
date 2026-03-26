import { ShieldCheck, Database, PenTool } from "lucide-react"

export function HomeTrustBlock() {
  return (
    <section className="py-20 bg-brand-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-h2 mb-4 text-white">투명하고 검증된 공공형 해설 플랫폼</h2>
          <p className="text-body-lg text-brand-100/80">
            문화강국네트워크의 모든 답변과 기사는 3단계의 엄격한 신뢰 원칙을 거쳐 공개됩니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center text-center p-6 bg-brand-800 rounded-2xl border border-brand-700">
            <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Database className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-h4 mb-3">근거 스냅샷 공개</h3>
            <p className="text-body-sm text-brand-100/80">
              답변의 토대가 된 연구 자료, 보도자료, 행사 발제문 등 원본 객체의 링크와 접속 스냅샷을 항상 하단에 첨부합니다.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-brand-800 rounded-2xl border border-brand-700">
            <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <PenTool className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-h4 mb-3">전문가 리뷰 필수</h3>
            <p className="text-body-sm text-brand-100/80">
              전문 에디터가 초안을 작성한 뒤, 지정된 권위자 혹은 리뷰어의 교차 검증을 통과한 문서에만 '검수 완료' 배지가 붙습니다.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-brand-800 rounded-2xl border border-brand-700 relative overflow-hidden">
            {/* Trust Gold Highlight for emphasis on the final block (Optional decorative feel) */}
            <div className="absolute top-0 w-full h-1 bg-trust-text" />
            
            <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <ShieldCheck className="w-7 h-7 text-trust-text" />
            </div>
            <h3 className="text-h4 mb-3">지속적인 추적 수정</h3>
            <p className="text-body-sm text-brand-100/80">
              모든 정답카드 및 문서는 정책 변화나 새로운 연구 결과에 맞춰 업데이트되며, 최종 업데이트 일자를 명확히 기재합니다.
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
