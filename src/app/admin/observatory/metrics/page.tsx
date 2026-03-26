import { Activity, Users, Eye, TrendingUp, BarChart3 } from "lucide-react"

export default function AdminObservatoryMetricsPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Metrics & Logs</h1>
        <p className="text-body text-neutral-600">SSoT 플랫폼 방문자 통계와 콘텐츠 소비 로그 현황입니다.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-neutral-500">
               <span className="font-bold text-sm">Monthly Active Users</span>
               <Users className="w-5 h-5 text-brand-500" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-extrabold text-neutral-900">12,405</span>
               <span className="text-xs font-bold text-success-500 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +14%</span>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-neutral-500">
               <span className="font-bold text-sm">Total Page Views</span>
               <Eye className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-extrabold text-neutral-900">842K</span>
               <span className="text-xs font-bold text-success-500 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +5%</span>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-neutral-500">
               <span className="font-bold text-sm">Avg. Session Duration</span>
               <Activity className="w-5 h-5 text-warning-500" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-extrabold text-neutral-900">4m 12s</span>
               <span className="text-xs font-bold text-danger-500 flex items-center">-2s</span>
            </div>
         </div>
      </div>

      {/* Mock Chart Area */}
      <div className="bg-white rounded-3xl border border-line-default shadow-sm p-8 min-h-[400px] flex flex-col gap-6">
         <div className="flex items-center justify-between border-b border-line-soft pb-4">
            <h3 className="font-bold text-neutral-900 text-lg flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-neutral-400" /> Access Trends (Last 30 Days)
            </h3>
         </div>
         <div className="flex-1 w-full bg-neutral-50 rounded-xl border border-line-soft border-dashed flex items-center justify-center p-8">
            <div className="flex items-end gap-2 w-full h-full justify-between px-10">
               {[40, 60, 45, 80, 50, 90, 100, 75, 60, 85].map((h, i) => (
                  <div key={i} className="w-full bg-brand-500 rounded-t-lg hover:bg-brand-600 transition-colors" style={{ height: `${h}%` }} />
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}
