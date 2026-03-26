import { LayoutDashboard, Inbox, CheckSquare, Wrench, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function MissionControlDashboard() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Today</h1>
          <p className="text-body text-neutral-500 font-medium">Tuesday, March 24, 2026</p>
        </div>
        <div className="bg-brand-50 px-4 py-2 rounded-xl text-brand-800 font-bold text-sm border border-brand-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          System Online
        </div>
      </div>

      {/* Main Action Modules */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Inbox Widget */}
        <Link href="/admin/inbox/all" className="bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 group transition-all flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Capture</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-neutral-900 mt-2">12 <span className="text-sm text-neutral-400 font-semibold">Unread</span></div>
            <div className="text-sm font-bold text-neutral-600 mt-1 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
              Inbox Queries <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>

        {/* Review Widget */}
        <Link href="/admin/review/needs" className="bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 group transition-all flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-trust-50 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-trust-text group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-trust-text bg-trust-bg px-2 py-0.5 rounded-md border border-trust-200">Workflow</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-neutral-900 mt-2">14 <span className="text-sm text-neutral-400 font-semibold">Pending</span></div>
            <div className="text-sm font-bold text-neutral-600 mt-1 flex items-center gap-1 group-hover:text-trust-text transition-colors">
              Needs Review <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>

        {/* Content Widget */}
        <Link href="/admin/content/answers" className="bg-white p-5 rounded-2xl border border-line-default shadow-sm hover:border-brand-500 group transition-all flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
             <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-md">Core</span>
          </div>
          <div>
             <div className="text-3xl font-extrabold text-neutral-900 mt-2">8 <span className="text-sm text-neutral-400 font-semibold">Drafts</span></div>
            <div className="text-sm font-bold text-neutral-600 mt-1 flex items-center gap-1 group-hover:text-brand-700 transition-colors">
              AnswerCards <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>

        {/* Fix-It Widget (Danger State Example) */}
        <Link href="/admin/fixit" className="bg-danger-600 p-5 rounded-2xl border border-danger-700 shadow-md hover:bg-danger-700 group transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <Wrench className="w-24 h-24 absolute -right-4 -bottom-4 text-white opacity-20 group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              P0 Critical
            </div>
             <span className="text-xs font-bold text-danger-900 bg-danger-400 px-2 py-0.5 rounded-md">Alert</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-extrabold text-white mt-2">1 <span className="text-sm text-danger-200 font-semibold">Ticket</span></div>
            <div className="text-sm font-bold text-danger-50 mt-1 flex items-center gap-1 opacity-90">
              Fix-It Center <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-line-default shadow-sm w-full mx-auto md:max-w-4xl xl:max-w-none">
        <h2 className="text-[18px] font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-neutral-400" /> Recent Operations Log
        </h2>
        <div className="relative border-l-2 border-line-soft ml-3 space-y-6">
          <div className="relative pl-6">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-[3px] border-white"></span>
            <div className="text-sm text-neutral-500 font-mono mb-1">10 mins ago</div>
            <div className="text-[15px] font-bold text-neutral-900">AnswerCard Published</div>
            <div className="text-sm text-neutral-600">"K-문명 패러다임이 기존 문화정책과 다른 점은 무엇입니까?" (A-1241) was approved by Super Admin and published down the AI Feed.</div>
          </div>
          <div className="relative pl-6">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-trust-text border-[3px] border-white"></span>
             <div className="text-sm text-neutral-500 font-mono mb-1">1 hour ago</div>
            <div className="text-[15px] font-bold text-neutral-900">New Item to Review</div>
            <div className="text-sm text-neutral-600">Editor L requested review for Story "지역 소멸을 박물관 미술관으로 막을 수 있을까" (S-089).</div>
          </div>
          <div className="relative pl-6">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-danger-500 border-[3px] border-white"></span>
             <div className="text-sm text-neutral-500 font-mono mb-1">2 hours ago</div>
            <div className="text-[15px] font-bold text-neutral-900">P0 Fix-It Ticket Raised</div>
            <div className="text-sm text-neutral-600">Automated Link Checker found a 404 in Evidence linked to AnswerCard A-124.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
