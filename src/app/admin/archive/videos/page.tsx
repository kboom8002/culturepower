import { Search, Plus, Filter, Video, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getVideos } from "@/lib/actions/archive"
import { Chip } from "@/components/ui/chip"

export default async function AdminArchiveVideosPage() {
  const videos = await getVideos()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Videos (영상 아카이브)</h1>
        <p className="text-body text-neutral-600">행사 기록 영상, 연설 영상 등 시청각 객체를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex gap-4 items-center justify-between bg-neutral-50/50">
           <div className="font-bold text-neutral-700 p-2">Showing {videos.length} videos</div>
           <Button variant="primary" disabled><Plus className="w-4 h-4 mr-2" /> 새 영상 등록</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Linked Event</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {videos.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500">등록된 영상이 없습니다.</td></tr>
              ) : videos.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold max-w-xs truncate">{item.title}</td>
                  <td className="px-6 py-4 text-brand-600 hover:underline cursor-pointer"><a href={item.source_url} target="_blank" rel="noreferrer">요청 열기</a></td>
                  <td className="px-6 py-4"><Chip variant="default">{item.status}</Chip></td>
                  <td className="px-6 py-4 font-mono text-xs">{item.related_event_id || "-"}</td>
                  <td className="px-6 py-4 text-right"><Button variant="secondary" size="sm" className="px-3" disabled>Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
