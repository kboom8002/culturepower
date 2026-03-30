import { Plus, Image as ImageIcon, FileText, Download, FileJson2, FileArchive, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMediaAssets } from "@/lib/actions/content"
import { UploadMediaModal } from "./UploadMediaModal"
import { CopyButton } from "./CopyButton"

export default async function AdminResourcesPage() {
  const resources = await getMediaAssets()

  const getFileIcon = (slug: string | undefined) => {
     if (slug === 'cover' || slug === 'portrait' || slug === 'inline') return <ImageIcon className="w-10 h-10 text-brand-300" />
     if (slug === 'pdf') return <FileText className="w-10 h-10 text-danger-300" />
     return <FileText className="w-10 h-10 text-neutral-300" />
  }

  const getFileBadge = (slug: string | undefined) => {
     if (slug === 'cover' || slug === 'portrait' || slug === 'inline') return "IMAGE"
     if (slug === 'pdf') return "DOCUMENT"
     return "OTHER"
  }

  const copyToClipboard = `
    "use client";
    function copy(text) { navigator.clipboard.writeText(text); alert('Copied ID/URL!'); }
  `;

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Media Library</h1>
        <p className="text-body text-neutral-600">콘텐츠 생태계 전반에서 활용되는 고화질 이미지(Thumbnail, Inline, Portrait) 및 다운로드용 PDF 문서를 관리합니다.</p>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-line-default">
         <div className="font-bold text-neutral-700 p-2 text-sm flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-brand-500" />
            {resources.length} Assets Stored
         </div>
         <UploadMediaModal />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {resources.length === 0 ? (
            <div className="col-span-full py-24 text-center text-neutral-500 border-2 border-dashed border-line-strong rounded-2xl bg-white">
               업로드된 미디어 에셋이 없습니다.
            </div>
         ) : resources.map((res) => {
            const isImage = res.asset_type?.slug === 'cover' || res.asset_type?.slug === 'portrait' || res.asset_type?.slug === 'inline' 
            return (
              <div key={res.id} className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col group hover:border-brand-300 hover:shadow-md transition-all">
                <div className="h-40 w-full bg-neutral-100 flex items-center justify-center relative border-b border-line-soft overflow-hidden">
                   {isImage ? (
                      <img src={res.public_url} alt={res.alt_text || 'Asset'} className="w-full h-full object-cover" />
                   ) : (
                      getFileIcon(res.asset_type?.slug)
                   )}
                   <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                      {getFileBadge(res.asset_type?.slug)}
                   </div>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                   <h3 className="font-bold text-neutral-900 text-[14px] truncate" title={res.title || 'Untitled Asset'}>
                      {res.title || 'Untitled Asset'}
                   </h3>
                   <div className="text-[11px] text-neutral-500 mt-1 font-mono truncate" title={res.id}>
                      ID: {res.id}
                   </div>
                   
                   <div className="flex items-center gap-4 mt-4 text-[11px] text-neutral-400 font-medium">
                      {res.bytes && <span>{(res.bytes / 1024).toFixed(1)} KB</span>}
                      {res.width && res.height && <span>{res.width}x{res.height}</span>}
                   </div>
                   
                   <div className="mt-4 pt-4 border-t border-line-soft grid grid-cols-2 gap-2">
                     <form target="_blank" action={res.public_url}>
                       <Button variant="secondary" size="sm" type="submit" className="w-full text-xs hover:bg-neutral-100">원본 보기 (View)</Button>
                     </form>
                     <CopyButton url={res.public_url} />
                   </div>
                </div>
              </div>
            )
         })}
      </div>
    </div>
  )
}
