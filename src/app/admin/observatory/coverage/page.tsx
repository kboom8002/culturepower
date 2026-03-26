import { BookOpen, AlertTriangle } from "lucide-react"

export default function ObservatoryCoveragePage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Question Coverage</h1>
        <p className="text-body text-neutral-600">대표 질문 세트(QAMS) 기준으로 정답(Answer)과 기사(Story)의 커버리지를 진단합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden">
        <div className="p-6 border-b border-line-soft flex items-center gap-3">
           <BookOpen className="text-brand-600 w-6 h-6" />
           <h3 className="font-bold text-neutral-900 text-lg">Unanswered & Repeated Questions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Sample Question</th>
                <th className="px-6 py-4">Topic Area</th>
                <th className="px-6 py-4">Answer Status</th>
                <th className="px-6 py-4">Story Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
               <tr className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-bold">문화강국 패스 신청 요건이 뭐야?</td>
                  <td className="px-6 py-4">참여 안내</td>
                  <td className="px-6 py-4 text-brand-600 font-bold">Covered</td>
                  <td className="px-6 py-4 text-brand-600 font-bold">Covered</td>
               </tr>
               <tr className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-bold text-warning-700 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> 2026 문화포럼 다시보기 어디서 해?</td>
                  <td className="px-6 py-4">행사 자료</td>
                  <td className="px-6 py-4 text-neutral-400">Not Covered</td>
                  <td className="px-6 py-4 text-warning-600 font-bold">Covered (Event Only)</td>
               </tr>
               <tr className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-bold text-danger-700 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> 최신 정책 브리핑 정리된 거 있어?</td>
                  <td className="px-6 py-4">정책 동향</td>
                  <td className="px-6 py-4 text-danger-600 font-bold">Missing</td>
                  <td className="px-6 py-4 text-danger-600 font-bold">Missing</td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
