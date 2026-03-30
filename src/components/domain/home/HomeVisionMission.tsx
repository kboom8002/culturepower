import { Landmark, Globe, HandshakeIcon } from "lucide-react"

export function HomeVisionMission() {
  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="container mx-auto max-w-[1000px] flex flex-col items-center">
        <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-2">비전과 미션</h2>
        <p className="text-brand-700 font-extrabold text-xl md:text-2xl mb-16 tracking-tight">
          "지역에서 세계로, 문화강국 대한민국"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Mission 1 */}
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-line-default shadow-sm bg-surface-soft hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <Landmark className="w-8 h-8 text-brand-700" />
            </div>
            <h3 className="text-h5 font-bold text-neutral-900 mb-3">문화정책 공론장 조성<br />및 입법 지원</h3>
            <p className="text-body-sm text-neutral-600">
              문화계 현안에 대한 사회적 합의를 이끌어내고, 이를 정책화 및 입법화하는 허브로서 기능합니다.
            </p>
          </div>

          {/* Mission 2 */}
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-line-default shadow-sm bg-surface-soft hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-brand-700" />
            </div>
            <h3 className="text-h5 font-bold text-neutral-900 mb-3">지역문화 기반의<br />정책 제안 및 연구</h3>
            <p className="text-body-sm text-neutral-600">
              현장 중심의 연구를 통해 각 지역이 고유한 문화를 바탕으로 자립할 수 있는 대안을 제시합니다.
            </p>
          </div>

          {/* Mission 3 */}
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-line-default shadow-sm bg-surface-soft hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <HandshakeIcon className="w-8 h-8 text-brand-700" />
            </div>
            <h3 className="text-h5 font-bold text-neutral-900 mb-3">국내외 문화교류<br />네트워크 구축</h3>
            <p className="text-body-sm text-neutral-600">
              K-문명의 확산과 상호 존중의 문화 교류를 위해 민관, 글로벌 단체와의 지속적인 연대를 도모합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
