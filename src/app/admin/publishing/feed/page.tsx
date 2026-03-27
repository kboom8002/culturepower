import { Rss, RefreshCcw, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAnswerFeedStatus } from "@/lib/actions/seo"

export default async function AdminPublishingFeedPage() {
  const items = await getAnswerFeedStatus()
  const includedCount = items.filter(i => i.is_included).length
  const errorCount = items.filter(i => !i.is_included).length

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Answer Feed Status (AIO-PR)</h1>
        <p className="text-body text-neutral-600">지식 정답카드 중 퍼블릭으로 발행되었으며, 기계 가독성 린팅을 통과한 피드 송출 현황입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
        {/* Main Feed Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Rss className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="font-bold text-[18px] text-neutral-900">Primary Answer Feed</h3>
                    <p className="text-xs text-neutral-500">/feeds/answers.ndjson</p>
                 </div>
              </div>
              {errorCount === 0 ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success-50 text-success-700 font-bold text-xs rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-warning-50 text-warning-700 font-bold text-xs rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorCount} Issues
                </span>
              )}
           </div>
           
           <div className="bg-neutral-50 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                 <span className="text-neutral-500 font-medium">Included Objects</span>
                 <span className="font-mono font-bold text-success-600">{includedCount} items</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-neutral-500 font-medium">Excluded Objects</span>
                 <span className="font-mono font-bold text-danger-600">{errorCount} items</span>
              </div>
           </div>
           
           <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" disabled><RefreshCcw className="w-4 h-4 mr-2" /> 강제 생성</Button>
              <Button variant="tertiary" className="flex-1" disabled>피드 다운로드</Button>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2 flex items-center gap-2 text-sm">
              <Rss className="w-4 h-4 text-brand-500" /> Answer Feed Eligibility Checks
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-12"></th>
                <th className="px-6 py-4">Answer Card Title</th>
                <th className="px-6 py-4">Valid Errors</th>
                <th className="px-6 py-4 w-40 text-right">Updated At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
               {items.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500">배포된 퍼블릭 객체가 없습니다.</td></tr>
               ) : items.map((item) => (
                 <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                   <td className="px-6 py-4">
                     {item.is_included ? (
                       <CheckCircle2 className="w-5 h-5 text-success-500" />
                     ) : (
                       <AlertCircle className="w-5 h-5 text-danger-500" />
                     )}
                   </td>
                   <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900 flex items-center gap-2">
                         <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                         {item.title}
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      {item.is_included ? (
                        <span className="text-xs bg-success-50 text-success-600 px-2 py-1 rounded font-bold">READY</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {item.error_reason.map((err, idx) => (
                            <span key={idx} className="text-xs bg-danger-50 text-danger-600 px-2 py-1 rounded font-bold self-start">{err}</span>
                          ))}
                        </div>
                      )}
                   </td>
                   <td className="px-6 py-4 text-right font-mono text-xs text-neutral-500">
                      {new Date(item.updated_at).toLocaleString()}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
