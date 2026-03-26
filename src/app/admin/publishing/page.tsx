import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Check } from "lucide-react"

const MOCK_QUEUE = [
  { id: "A101", type: "Answer", title: "지역소멸 방어를 위한 정책 제언", status: "Review", reviewer: "김에디터", hasEvidence: true, publishable: true },
  { id: "A102", type: "Answer", title: "K-콘텐츠 수출액 증가율 통계", status: "Review", reviewer: null, hasEvidence: true, publishable: false, error: "검수자(Reviewer) 미지정" },
  { id: "A103", type: "Answer", title: "전통 건축의 글로벌화 전략", status: "Draft", reviewer: "최디렉터", hasEvidence: false, publishable: false, error: "공식 근거(Evidence) 누락" },
]

export default function PublishingQueuePage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Publishing Control Center</h1>
        <p className="text-body text-neutral-600">Manage the release queue. Items must pass strict SSoT guards before going Public.</p>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-line-default flex items-center justify-between">
          <h2 className="text-h4 text-neutral-800">Pending Release Queue</h2>
          <Button variant="secondary" size="sm">Refresh List</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-soft border-b border-line-default text-caption font-semibold text-neutral-500 uppercase">
                <th className="px-6 py-4">ID / Type</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Guard Checks</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-default">
              {MOCK_QUEUE.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-body-sm font-medium text-neutral-900">{item.id}</div>
                    <div className="text-caption text-neutral-500">{item.type}</div>
                  </td>
                  <td className="px-6 py-4 text-body-sm text-neutral-800 max-w-xs truncate">{item.title}</td>
                  <td className="px-6 py-4">
                    <Chip variant="reviewed">{item.status}</Chip>
                  </td>
                  <td className="px-6 py-4">
                    {item.publishable ? (
                      <div className="flex items-center text-success-text text-caption font-medium gap-1.5">
                        <Check className="w-4 h-4" /> Ready to Publish
                      </div>
                    ) : (
                      <div className="flex items-center text-danger-text text-caption font-medium gap-1.5 p-2 bg-danger-bg rounded-lg inline-flex">
                        <ShieldAlert className="w-4 h-4" /> Blocking: {item.error}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      disabled={!item.publishable}
                      className={!item.publishable ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Publish Now
                    </Button>
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
