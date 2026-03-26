import { Link as LinkIcon, AlertTriangle, ExternalLink } from "lucide-react"

export default function AdminPublishingLinksPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Broken Link Checker (SEO)</h1>
        <p className="text-body text-neutral-600">웹진 기사나 페이지에 포함된 외부 링크 중 접속이 불가능한(404, 500) 링크를 찾아냅니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning-500" /> 2 Broken Links Found
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Source Page</th>
                <th className="px-6 py-4">Dead Target URL</th>
                <th className="px-6 py-4 w-28">Error Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600 hover:underline cursor-pointer flex items-center gap-2">
                     <LinkIcon className="w-3.5 h-3.5" /> [Story] 프랑스 파리 올림픽 문화행사 참관기
                  </td>
                  <td className="px-6 py-4">
                     <div className="text-neutral-500 font-mono text-xs max-w-sm truncate flex items-center gap-1.5">
                       <ExternalLink className="w-3 h-3" /> https://paris2024.org/expired-page
                     </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-danger-600">
                     404
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600 hover:underline cursor-pointer flex items-center gap-2">
                     <LinkIcon className="w-3.5 h-3.5" /> [Partner] 서울문화비전센터
                  </td>
                  <td className="px-6 py-4">
                     <div className="text-neutral-500 font-mono text-xs max-w-sm truncate flex items-center gap-1.5">
                       <ExternalLink className="w-3 h-3" /> http://old-domain.seoul.go.kr
                     </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-danger-600">
                     500
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
