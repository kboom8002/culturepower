"use client"

import { useState, useEffect } from "react"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Loader2, FileText } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getBriefById, updateBrief, deleteBrief, createBrief } from "@/lib/actions/brief"
import { submitToReview } from "@/lib/actions/review"
import { getTopics, getCategories, ContentTopic, TaxonomyItem } from "@/lib/actions/content"

export default function AdminEditBriefPage() {
  const params = useParams()
  const router = useRouter()
  const briefId = params.id as string
  const isNew = briefId === "new"

  const [title, setTitle] = useState("")
  const [coreQuestion, setCoreQuestion] = useState("")
  const [oneLineAnswer, setOneLineAnswer] = useState("")
  const [topPoints, setTopPoints] = useState<string[]>(["", "", ""])
  const [bodyHtml, setBodyHtml] = useState("")
  const [topicId, setTopicId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [pdfAssetId, setPdfAssetId] = useState("")
  
  const [topics, setTopics] = useState<ContentTopic[]>([])
  const [categories, setCategories] = useState<TaxonomyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function init() {
      const [fetchedTopics, fetchedCategories] = await Promise.all([getTopics(), getCategories()])
      setTopics(fetchedTopics)
      setCategories(fetchedCategories)
      
      if (!isNew) {
         const br = await getBriefById(briefId)
         if (br) {
            setTitle(br.title)
            setCoreQuestion(br.core_question || "")
            setOneLineAnswer(br.one_line_answer || "")
            setTopPoints(br.top_points && br.top_points.length > 0 ? br.top_points : ["", "", ""])
            setBodyHtml(br.body)
            if (br.topic_id) setTopicId(br.topic_id)
            if (br.category_id) setCategoryId(br.category_id)
            if (br.pdf_asset_id) setPdfAssetId(br.pdf_asset_id)
         }
      } else {
         if (fetchedTopics.length > 0) setTopicId(fetchedTopics[0].id)
      }
      setIsLoading(false)
    }
    init()
  }, [isNew, briefId])

  const handlePointChange = (index: number, text: string) => {
     const newPoints = [...topPoints]
     newPoints[index] = text
     setTopPoints(newPoints)
  }

  const handleSave = async (status: 'Draft' | 'Review') => {
    if (!title || !coreQuestion || !oneLineAnswer) return alert("필수 항목(제목, 핵심 질문, 한 줄 요약)을 모두 입력하세요.")
    setIsSaving(true)
    
    const validPoints = topPoints.filter(p => p.trim() !== "")
    
    const payload = {
      title,
      core_question: coreQuestion,
      one_line_answer: oneLineAnswer,
      top_points: validPoints,
      body: bodyHtml,
      topic_id: topicId || null,
      category_id: categoryId || null,
      pdf_asset_id: pdfAssetId || null,
      status
    }
    
    if (isNew) {
       const res = await createBrief(payload)
       if (res.success) {
          if (status === 'Review') await submitToReview('Brief', res.data.id)
          alert("성공적으로 저장 및 요청되었습니다.")
          router.push("/admin/content/briefs")
       } else alert(`실패: ${res.error}`)
    } else {
       const res = await updateBrief(briefId, payload)
       if (res.success) {
          if (status === 'Review') await submitToReview('Brief', briefId)
          alert("적용되었습니다.")
       } else alert(`실패: ${res.error}`)
    }
    setIsSaving(false)
  }

  if (isLoading) return <div className="p-24 flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-50 -mx-8 -my-8 px-8 py-8 relative">
       {/* Sticky Header */}
       <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border border-line-default rounded-2xl mb-8 flex items-center justify-between shadow-sm p-4">
          <div className="flex items-center gap-4">
             <Link href="/admin/content/briefs" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors">
               <ArrowLeft className="w-5 h-5" />
             </Link>
             <h1 className="font-bold text-[18px] text-neutral-900">{isNew ? "새 브리프 작성" : "브리프 수정"}</h1>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="secondary" size="sm" onClick={() => handleSave('Draft')} disabled={isSaving}>
               {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 임시저장
             </Button>
             <Button variant="primary" size="sm" onClick={() => handleSave('Review')} disabled={isSaving}>
               {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileCheck className="w-4 h-4 mr-2" />} 발행 승인 큐 등록
             </Button>
          </div>
       </div>

       <div className="flex lg:flex-row flex-col gap-8 flex-1">
          {/* Main Area */}
          <div className="flex-1 flex flex-col gap-6 max-w-4xl w-full bg-white p-8 rounded-2xl shadow-sm border border-line-default box-border">
             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="브리프 제목을 입력하세요..." className="text-3xl font-extrabold text-neutral-900 bg-transparent border-b border-line-strong pb-4 focus:outline-none focus:border-brand-500 w-full" />
             
             <div className="flex flex-col gap-2 mt-4 bg-brand-50/30 p-4 rounded-xl border border-brand-100">
               <label className="text-sm font-bold text-brand-800">핵심 질문 (Core Question) *</label>
               <input type="text" value={coreQuestion} onChange={(e) => setCoreQuestion(e.target.value)} placeholder="예: 생성형 AI가 문화예술 창작에 미치는 법적 쟁점은?" className="w-full text-lg font-bold text-neutral-900 p-3 rounded-lg border border-line-strong focus:outline-none focus:border-brand-500 bg-white" />
             </div>
             
             <div className="flex flex-col gap-2 bg-success-50/30 p-4 rounded-xl border border-success-100">
               <label className="text-sm font-bold text-success-800">한 줄 요약 (One-Line Answer) *</label>
               <input type="text" value={oneLineAnswer} onChange={(e) => setOneLineAnswer(e.target.value)} placeholder="예: 저작권 침해 기준이 명확하지 않아, 창작자 보호를 위한 새로운 가이드라인 마련이 시급합니다." className="w-full text-[15px] font-medium text-neutral-800 p-3 rounded-lg border border-line-strong focus:outline-none focus:border-success-500 bg-white" />
             </div>
             
             <div className="flex flex-col gap-3 mt-4">
               <label className="text-sm font-bold text-neutral-700">Top Points (핵심 요점 JSON-based) 최대 3개 추천</label>
               {topPoints.map((pt, i) => (
                  <div key={i} className="flex gap-2 items-center">
                     <span className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">{i+1}</span>
                     <input type="text" value={pt} onChange={(e) => handlePointChange(i, e.target.value)} placeholder="핵심 요점을 작성하세요..." className="flex-1 text-sm p-3 rounded-lg border border-line-strong focus:outline-none focus:border-brand-500" />
                  </div>
               ))}
               {topPoints.length < 5 && (
                 <Button variant="secondary" size="sm" type="button" onClick={() => setTopPoints([...topPoints, ""])} className="w-max mt-2">+ 항목 추가</Button>
               )}
             </div>

             <div className="flex flex-col gap-2 mt-6">
                <label className="text-sm font-bold text-neutral-700">심층 해설 본문 (Rich Body Text)</label>
                <div className="border border-line-strong rounded-xl overflow-hidden min-h-[400px]">
                   <RichTextEditor value={bodyHtml} onChange={setBodyHtml} placeholder="브리프 본문을 자유롭게 작성하세요..." />
                </div>
             </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 border-b border-line-soft pb-3 mb-4">분류 및 첨부</h3>
                
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-[12px] font-bold text-neutral-600">Primary Topic</label>
                  <select value={topicId} onChange={(e) => setTopicId(e.target.value)} className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 appearance-none">
                     <option value="">대주제 선택 (필수 입력 수준 아님)</option>
                     {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[12px] font-bold text-neutral-600">Category Tag</label>
                  <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 appearance-none">
                     <option value="">카테고리 선택</option>
                     {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <h3 className="text-[13px] font-bold text-neutral-900 border-b border-line-soft pb-3 mb-4 mt-6">리포트 파일 업로드 연결</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] text-neutral-600">PDF Asset ID</label>
                  <input type="text" value={pdfAssetId} onChange={(e) => setPdfAssetId(e.target.value)} placeholder="Media Library에서 복사한 ID 입력..." className="w-full px-3 py-2 border border-line-strong rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-brand-500 font-mono text-[11px]" />
                  <p className="text-[10px] text-neutral-400 mt-1">자료실(Media Library) 메뉴에서 먼저 PDF를 업로드하고 ID를 복사해 오세요.</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}
