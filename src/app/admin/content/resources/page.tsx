import { Plus, FileText, Download, FileJson2, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getResources } from "@/lib/actions/content"

export default async function AdminResourcesPage() {
  const resources = await getResources()

  const getFileIcon = (type: string | null) => {
     if (!type) return <FileText className="w-4 h-4 text-neutral-400" />
     const t = type.toUpperCase()
     if (t === 'PDF') return <FileText className="w-4 h-4 text-danger-500" />
     if (t === 'ZIP') return <FileArchive className="w-4 h-4 text-warning-600" />
     if (t === 'CSV' || t === 'JSON') return <FileJson2 className="w-4 h-4 text-purple-600" />
     return <FileText className="w-4 h-4 text-neutral-400" />
  }

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Content Resources</h1>
        <p className="text-body text-neutral-600">웹진이나 정답카드에 첨부될 수 있는 파일 묶음(통계 PDF, 양식 문서 등)을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="font-bold text-neutral-700 p-2 text-sm flex items-center gap-2">
             <Download className="w-5 h-5 text-brand-500" />
             {resources.length} Downloadable Files
          </div>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> Upload Resource</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Title & Description</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Uploaded</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {resources.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 파일이 없습니다.</td></tr>
              ) : resources.map((res) => (
                <tr key={res.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex flex-col max-w-[300px]">
                        <span className="font-bold text-neutral-900 truncate">{res.title}</span>
                        <span className="text-xs text-neutral-500 truncate mt-0.5">{res.description || '-'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5">
                        {getFileIcon(res.file_type)}
                        <span className="font-bold text-xs">{res.file_type || 'Unknown'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-600">
                     {res.file_size_bytes ? `${(res.file_size_bytes / 1024 / 1024).toFixed(2)} MB` : '-'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-400">
                     {res.created_at ? new Date(res.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="secondary" size="sm" className="px-3" disabled>Copy Link</Button>
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
