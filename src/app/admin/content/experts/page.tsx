import { Plus, UserCircle2, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getExperts } from "@/lib/actions/content"
import { ExpertEditorModal } from "./ExpertEditorModal"

export default async function AdminExpertsPage() {
  const experts = await getExperts()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Experts Directory</h1>
        <p className="text-body text-neutral-600">지식 정답카드 검수 및 웹진 기고에 참여하는 내외부 전문가 프로필을 관리합니다.</p>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-line-default">
         <div className="text-sm font-bold text-neutral-600">Total {experts.length} Experts</div>
         <ExpertEditorModal>
           <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Expert</Button>
         </ExpertEditorModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {experts.length === 0 ? (
            <div className="col-span-full py-20 text-center text-neutral-500">등록된 전문가가 없습니다.</div>
         ) : experts.map(expert => (
            <div key={expert.id} className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
               <div className="h-20 bg-brand-50 w-full"></div>
               <div className="px-6 pb-6 flex flex-col items-center -mt-10">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center overflow-hidden mb-3 text-neutral-200 font-bold object-cover">
                     {expert.profile_image_url ? (
                        <img src={expert.profile_image_url} alt={expert.name} className="w-full h-full object-cover" />
                     ) : (
                        <UserCircle2 className="w-16 h-16" />
                     )}
                  </div>
                  <h3 className="font-extrabold text-[18px] text-neutral-900">{expert.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-600 font-bold mt-1 bg-brand-50 px-2 py-1 rounded">
                     <Briefcase className="w-3 h-3" /> {expert.organization || '자유기고가'}
                  </div>
                  <span className="text-xs text-neutral-500 mt-1">{expert.role}</span>
                  
                  <p className="text-xs text-neutral-600 text-center mt-4 line-clamp-2 min-h-[32px]">
                     {expert.bio || '등록된 약력이 없습니다.'}
                  </p>
                  
                  <div className="mt-5 w-full flex gap-2">
                     <ExpertEditorModal expert={expert}>
                       <Button variant="secondary" size="sm" className="w-full text-xs pointer-events-none">Edit</Button>
                     </ExpertEditorModal>
                     <Button variant="tool" size="sm" className="h-[32px] w-[32px] p-0 shrink-0 text-danger-500 border border-danger-100 hover:bg-danger-50 flex items-center justify-center">✕</Button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}
