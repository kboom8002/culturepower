import { Search, Bot, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getJobRuns } from "@/lib/actions/observatory"
import { Chip } from "@/components/ui/chip"

export default async function AdminObservatoryJobsPage() {
  const jobs = await getJobRuns()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">AI & Background Jobs</h1>
        <p className="text-body text-neutral-600">Sitemap, RSS 생성 및 주기적인 AI 웹스크래핑/번역 작업 등의 백그라운드 태스크 실행 로그입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="작업명 검색..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
          <Button variant="secondary" size="sm"><PlayCircle className="w-4 h-4 mr-1.5 text-brand-600" /> 수동 스케줄 트리거</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4 w-12"></th>
                <th className="px-6 py-4">Job Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Output Log</th>
                <th className="px-6 py-4">Executed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {jobs.length === 0 ? (
                 <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-500">실행된 작업 내역이 없습니다.</td></tr>
              ) : jobs.map((job) => (
                <tr key={job.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 text-center">
                     <Bot className="w-4 h-4 text-neutral-400" />
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-900">
                     {job.job_name}
                  </td>
                  <td className="px-6 py-4">
                     {job.status === 'Running' && <Chip variant="reviewed">Running</Chip>}
                     {job.status === 'Success' && <Chip variant="success">Success</Chip>}
                     {job.status === 'Failed' && <Chip variant="issue">Failed</Chip>}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-600">
                     {job.duration_ms ? `${(job.duration_ms / 1000).toFixed(1)}s` : '-'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500 truncate max-w-sm">
                     {job.log_output || '-'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-400">
                     {new Date(job.created_at).toLocaleString()}
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
