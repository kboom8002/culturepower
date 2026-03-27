import { Plus, Hash, FolderTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTopics } from "@/lib/actions/content"
import { Chip } from "@/components/ui/chip"
import { AddTopicButton } from "./AddTopicButton"

export default async function AdminTopicsPage() {
  const topics = await getTopics()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Content Topics</h1>
        <p className="text-body text-neutral-600">지식카드(Answers)와 웹진(Stories)을 아우르는 글로벌 대주제를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line-soft flex items-center justify-between bg-neutral-50/50">
          <div className="font-bold text-neutral-700 p-2 text-sm flex items-center gap-2">
             <FolderTree className="w-5 h-5 text-brand-500" />
             총 {topics.length}개의 대주제
          </div>
          <AddTopicButton />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1C2127] text-white font-bold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">Topic Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {topics.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500">등록된 대주제가 없습니다.</td></tr>
              ) : topics.map((topic) => (
                <tr key={topic.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="font-bold text-neutral-900 flex items-center gap-1.5"><Hash className="w-3.5 h-3.5 text-neutral-400" /> {topic.name}</span>
                        <span className="text-xs text-neutral-400 font-mono mt-0.5">{topic.slug}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     {topic.is_active ? <Chip variant="success">Active</Chip> : <Chip variant="issue">Disabled</Chip>}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 truncate max-w-sm">
                     {topic.description || <span className="italic text-neutral-300">No description</span>}
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
