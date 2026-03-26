import { Save, Eye, ArrowLeft, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAnswerById } from "@/lib/actions/content"
import { notFound } from "next/navigation"

export default async function AdminAnswerEditorPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === 'new'
  const answer = isNew ? null : await getAnswerById(params.id)

  if (!isNew && !answer) {
    notFound()
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-50 -my-8 p-8 relative">
       {/* Sticky Header */}
       <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-line-soft px-8 py-4 -mx-8 -mt-8 mb-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
             <Link href="/admin/content/answers" className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors bg-neutral-100 hover:bg-neutral-200 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
             </Link>
             <div className="flex flex-col">
                <div className="flex items-center gap-2">
                   <h1 className="font-bold text-[18px] text-neutral-900">{isNew ? '신규 정답카드 작성' : '정답카드 편집'}</h1>
                   <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-bold tracking-wider uppercase">
                      {isNew ? 'Draft' : answer?.status}
                   </span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="secondary" className="px-4"><Eye className="w-4 h-4 mr-2" /> 미리보기</Button>
             <Button variant="primary" className="px-6 min-w-[120px]"><Save className="w-4 h-4 mr-2" /> {isNew ? '임시저장' : '수정사항 저장'}</Button>
             <Button variant="tool" className="px-4 bg-brand-50 text-brand-700 hover:bg-brand-100"><PenTool className="w-4 h-4 mr-2" /> 승인 큐 등록</Button>
          </div>
       </div>

       {/* Editor Body */}
       <div className="flex lg:flex-row flex-col gap-8 flex-1">
          {/* Main Editing Area */}
          <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full">
             <input 
               type="text" 
               defaultValue={answer?.title || ''}
               placeholder="사용자들이 궁금해하는 질문 타이틀을 입력하세요..." 
               className="text-4xl font-extrabold text-neutral-900 bg-transparent border-none placeholder:text-neutral-300 focus:outline-none focus:ring-0 px-0 py-2 w-full"
             />
             
             <textarea 
               defaultValue={answer?.summary || ''}
               placeholder="정답에 핵심 요약 한 줄 (Summary)..." 
               rows={2}
               className="text-lg font-medium text-neutral-600 bg-transparent border border-line-soft rounded-xl p-4 placeholder:text-neutral-400 focus:outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-500/10 w-full resize-none leading-relaxed"
             />

             <div className="border border-line-default bg-white rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm">
                <div className="border-b border-line-soft bg-neutral-50 p-2 flex items-center gap-1 overflow-x-auto">
                   {['H1', 'H2', 'B', 'I', 'U', 'Link', 'Image', 'List', 'Quote'].map((tool) => (
                      <button key={tool} className="px-3 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors">
                         {tool}
                      </button>
                   ))}
                </div>
                <textarea 
                   defaultValue={answer?.content_body || ''}
                   className="flex-1 w-full bg-transparent p-6 text-neutral-800 focus:outline-none resize-none min-h-[500px] leading-loose text-base"
                   placeholder="질문에 대한 구체적인 정답과 근거를 작성해 주세요..."
                />
             </div>
          </div>

          {/* Right Sidebar (Metadata) */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
             {/* Expert Assignment */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                   담당 전문가
                </h3>
                <div className="relative">
                   <select className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none">
                      <option value="">전문가를 선택하세요</option>
                      <option value="1">김문화 박사 (서울문화재단)</option>
                      <option value="2">이정책 연구원 (문화관광연구원)</option>
                   </select>
                </div>
             </div>

             {/* Topic Classification */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4">
                   대주제 (Topic)
                </h3>
                <div className="flex flex-col gap-2">
                   <select className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none">
                      <option value="">대주제 분류</option>
                      <option value="1">정책</option>
                      <option value="2">인프라</option>
                      <option value="3">제도</option>
                   </select>
                </div>
             </div>

             {/* Additional Meta */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4">
                   SEO / Open Graph
                </h3>
                <div className="flex flex-col gap-4">
                   <div className="w-full aspect-video bg-neutral-100 rounded-xl border border-dashed border-line-strong flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors">
                      <span className="text-xs font-bold text-neutral-500">Upload OG Image</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}
