import { DatabaseBackup, HardDriveDownload, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminFixitRecoveryPage() {
  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Database Recovery (PITR)</h1>
        <p className="text-body text-neutral-600">장애 대응 시뮬레이션: 데이터베이스 자동 스냅샷의 특정 시점 복원(Point-in-Time Recovery)을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-3xl border border-danger-200 shadow-sm p-8 max-w-4xl flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-danger-500" />
        
        <div className="flex items-center gap-4 border-b border-line-soft pb-4">
           <div className="w-12 h-12 bg-danger-50 rounded-xl flex items-center justify-center text-danger-600">
              <DatabaseBackup className="w-6 h-6" />
           </div>
           <div>
              <h3 className="font-bold text-neutral-900 text-lg">System Snapshot List</h3>
              <p className="text-sm text-neutral-500">Last snapshot was automatically taken <strong className="text-neutral-900">4 hours ago</strong>.</p>
           </div>
        </div>

        <div className="flex flex-col gap-3">
           {[
              { time: "Today, 04:00 AM KST", type: "Auto (Daily)", size: "4.2 GB" },
              { time: "Yesterday, 04:00 AM KST", type: "Auto (Daily)", size: "4.15 GB" },
              { time: "Oct 25, 2026, 11:30 PM KST", type: "Manual Override", size: "4.1 GB" },
              { time: "Oct 24, 2026, 04:00 AM KST", type: "Auto (Daily)", size: "4.0 GB" },
           ].map((snap, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-line-default hover:bg-neutral-50/50 transition-colors">
                 <div className="flex items-center gap-4">
                    <HardDriveDownload className="w-5 h-5 text-neutral-400" />
                    <div className="flex flex-col">
                       <span className="font-bold text-neutral-900 font-mono">{snap.time}</span>
                       <span className="text-xs text-neutral-500 mt-0.5">{snap.type} • {snap.size}</span>
                    </div>
                 </div>
                 <Button variant="secondary" size="sm" className="text-danger-600 border-danger-200 hover:bg-danger-50 hover:border-danger-300">
                    <RotateCcw className="w-4 h-4 mr-1.5" /> Rollback to Here
                 </Button>
              </div>
           ))}
        </div>

        <div className="mt-4 p-4 bg-warning-50 rounded-xl text-sm text-warning-800 border border-warning-200">
           <strong>경고:</strong> 롤백(Rollback) 수행 시 선택된 스냅샷 일시 이후 발생한 모든 회원가입, 큐레이터 발행, 콘텐츠 업데이트 기록이 파괴되며 복구할 수 없습니다. 운영 상의 치명적인 DB 오염이 있을 때만 Super Admin 권한으로 실행해야 합니다.
        </div>
      </div>
    </div>
  )
}
