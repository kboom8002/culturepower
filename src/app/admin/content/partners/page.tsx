import { Plus, Building2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPartners } from "@/lib/actions/content"
import { Chip } from "@/components/ui/chip"

export default async function AdminPartnersPage() {
  const partners = await getPartners()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Partners</h1>
        <p className="text-body text-neutral-600">콘텐츠 제공 및 후원에 협력하는 정부부처, 지자체, 민간 파트너 기관들을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="font-bold text-neutral-700 p-2 text-sm flex items-center gap-2">
             <Building2 className="w-5 h-5 text-brand-500" />
             {partners.length} Partners Registered
          </div>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Partner</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-16">Logo</th>
                <th className="px-6 py-4">Partner Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Website</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {partners.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 파트너가 없습니다.</td></tr>
              ) : partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="w-10 h-10 rounded-lg bg-white border border-line-default shadow-sm flex items-center justify-center p-1 overflow-hidden">
                        {partner.logo_url ? <img src={partner.logo_url} alt="Logo" className="w-full h-full object-contain" /> : <Building2 className="w-5 h-5 text-neutral-300" />}
                     </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900">
                     {partner.name}
                     {!partner.is_active && <span className="ml-2 text-[10px] text-danger-500 uppercase">Disabled</span>}
                  </td>
                  <td className="px-6 py-4">
                     {partner.type ? <Chip variant="default">{partner.type}</Chip> : '-'}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                     {partner.website_url ? (
                        <a href={partner.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
                           {partner.website_url.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
                        </a>
                     ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="secondary" size="sm" className="px-3">Edit</Button>
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
