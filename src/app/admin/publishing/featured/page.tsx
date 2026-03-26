import { Search, Plus, GripVertical, Star, MonitorSmartphone, TypeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedContents } from "@/lib/actions/publishing"
import { Chip } from "@/components/ui/chip"

export default async function AdminPublishingFeaturedPage() {
  const contents = await getFeaturedContents()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Featured Content Curation</h1>
        <p className="text-body text-neutral-600">메인 홈페이지의 히어로 배너 및 주요 섹션에 고정될 핵심 콘텐츠의 노출 순서를 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left col: Groups */}
         <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-line-default shadow-sm p-4 flex flex-col gap-2">
               <h3 className="font-bold text-neutral-900 text-[15px] mb-2 px-2">Placement Areas</h3>
               <Button variant="secondary" className="justify-start bg-brand-50 text-brand-700 font-bold border-brand-100">
                  <MonitorSmartphone className="w-4 h-4 mr-2" /> Homepage Hero (3)
               </Button>
               <Button variant="tool" className="justify-start text-neutral-600 hover:bg-neutral-50 px-4">
                  <Star className="w-4 h-4 mr-2 text-warning-400" /> Editor&apos;s Pick (4)
               </Button>
               <Button variant="tool" className="justify-start text-neutral-600 hover:bg-neutral-50 px-4">
                  <TypeIcon className="w-4 h-4 mr-2 text-neutral-400" /> Webzine Highlights (6)
               </Button>
            </div>
         </div>

         {/* Right col: Editor */}
         <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
                <div className="font-bold text-neutral-700 text-[15px] flex items-center gap-2">
                   <MonitorSmartphone className="w-4 h-4 text-brand-500" /> Homepage Hero Area
                </div>
                <Button variant="primary" size="sm" disabled><Plus className="w-4 h-4 mr-1" /> 콘텐츠 추가</Button>
              </div>
              
              <div className="p-4 bg-neutral-50/30 flex flex-col gap-2 min-h-[400px]">
                 {contents.length === 0 ? (
                    <div className="border-2 border-dashed border-line-strong rounded-xl p-12 flex flex-col items-center justify-center text-center">
                       <Star className="w-8 h-8 text-neutral-300 mb-3" />
                       <h4 className="font-bold text-neutral-700 mb-1">고정된 콘텐츠가 없습니다.</h4>
                       <p className="text-xs text-neutral-500 max-w-[200px]">우측 상단의 버튼을 눌러 콘텐츠를 추가해 보세요.</p>
                    </div>
                 ) : contents.map((item, idx) => (
                    <div key={item.id} className="bg-white border border-line-default rounded-xl p-3 flex items-center gap-4 hover:border-brand-300 transition-colors shadow-sm group">
                       <button className="p-2 text-neutral-300 hover:text-neutral-500 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                       </button>
                       <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-500">
                          {idx + 1}
                       </div>
                       <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{item.content_type}</span>
                            {!item.is_active && <Chip variant="issue">Disabled</Chip>}
                          </div>
                          <span className="font-bold text-neutral-900 text-sm truncate max-w-[300px]">
                             {item.title_override || `Content ${item.content_id.slice(0,8)}`}
                          </span>
                       </div>
                       <Button variant="secondary" size="sm" className="px-3">Edit</Button>
                    </div>
                 ))}
              </div>
            </div>
         </div>
      </div>
    </div>
  )
}
