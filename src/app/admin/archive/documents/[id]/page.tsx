"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getDocumentById, updateDocument, createDocument, deleteDocument, getEvents, ArchiveEvent } from "@/lib/actions/archive"

export default function AdminEditDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentId = params.id as string
  const isNew = documentId === "new"

  const [title, setTitle] = useState("")
  const [documentType, setDocumentType] = useState("PDF")
  const [summary, setSummary] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [sourceLabel, setSourceLabel] = useState("")
  const [relatedEventId, setRelatedEventId] = useState("")
  const [status, setStatus] = useState("Draft")
  
  const [events, setEvents] = useState<ArchiveEvent[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    getEvents().then(evts => {
      setEvents(evts)
      
      if (!isNew) {
        getDocumentById(documentId).then(doc => {
          if (doc) {
             setTitle(doc.title)
             setDocumentType(doc.document_type || "PDF")
             setSummary(doc.summary || "")
             setFileUrl(doc.file_url || "")
             setSourceLabel(doc.source_label || "")
             setRelatedEventId(doc.related_event_id || "")
             setStatus(doc.status || "Draft")
          }
          setIsLoadingData(false)
        })
      } else {
        const prefillEventId = searchParams.get('event_id')
        if (prefillEventId) setRelatedEventId(prefillEventId)
        setIsLoadingData(false)
      }
    })
  }, [isNew, documentId])

  const handleSave = async (saveStatus: string) => {
    if (!title || !fileUrl) return alert("제목과 파일 URL은 필수입니다.")
    setIsSaving(true)
    
    setStatus(saveStatus)
    const payload = { 
      title, 
      document_type: documentType,
      summary, 
      file_url: fileUrl, 
      source_label: sourceLabel || null,
      related_event_id: relatedEventId || null,
      status: saveStatus 
    }
    
    if (isNew) {
      const res = await createDocument(payload)
      if(res.success) router.push("/admin/archive/documents")
      else alert(res.error)
    } else {
      const res = await updateDocument(documentId, payload)
      if(res.success) alert("저장되었습니다.")
      else alert(res.error)
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (confirm("정말로 이 문서 기록을 삭제하시겠습니까?")) {
      const res = await deleteDocument(documentId)
      if (res.success) router.push("/admin/archive/documents")
      else alert(`삭제 실패: ${res.error}`)
    }
  }

  if (isLoadingData) return <div className="p-24 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-line-default sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">{isNew ? "새 문서 등록" : "문서 수정"}</h1>
               {!isNew && <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-[11px] font-mono font-bold tracking-wider">{documentId.slice(0,8)}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isNew && <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">삭제</Button>}
            <Button variant="secondary" size="sm" onClick={() => handleSave("Draft")} disabled={isSaving}>임시저장</Button>
            <Button variant="primary" size="sm" onClick={() => handleSave("Public")} disabled={isSaving}>
               {isNew ? "퍼블릭 등록" : "저장 및 퍼블리싱"}
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Editor Area */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[600px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">문서 제목 <span className="text-danger-500">*</span></label>
            <input 
              type="text" 
              placeholder="자료집/발제문 제목을 입력하세요" 
              className="w-full p-3 border rounded-xl text-neutral-900 focus:outline-none focus:border-brand-500"
              value={title} onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-neutral-700">연결된 행사 (Related Event)</label>
               <select className="p-3 border rounded-xl focus:outline-none focus:border-brand-500" value={relatedEventId} onChange={e => setRelatedEventId(e.target.value)}>
                 <option value="">-- 행사 선택 안 함 --</option>
                 {events.map(ev => (
                   <option key={ev.id} value={ev.id}>{ev.title}</option>
                 ))}
               </select>
               <p className="text-xs text-neutral-500">이 문서를 아카이빙할 행사를 지정합니다.</p>
             </div>

             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-neutral-700">문서 타입</label>
               <select className="p-3 border rounded-xl focus:outline-none focus:border-brand-500" value={documentType} onChange={e => setDocumentType(e.target.value)}>
                 <option value="PDF">PDF</option>
                 <option value="Word">Word (.docx)</option>
                 <option value="HWP">한글 (.hwp)</option>
                 <option value="URL">외부 URL 링크</option>
               </select>
             </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">파일 저장소 URL (업로드 링크) <span className="text-danger-500">*</span></label>
            <input 
              type="url" 
              placeholder="https://..." 
              className="w-full p-3 border rounded-xl focus:outline-none focus:border-brand-500"
              value={fileUrl} onChange={e => setFileUrl(e.target.value)}
            />
            <p className="text-xs text-neutral-500">현재 클라우드 스토리지를 별도 연동하지 않으므로 URL 형태로 다운로드/접근 경로를 기재합니다.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">출처 / 라벨 (선택)</label>
            <input 
              type="text" 
              placeholder="예: 기조발제 파트 1" 
              className="w-full p-3 border rounded-xl focus:outline-none focus:border-brand-500"
              value={sourceLabel} onChange={e => setSourceLabel(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">문서 요약 (Summary)</label>
            <textarea rows={4} className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:border-brand-500" value={summary} onChange={e => setSummary(e.target.value)} placeholder="문서에 대한 간락한 개요를 작성하세요." />
          </div>
        </div>
      </main>
    </div>
  )
}
