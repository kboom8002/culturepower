"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getVideoById, updateVideo, createVideo, deleteVideo, getEvents, ArchiveEvent } from "@/lib/actions/archive"

export default function AdminEditVideoPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoId = params.id as string
  const isNew = videoId === "new"

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [embedUrl, setEmbedUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [duration, setDuration] = useState("0")
  const [relatedEventId, setRelatedEventId] = useState("")
  const [status, setStatus] = useState("Draft")
  
  const [events, setEvents] = useState<ArchiveEvent[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load Events for the dropdown
    getEvents().then(evts => {
      setEvents(evts)
      
      if (!isNew) {
        getVideoById(videoId).then(vid => {
          if (vid) {
             setTitle(vid.title)
             setSummary(vid.summary || "")
             setSourceUrl(vid.source_url || "")
             setEmbedUrl(vid.embed_url || "")
             setThumbnailUrl(vid.thumbnail_url || "")
             setDuration(vid.duration_seconds?.toString() || "0")
             setRelatedEventId(vid.related_event_id || "")
             setStatus(vid.status || "Draft")
          }
          setIsLoadingData(false)
        })
      } else {
        const prefillEventId = searchParams.get('event_id')
        if (prefillEventId) setRelatedEventId(prefillEventId)
        setIsLoadingData(false)
      }
    })
  }, [isNew, videoId])

  const handleSave = async (saveStatus: string) => {
    if (!title || !sourceUrl) return alert("제목과 소스 URL은 필수입니다.")
    setIsSaving(true)
    
    setStatus(saveStatus)
    const payload = { 
      title, 
      summary, 
      source_url: sourceUrl, 
      embed_url: embedUrl || null,
      thumbnail_url: thumbnailUrl || null,
      duration_seconds: parseInt(duration) || 0,
      related_event_id: relatedEventId || null,
      status: saveStatus 
    }
    
    if (isNew) {
      const res = await createVideo(payload)
      if(res.success) router.push("/admin/archive/videos")
      else alert(res.error)
    } else {
      const res = await updateVideo(videoId, payload)
      if(res.success) alert("저장되었습니다.")
      else alert(res.error)
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (confirm("정말로 이 영상 기록을 삭제하시겠습니까?")) {
      const res = await deleteVideo(videoId)
      if (res.success) router.push("/admin/archive/videos")
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
               <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">{isNew ? "새 영상 등록" : "영상 수정"}</h1>
               {!isNew && <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-[11px] font-mono font-bold tracking-wider">{videoId.slice(0,8)}</span>}
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
            <label className="text-sm font-bold text-neutral-700">영상 제목 <span className="text-danger-500">*</span></label>
            <input 
              type="text" 
              placeholder="영상 제목을 입력하세요" 
              className="w-full p-3 border rounded-xl text-neutral-900 focus:outline-none focus:border-brand-500"
              value={title} onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">유튜브/소스 URL <span className="text-danger-500">*</span></label>
            <input 
              type="url" 
              placeholder="https://youtube.com/watch?v=..." 
              className="w-full p-3 border rounded-xl focus:outline-none focus:border-brand-500"
              value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">연결된 행사 (Related Event)</label>
              <select className="p-3 border rounded-xl" value={relatedEventId} onChange={e => setRelatedEventId(e.target.value)}>
                <option value="">-- 행사 선택 안 함 --</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
              <p className="text-xs text-neutral-500">이 영상을 아카이빙할 행사를 지정합니다.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">재생 시간 (초)</label>
              <input 
                type="number" 
                className="p-3 border rounded-xl focus:outline-none focus:border-brand-500"
                value={duration} onChange={e => setDuration(e.target.value)}
                placeholder="예: 360"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">영상 설명 요약 (Summary)</label>
            <textarea rows={4} className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:border-brand-500" value={summary} onChange={e => setSummary(e.target.value)} placeholder="영상에 대한 간락한 설명을 작성하세요." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">에셋 정보 (선택적)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <input type="text" placeholder="Embed Iframe URL (옵션)" className="w-full p-3 border rounded-xl text-sm" value={embedUrl} onChange={e => setEmbedUrl(e.target.value)} />
               </div>
               <div>
                  <input type="text" placeholder="Custom Thumbnail URL (옵션)" className="w-full p-3 border rounded-xl text-sm" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} />
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
