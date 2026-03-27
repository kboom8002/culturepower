import { SearchCode, CheckCircle2, Clock, AlertTriangle, FileText, HelpCircle } from "lucide-react"
import { getSitemapStatus } from "@/lib/actions/seo"
import { Button } from "@/components/ui/button"

export default async function AdminPublishingSitemapPage() {
  const items = await getSitemapStatus()
  const mismatchCount = items.filter(i => i.is_mismatched).length

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Sitemap Generation</h1>
        <p className="text-body text-neutral-600">콘텐츠의 발행일과 실제 수정일(UpdatedAt)의 차이를 검사하여 Indexing 누락 방지를 돕는 뷰입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-2">
           <SearchCode className="w-6 h-6 text-brand-500 mb-2" />
           <h3 className="font-bold text-[18px] text-neutral-900">Sitemap Index</h3>
           <p className="text-sm text-neutral-500">/sitemap.xml</p>
           <div className={`mt-4 flex items-center gap-2 text-sm font-bold ${mismatchCount > 0 ? 'text-warning-600' : 'text-success-600'}`}>
              {mismatchCount > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              {items.length} URLs indexed ({mismatchCount} mismatches)
           </div>
        </div>
        
        <div className="md:col-span-2 bg-white rounded-3xl border border-line-default shadow-sm p-6 flex flex-col gap-4">
           <div className="flex items-center justify-between">
             <h3 className="font-bold text-[16px] text-neutral-900">Auto Generation</h3>
             <Button variant="tertiary" size="sm" disabled>지금 재생성 핑</Button>
           </div>
           <div className="bg-neutral-50 p-4 rounded-xl text-sm text-neutral-500">
             문화강국네트워크의 사이트맵은 정적 내보내기가 아니라 동적 API로 구축되도록 설계되었습니다. 따라서 퍼블릭 상태인 게시물은 검색엔진에 실시간으로 반영됩니다.<br />
             다만, 본 페이지 하단 테이블에서는 <strong className="text-danger-600">실시간 수정일(DB)</strong>과 <strong className="text-success-600">캐시/배포일(Sitemap Lastmod)</strong> 간의 괴리 스코어를 검사합니다.
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-brand-500" /> URL Lastmod Inspections
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-12">Type</th>
                <th className="px-6 py-4">Locator(URL) & Title</th>
                <th className="px-6 py-4 text-right">DB Updated At</th>
                <th className="px-6 py-4 text-right">Sitemap Lastmod</th>
                <th className="px-6 py-4 w-28 text-center">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
               {items.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">생성된 엔트리가 없습니다.</td></tr>
               ) : items.map((item) => (
                 <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                   <td className="px-6 py-4">
                      {item.content_type === 'Story' ? (
                         <span className="flex items-center justify-center bg-brand-50 text-brand-600 w-8 h-8 rounded-lg" title="Webzine Story"><FileText className="w-4 h-4" /></span>
                       ) : (
                         <span className="flex items-center justify-center bg-purple-50 text-purple-600 w-8 h-8 rounded-lg" title="Knowledge Answer"><HelpCircle className="w-4 h-4" /></span>
                       )}
                   </td>
                   <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900">{item.title}</div>
                      <div className="text-brand-500 font-mono text-[11px] mt-0.5">{item.loc}</div>
                   </td>
                   <td className="px-6 py-4 text-right font-mono text-xs text-neutral-500">
                      {new Date(item.db_updated_at).toLocaleString()}
                   </td>
                   <td className="px-6 py-4 text-right font-mono text-xs text-neutral-500">
                      {item.lastmod ? new Date(item.lastmod).toLocaleString() : 'N/A'}
                   </td>
                   <td className="px-6 py-4 text-center">
                     {item.is_mismatched ? (
                       <span className="text-xs bg-warning-50 text-warning-700 px-2 py-1 rounded font-bold">MISMATCH</span>
                     ) : (
                       <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded font-bold">SYNCED</span>
                     )}
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
