import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { ArrowLeft, Save, Link as LinkIcon, History, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminPartnerDetailPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"
  const partnerName = isNew ? "새 파트너 등록" : "한국문화예술위원회"

  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-4">
        <Link href="/admin/content/partners" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Partners
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">{partnerName}</h1>
            {!isNew && <Chip variant="success">Public</Chip>}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Main Content Form */}
        <div className="w-full xl:flex-1 flex flex-col gap-8">
          
          <div className="bg-white rounded-2xl border border-line-default shadow-sm p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-neutral-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-700">Organization Name *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 rounded-xl border border-line-strong text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                  placeholder="예: 한국문화예술위원회"
                  defaultValue={!isNew ? "한국문화예술위원회" : ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-neutral-700">Type *</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-line-strong text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none bg-white"
                  defaultValue={!isNew ? "협력기관" : ""}
                >
                  <option value="" disabled>분류 선택</option>
                  <option value="협력기관">협력기관</option>
                  <option value="후원기관">후원기관</option>
                  <option value="학술단체">학술단체</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">Relation Summary (협력/후원 내용)</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-line-strong text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors min-h-[100px] resize-y"
                placeholder="해당 기관과의 협력 및 후원 관계를 간략히 요약합니다."
                defaultValue={!isNew ? "공동 캠페인 및 콘텐츠 교류, 연 2회 문화예술 토론회 공동 주최" : ""}
              />
            </div>
          </div>

          {!isNew && (
            <div className="bg-white rounded-2xl border border-line-default shadow-sm p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900">Linked Objects</h2>
                <Button variant="secondary" size="sm" className="gap-2">
                  <LinkIcon className="w-3.5 h-3.5" />
                  Link New
                </Button>
              </div>
              
              <div className="flex flex-col gap-0 border border-line-soft rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-b border-line-soft">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-[11px] font-bold rounded">Event</span>
                    <span className="font-medium text-sm text-neutral-900 hover:text-brand-600 cursor-pointer">2026 문화예술 정책 포럼</span>
                  </div>
                  <Button variant="tertiary" size="sm" className="text-danger-500">Unlink</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-neutral-50/50">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded">Topic</span>
                    <span className="font-medium text-sm text-neutral-900 hover:text-brand-600 cursor-pointer">지역문화 진흥 방향</span>
                  </div>
                  <Button variant="tertiary" size="sm" className="text-danger-500">Unlink</Button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side Panel */}
        <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-line-soft font-bold text-neutral-900 flex flex-col gap-1">
              Publishing Options
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <select className="flex-1 px-3 py-2 bg-neutral-50 border border-line-strong rounded-lg text-sm font-medium focus:outline-none focus:border-brand-500" defaultValue="Public">
                    <option value="Draft">Draft</option>
                    <option value="Review">Needs Review</option>
                    <option value="Public">Public (Live)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Owner / Reviewer</span>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px] font-bold">ED</div>
                    Editor Account
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
             <div className="p-5 border-b border-line-soft font-bold text-neutral-900 flex items-center gap-2">
               <AlertCircle className="w-4 h-4 text-warning-500" />
               Validation
             </div>
             <div className="p-4 text-sm text-neutral-600 bg-warning-50/50 border-b border-warning-100">
               이 파트너와 연결된 Event가 1개 이상 존재하지만, &quot;후원 내용&quot; 필드의 설명이 다소 짧습니다. 보완을 권장합니다.
             </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
             <div className="p-5 border-b border-line-soft font-bold text-neutral-900 flex items-center gap-2">
               <History className="w-4 h-4 text-neutral-400" />
               Recent Activity
             </div>
             <div className="flex flex-col">
                <div className="p-4 border-b border-line-soft flex flex-col gap-1 hover:bg-neutral-50 transition-colors">
                  <span className="text-sm font-medium text-neutral-900">Status changed to Public</span>
                  <span className="text-xs text-neutral-500">by Editor Account • Mar 25, 2026</span>
                </div>
                <div className="p-4 border-b border-line-soft flex flex-col gap-1 hover:bg-neutral-50 transition-colors">
                  <span className="text-sm font-medium text-neutral-900">Linked to Event &quot;2026 포럼&quot;</span>
                  <span className="text-xs text-neutral-500">by Admin • Mar 24, 2026</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
