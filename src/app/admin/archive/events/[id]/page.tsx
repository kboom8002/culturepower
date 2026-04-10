"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, FileCheck, Loader2, Video, FileText, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getEventById, updateEvent, createEvent, deleteEvent, getSeriesList, getEventAssetCounts } from "@/lib/actions/archive"
import { getTopics, ContentTopic } from "@/lib/actions/content"
import { ImageUploader } from "@/components/domain/publishing/ImageUploader"

export default function AdminEditEventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const isNew = eventId === "new"

  const [title, setTitle] = useState("")
  const [eventType, setEventType] = useState("Conference")
  const [summary, setSummary] = useState("")
  const [startDate, setStartDate] = useState("")
  const [location, setLocation] = useState("")
  const [topicId, setTopicId] = useState("")
  const [topics, setTopics] = useState<ContentTopic[]>([])
  
  // New State mappings
  const [seriesId, setSeriesId] = useState("")
  const [seriesList, setSeriesList] = useState<any[]>([])
  const [roundNo, setRoundNo] = useState("")
  const [hasResultAssets, setHasResultAssets] = useState(false)
  const [eventStatus, setEventStatus] = useState("")
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [posterImage, setPosterImage] = useState<string | null>(null)

  const [isLoadingData, setIsLoadingData] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [assetCounts, setAssetCounts] = useState({ docs: 0, vids: 0, gals: 0 })

  useEffect(() => {
    Promise.all([getTopics(), getSeriesList()]).then(([t, s]) => {
      setTopics(t)
      setSeriesList(s)
      if (isNew && t.length > 0) setTopicId(t[0].id)
    })

    if (!isNew) {
      getEventById(eventId).then(evt => {
        if (evt) {
           setTitle(evt.title)
           setSummary(evt.summary || "")
           setEventType(evt.event_type || "Conference")
           setStartDate(evt.start_date ? evt.start_date.substring(0, 10) : "")
           setLocation(evt.location || "")
           if (evt.topic_id) setTopicId(evt.topic_id)
           if (evt.series_id) setSeriesId(evt.series_id)
           if (evt.round_no) setRoundNo(evt.round_no.toString())
           setHasResultAssets(evt.has_result_assets || false)
           if (evt.event_status) setEventStatus(evt.event_status)
           if (evt.featured_image_url) setFeaturedImage(evt.featured_image_url)
           if (evt.poster_image_url) setPosterImage(evt.poster_image_url)
        }
        setIsLoadingData(false)
      })
      getEventAssetCounts(eventId).then(setAssetCounts)
    } else {
      setTimeout(() => setIsLoadingData(false), 0)
    }
  }, [isNew, eventId])

  const handleSave = async (status: 'Draft' | 'Public' | 'Closed') => {
    if (!title) return alert("제목은 필수입니다.")
    setIsSaving(true)
    const payload = { 
       title, summary, event_type: eventType, 
       start_date: startDate ? new Date(startDate).toISOString() : null, 
       location, status, topic_id: topicId || null,
       series_id: seriesId || null,
       round_no: roundNo ? parseInt(roundNo) : null,
       has_result_assets: hasResultAssets,
       event_status: eventStatus || null,
       featured_image_url: featuredImage,
       poster_image_url: posterImage
    }
    
    if (isNew) {
      const res = await createEvent(payload)
      if(res.success) router.push("/admin/archive/events")
      else alert(res.error)
    } else {
      const res = await updateEvent(eventId, payload)
      if(res.success) {
         alert("저장되었습니다.")
      }
      else alert(res.error)
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (confirm("정말로 이 행사를 삭제하시겠습니까? 연결된 미디어 링크 연결이 끊어질 수 있습니다.")) {
      const res = await deleteEvent(eventId)
      if (res.success) router.push("/admin/archive/events")
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
               <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">{isNew ? "새 행사 등록" : "행사 수정"}</h1>
               {!isNew && <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-[11px] font-mono font-bold tracking-wider">{eventId.slice(0,8)}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isNew && <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">삭제</Button>}
            <Button variant="secondary" size="sm" onClick={() => handleSave("Draft")} disabled={isSaving}>임시저장</Button>
            <Button variant="primary" size="sm" onClick={() => handleSave("Public")} disabled={isSaving}>
               {isNew ? "즉시 발행" : "저장 및 퍼블리싱"}
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Editor Area */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[600px] flex flex-col gap-6">
          <input 
            type="text" 
            placeholder="행사 제목을 입력하세요" 
            className="w-full text-[28px] font-extrabold text-neutral-900 bg-transparent focus:outline-none placeholder:text-neutral-300"
            value={title} onChange={e => setTitle(e.target.value)}
          />
          <div className="border-b border-line-soft -mx-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">대표 썸네일 (목록 와이드형)</label>
              <ImageUploader value={featuredImage} onChange={setFeaturedImage} bucket="curation_assets" aspectRatio="aspect-[2/1]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">행사 포스터 (상세 세로형 원본)</label>
              <ImageUploader value={posterImage} onChange={setPosterImage} bucket="curation_assets" aspectRatio="aspect-[3/4]" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">대주제 (Topic)</label>
              <select className="p-2.5 border rounded-xl bg-white" value={topicId} onChange={e => setTopicId(e.target.value)}>
                {topics.length === 0 && <option value="">대주제 정보 없음</option>}
                {topics.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">소속 시리즈 (옵션)</label>
              <select className="p-2.5 border rounded-xl" value={seriesId} onChange={e => setSeriesId(e.target.value)}>
                <option value="">시리즈 없음</option>
                {seriesList.map(s => <option key={s.id} value={s.id}>{s.name_ko}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">진행 회차 (옵션)</label>
              <input type="number" className="p-2.5 border rounded-xl" placeholder="예: 3" value={roundNo} onChange={e => setRoundNo(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">행사 분류</label>
              <select className="p-2.5 border rounded-xl" value={eventType} onChange={e => setEventType(e.target.value)}>
                <option value="Conference">컨퍼런스/토론회</option>
                <option value="Exhibition">문학/전시</option>
                <option value="Seminar">세미나</option>
                <option value="Campaign">캠페인</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-neutral-700">장소</label>
               <input type="text" className="p-2.5 border rounded-xl" placeholder="예: 서울 DDP" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-neutral-700">시작 일자</label>
               <input type="date" className="p-2.5 border rounded-xl" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-soft p-4 rounded-xl border border-line-soft">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">진행 상태 오버라이드</label>
              <select className="p-2.5 border rounded-xl bg-white" value={eventStatus} onChange={e => setEventStatus(e.target.value)}>
                <option value="">자동 계산 (일자 기준)</option>
                <option value="upcoming">예정 (Upcoming)</option>
                <option value="ongoing">진행증 (Ongoing)</option>
                <option value="ended">종료됨 (Ended)</option>
                <option value="archived">자료공개됨 (Archived)</option>
              </select>
            </div>
            <div className="flex flex-col justify-center h-full pt-4">
              <label className="flex items-center gap-2 cursor-pointer p-4 border rounded-xl bg-white hover:border-brand-500 transition-colors h-full">
                <input type="checkbox" className="w-5 h-5 accent-brand-600" checked={hasResultAssets} onChange={e => setHasResultAssets(e.target.checked)} />
                <span className="text-sm font-bold text-neutral-900">결과/아카이브 자료 공개 여부</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-2 border-t border-line-soft pt-6">
            <label className="text-sm font-bold text-neutral-700">행사 요약/개요 (Main Body)</label>
            <textarea rows={8} className="w-full p-4 border rounded-xl resize-none" placeholder="행사에 대한 설명을 기입하세요. 이 내용은 본문에 렌더링됩니다." value={summary} onChange={e => setSummary(e.target.value)} />
          </div>
        </div>

        {/* Completion Checklist (Right Sidebar) */}
        {!isNew && (
          <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
            <div className="bg-brand-900 p-6 rounded-3xl shadow-xl flex flex-col gap-5 text-white">
              <h3 className="font-bold text-[18px] border-b border-brand-700 pb-3">미디어 애셋 기록</h3>
              <p className="text-xs text-brand-200 leading-relaxed">
                 행사가 종료된 후 관련 아카이브 자료가 업로드되었는지 트래킹합니다. 모든 자료가 완비되면 좌측의 '진행 상태 오버라이드'를 Archived로 변경하세요.
              </p>
              
              <div className="flex flex-col gap-3">
                 <Link href={`/admin/archive/documents/new?event_id=${eventId}`} className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5 hover:bg-white/20 transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${assetCounts.docs > 0 ? "text-brand-300" : "text-neutral-500"}`} />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-brand-100">자료집 / 발제문</div>
                        <div className="text-[10px] text-brand-200/70">{assetCounts.docs > 0 ? `${assetCounts.docs}건 등록됨` : '등록된 문서 없음 - 클릭시 추가'}</div>
                      </div>
                    </div>
                    {assetCounts.docs > 0 && <div className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center"><FileCheck className="w-3 h-3 text-brand-300" /></div>}
                 </Link>
                 
                 <Link href={`/admin/archive/videos/new?event_id=${eventId}`} className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5 hover:bg-white/20 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Video className={`w-5 h-5 ${assetCounts.vids > 0 ? "text-brand-300" : "text-neutral-500"}`} />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-brand-100">영상 기록</div>
                        <div className="text-[10px] text-brand-200/70">{assetCounts.vids > 0 ? `${assetCounts.vids}건 등록됨` : '등록된 영상 없음 - 클릭시 추가'}</div>
                      </div>
                    </div>
                    {assetCounts.vids > 0 && <div className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center"><FileCheck className="w-3 h-3 text-brand-300" /></div>}
                 </Link>

                 <Link href={`/admin/archive/galleries/new?event_id=${eventId}`} className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/5 hover:bg-white/20 transition-colors group">
                    <div className="flex items-center gap-3">
                      <ImageIcon className={`w-5 h-5 ${assetCounts.gals > 0 ? "text-brand-300" : "text-neutral-500"}`} />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-brand-100">사진 갤러리</div>
                        <div className="text-[10px] text-brand-200/70">{assetCounts.gals > 0 ? `${assetCounts.gals}건 등록됨` : '등록된 갤러리 없음 - 클릭시 추가'}</div>
                      </div>
                    </div>
                    {assetCounts.gals > 0 && <div className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center"><FileCheck className="w-3 h-3 text-brand-300" /></div>}
                 </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
