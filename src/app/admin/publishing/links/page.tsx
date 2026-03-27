import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react"
import { getMetaHealthIssues } from "@/lib/actions/seo"

export default async function AdminPublishingLinksPage() {
  const issues = await getMetaHealthIssues()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Meta Health Checker</h1>
        <p className="text-body text-neutral-600">썸네일 이미지(OG) 누락 등 콘텐츠 메타데이터 건전성을 통합 검수합니다. (Broken Link Checker 확장 대기)</p>
      </div>

      {issues.length === 0 ? (
        <div className="bg-success-50 border border-success-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-12 h-12 text-success-500 mb-4" />
          <h3 className="text-2xl font-bold text-success-800 mb-2">모든 메타데이터가 완벽합니다</h3>
          <p className="text-success-600">누락된 OG 이미지나 잘못된 메타 텍스트 길이가 검출되지 않았습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
             <div className="font-bold text-neutral-700 p-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-danger-500" /> {issues.length} Health Warnings Found
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
                <tr>
                  <th className="px-6 py-4 w-24">Type</th>
                  <th className="px-6 py-4">Source Title</th>
                  <th className="px-6 py-4">Validation Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft text-neutral-900">
                 {issues.map(item => (
                   <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                     <td className="px-6 py-4 font-bold text-brand-600 text-xs tracking-wider">
                       {item.content_type}
                     </td>
                     <td className="px-6 py-4">
                       <div className="font-medium text-neutral-900 truncate max-w-sm">
                         {item.title}
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                          {item.meta_issues.map((err, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-danger-700 bg-danger-50 px-2.5 py-1.5 rounded w-max">
                              <AlertTriangle className="w-3.5 h-3.5" /> {err}
                            </div>
                          ))}
                       </div>
                     </td>
                   </tr>
                 ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
