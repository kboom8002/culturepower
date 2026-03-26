import { Archive, Video, FileText, CheckCircle2, AlertCircle, UploadCloud, Search } from "lucide-react"

const MOCK_ARCHIVE = [
  { id: "E-401", title: "제1회 K-문명 학술대회", type: "Event", status: "Complete", vods: 3, docs: 12, date: "2026-02-15" },
  { id: "E-402", title: "2026 지역문화 혁신 포럼", type: "Event", status: "Incomplete", vods: 0, docs: 4, date: "2026-03-01" },
  { id: "D-899", title: "지역문화혁신 발제문 전체 취합본", type: "Document", status: "Public", vods: "-", docs: "PDF (12MB)", date: "2026-03-05" },
]

export default function ArchiveDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Archive Hub 
        </h1>
        <p className="text-body text-neutral-600">
          종료된 행사(Events), VOD 영상, 발제문 등의 오프라인 지식 자산을 업로드하고 무결성을 확인하는 보관소입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-2">
        <div className="md:col-span-3 bg-white rounded-2xl border border-line-default shadow-sm p-6 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
             <div>
              <h2 className="text-[18px] font-bold text-neutral-900 mb-1">Completion Board</h2>
              <p className="text-sm text-neutral-500">종료된 행사 중 필수 기록물(VOD/문서) 속성이 누락된 고아(Orphan) 객체를 점검합니다.</p>
             </div>
             <div className="text-right">
              <div className="text-3xl font-extrabold text-brand-900">85%</div>
              <div className="text-xs font-bold text-success-600">Health Score</div>
             </div>
          </div>
          
          <div className="bg-danger-50 border border-danger-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger-600 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-danger-900">행사 [E-402: 2026 지역문화 혁신 포럼]</span>
              <span className="text-[13px] text-danger-700">종료된 지 20일이 지났으나 VOD 링크가 연결되지 않았습니다. 아카이빙을 완료해주세요.</span>
            </div>
            <button className="ml-auto px-3 py-1.5 bg-danger-600 text-white text-xs font-bold rounded-lg hover:bg-danger-700 transition">
              Fix Now
            </button>
          </div>
        </div>

        <div className="bg-brand-900 rounded-2xl shadow-sm p-6 flex flex-col gap-3 justify-center text-white">
          <UploadCloud className="w-8 h-8 text-brand-300 mb-2" />
          <h3 className="font-bold text-[16px]">Bulk Upload</h3>
          <p className="text-xs text-brand-200">YouTube URL 또는 다중 PDF 문서를 한 번에 업로드하고 객체에 매핑하세요.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line-default shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-line-soft flex md:flex-row flex-col gap-4 items-center justify-between bg-neutral-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search Events or Documents..."
              className="w-full pl-9 pr-4 py-2 border border-line-strong rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-line-soft">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">VODs</th>
                <th className="px-6 py-4">Docs</th>
                <th className="px-6 py-4">Completion</th>
                <th className="px-6 py-4">Event Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft text-neutral-900">
              {MOCK_ARCHIVE.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-900">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-neutral-900 truncate max-w-sm">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-neutral-600">
                      <Video className="w-4 h-4 text-neutral-400" /> {item.vods}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-neutral-600">
                      <FileText className="w-4 h-4 text-neutral-400" /> {item.docs}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'Complete' || item.status === 'Public' ? (
                      <span className="flex items-center gap-1 text-success-600 font-bold text-xs"><CheckCircle2 className="w-4 h-4"/> OK</span>
                    ) : (
                      <span className="flex items-center gap-1 text-danger-600 font-bold text-xs"><AlertCircle className="w-4 h-4"/> Needs Action</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
