import { Filter, Plus, FileEdit, Trash2 } from "lucide-react"

export default function AdminTopicsPage() {
  const PILLARS = ["Reform", "Implementation", "Outcomes"]
  const CATEGORIES = ["K-문명", "지역문화", "문화정책", "문화예산", "SSoT 구축", "글로벌 중추국가", "참여·회원"]

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Topics & Pillars</h1>
          <p className="text-body text-neutral-600">콘텐츠를 분류하는 상위 체계(Pillar)와 주제 카테고리를 관리합니다.</p>
        </div>
        <button className="bg-brand-900 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-800 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          새 분류 추가
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 3 Pillars Table */}
        <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-line-soft bg-neutral-50 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-neutral-900">3 Pillars</h2>
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded font-bold">운영 레벨</span>
          </div>
          <div className="divide-y divide-line-soft flex-1">
            {PILLARS.map(p => (
              <div key={p} className="flex flex-col gap-2 p-4 hover:bg-neutral-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 tracking-tight">{p}</span>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button className="hover:text-brand-600 transition-colors"><FileEdit className="w-4 h-4" /></button>
                    <button className="hover:text-danger-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="text-xs text-neutral-500">Connected entities: {Math.floor(Math.random() * 40 + 10)} cards</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Categories Table */}
        <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-line-soft bg-neutral-50 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-neutral-900">7 Core Categories</h2>
            <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-1 rounded font-bold">도메인 레벨</span>
          </div>
          <div className="divide-y divide-line-soft flex-1">
            {CATEGORIES.map(c => (
              <div key={c} className="flex items-center justify-between p-4 hover:bg-neutral-50">
                <span className="font-bold text-neutral-900">{c}</span>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span className="text-xs text-neutral-500 mr-2">{Math.floor(Math.random() * 100 + 5)} cards</span>
                  <button className="hover:text-brand-600 transition-colors"><FileEdit className="w-4 h-4" /></button>
                  <button className="hover:text-danger-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
