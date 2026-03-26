import { Server, Cpu, Database, Network } from "lucide-react"

export default function AdminObservatoryPerformancePage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">System Performance</h1>
        <p className="text-body text-neutral-600">서버, 데이터베이스, 네트워크 등 인프라 아키텍처의 실시간 성능을 모니터링합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* API Latency */}
         <div className="bg-white p-6 rounded-3xl border border-line-default shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Network className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="font-bold text-neutral-900">API Response Time</h3>
                  <span className="text-xs text-neutral-500">Global Average (ms)</span>
               </div>
            </div>
            <div className="text-5xl font-black text-neutral-900 tracking-tighter">
               124 <span className="text-2xl font-bold text-neutral-400">ms</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
               <div className="bg-success-500 w-1/4 h-full rounded-full" />
            </div>
            <p className="text-xs text-neutral-500">Status: <strong className="text-success-600">Healthy</strong> (Threshold: &lt; 300ms)</p>
         </div>

         {/* Database Load */}
         <div className="bg-white p-6 rounded-3xl border border-line-default shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Database className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="font-bold text-neutral-900">Database Active Connections</h3>
                  <span className="text-xs text-neutral-500">Supabase Postgres Pool</span>
               </div>
            </div>
            <div className="text-5xl font-black text-neutral-900 tracking-tighter">
               42 <span className="text-2xl font-bold text-neutral-400">/ 100</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
               <div className="bg-warning-500 w-[42%] h-full rounded-full" />
            </div>
            <p className="text-xs text-neutral-500">Status: <strong className="text-warning-600">Moderate</strong> (Scaling required if &gt; 80%)</p>
         </div>

         {/* Server CPU */}
         <div className="bg-white p-6 rounded-3xl border border-line-default shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600">
                  <Cpu className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="font-bold text-neutral-900">Vercel Edge Compute</h3>
                  <span className="text-xs text-neutral-500">Invocation Load</span>
               </div>
            </div>
            <div className="text-5xl font-black text-neutral-900 tracking-tighter">
               Stable
            </div>
            <p className="text-sm text-neutral-500 mt-2">Serverless function executions are operating within normal limits.</p>
         </div>

         {/* Server Uptime */}
         <div className="bg-[#1C2127] p-6 rounded-3xl border border-neutral-800 shadow-sm flex flex-col gap-6 text-white relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Server className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="font-bold text-white">System Uptime</h3>
                  <span className="text-xs text-neutral-400">Last 90 days</span>
               </div>
            </div>
            <div className="text-5xl font-black tracking-tighter text-success-400 relative z-10">
               99.98<span className="text-2xl">%</span>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <Server className="w-48 h-48" />
            </div>
         </div>
      </div>
    </div>
  )
}
