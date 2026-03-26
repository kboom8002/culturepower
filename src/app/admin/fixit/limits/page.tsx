import { ShieldBan, Search, Lock } from "lucide-react"

export default function AdminFixitLimitsPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">API Limits & Firewall</h1>
        <p className="text-body text-neutral-600">악성 트래픽 방어용 IP 차단 및 Vercel Edge 레이트 리밋 설정 콘솔입니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Rate Limiting Configuration */}
         <div className="bg-white rounded-3xl border border-line-default shadow-sm p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-line-soft pb-4">
               <Lock className="w-6 h-6 text-brand-600" />
               <h3 className="font-bold text-neutral-900 text-lg">Edge Rate Limiting</h3>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-sm text-neutral-700">Max Requests per 10 seconds (per IP)</span>
                  <input type="number" defaultValue="60" disabled className="px-3 py-2 border border-line-strong rounded-lg bg-neutral-100 font-mono text-neutral-500 cursor-not-allowed" />
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-sm text-neutral-700">DDoS Protection Threshold</span>
                  <input type="text" defaultValue="High (Challenge on Suspicious)" disabled className="px-3 py-2 border border-line-strong rounded-lg bg-neutral-100 font-mono text-neutral-500 cursor-not-allowed" />
               </div>
            </div>
         </div>

         {/* IP Blocklist */}
         <div className="bg-white rounded-3xl border border-line-default shadow-sm p-0 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-line-soft">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <ShieldBan className="w-6 h-6 text-danger-600" />
                     <h3 className="font-bold text-neutral-900 text-lg">Active IP Blocklist</h3>
                  </div>
               </div>
               <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                     type="text" 
                     placeholder="Search banned IP addresses..."
                     className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[300px] p-6 pt-0">
               <div className="flex flex-col gap-2 mt-4">
                  {[
                     { ip: "192.168.1.104", reason: "Brute Force Auth", date: "Oct 25" },
                     { ip: "10.0.0.52", reason: "Rate Limit Exceeded", date: "Oct 24" },
                     { ip: "172.16.254.1", reason: "Known Malicious", date: "Oct 20" },
                  ].map((block, i) => (
                     <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-line-soft bg-neutral-50">
                        <div className="flex flex-col">
                           <span className="font-bold text-danger-700 font-mono text-sm">{block.ip}</span>
                           <span className="text-xs text-neutral-500 mt-0.5">{block.reason} • {block.date}</span>
                        </div>
                        <button className="text-xs font-bold text-neutral-500 hover:text-brand-600">Unban</button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
