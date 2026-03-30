"use client"

import { useState, useEffect } from "react"
import { Save, Eye, ArrowLeft, PenTool, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getAnswerById, upsertAnswer, getExperts, getTopics, getCategories, getTags, Expert, ContentTopic, TaxonomyItem } from "@/lib/actions/content"
import { submitToReview } from "@/lib/actions/review"
import { RichTextEditor } from "@/components/ui/RichTextEditor"

export default function AdminAnswerEditorPage() {
  const params = useParams()
  const router = useRouter()
  const answerId = params.id as string
  const isNew = answerId === 'new'

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [bodyHtml, setBodyHtml] = useState("")
  const [expertIds, setExpertIds] = useState<string[]>([])
  const [topicId, setTopicId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [tagIds, setTagIds] = useState<string[]>([])
  const [status, setStatus] = useState<'Draft' | 'Review' | 'Scheduled' | 'Public' | 'Archived'>('Draft')
  
  const [experts, setExperts] = useState<Expert[]>([])
  const [topics, setTopics] = useState<ContentTopic[]>([])
  const [categories, setCategories] = useState<TaxonomyItem[]>([])
  const [tags, setTags] = useState<TaxonomyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function init() {
      const [fetchedExperts, fetchedTopics, fetchedCategories, fetchedTags] = await Promise.all([
        getExperts(),
        getTopics(),
        getCategories(),
        getTags()
      ])
      setExperts(fetchedExperts)
      setTopics(fetchedTopics)
      setCategories(fetchedCategories)
      setTags(fetchedTags)
      if (isNew) {
        if (fetchedTopics.length > 0) setTopicId(fetchedTopics[0].id)
        if (fetchedCategories.length > 0) setCategoryId(fetchedCategories[0].id)
      }

      if (!isNew) {
        const ans = await getAnswerById(answerId)
        if (ans) {
          setTitle(ans.title || "")
          setSummary(ans.summary || "")
          setBodyHtml(ans.content_body || "")
          if (ans.topic_id) setTopicId(ans.topic_id)
          if (ans.category_id) setCategoryId(ans.category_id)
          if (ans.expert_ids) setExpertIds(ans.expert_ids)
          if (ans.tag_ids) setTagIds(ans.tag_ids)
          setStatus(ans.status)
        }
      }
      setIsLoading(false)
    }
    init()
  }, [answerId, isNew])

  const handleSave = async (targetStatus: 'Draft' | 'Review') => {
    if (!title) {
       alert("질문 타이틀을 입력해주세요.")
       return
    }
    setIsSaving(true)
    const payload = {
       title,
       summary,
       content_body: bodyHtml,
       expert_ids: expertIds,
       topic_id: topicId || null,
       category_id: categoryId || null,
       tag_ids: tagIds,
       status: targetStatus
    }
    
    try {
      const res = await upsertAnswer(answerId, payload)
      if (res.success) {
         if (targetStatus === 'Review') {
            await submitToReview('Answer', res.id as string)
         }
         alert(targetStatus === 'Draft' ? "임시저장 완료" : "승인 큐 등록 완료")
         router.push("/admin/content/answers")
      } else {
         alert("에러: " + res.error)
      }
    } catch (e: any) {
      alert(`저장 중 네트워크/서버 에러가 발생했습니다. (첨부 이미지가 너무 큰 경우일 수 있습니다): ${e.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center p-24"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
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
                      {status}
                   </span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="secondary" onClick={() => handleSave('Draft')} disabled={isSaving} className="px-6 min-w-[120px]">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
                {isNew ? '임시저장' : '수정사항 저장'}
             </Button>
             <Button variant="tool" onClick={() => handleSave('Review')} disabled={isSaving} className="px-4 bg-brand-50 text-brand-700 hover:bg-brand-100">
                <PenTool className="w-4 h-4 mr-2" /> 승인 큐 등록
             </Button>
          </div>
       </div>

       {/* Editor Body */}
       <div className="flex lg:flex-row flex-col gap-8 flex-1">
          {/* Main Editing Area */}
          <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full">
             <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="사용자들이 궁금해하는 질문 타이틀을 입력하세요..." 
               className="text-4xl font-extrabold text-neutral-900 bg-transparent border-none placeholder:text-neutral-300 focus:outline-none focus:ring-0 px-0 py-2 w-full"
             />
             
             <textarea 
               value={summary}
               onChange={(e) => setSummary(e.target.value)}
               placeholder="정답에 핵심 요약 한 줄 (Summary)..." 
               rows={2}
               className="text-lg font-medium text-neutral-600 bg-transparent border border-line-soft rounded-xl p-4 placeholder:text-neutral-400 focus:outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-500/10 w-full resize-none leading-relaxed"
             />

             <div className="rounded-2xl flex-1 flex flex-col shadow-sm">
                 <div className="bg-brand-50/50 text-xs text-brand-700 font-bold p-2 border border-b-0 border-line-strong rounded-t-2xl">
                     본문 (Rich Text 지원, 클립보드 이미지 복붙 가능)
                 </div>
                 <RichTextEditor 
                  value={bodyHtml}
                  onChange={setBodyHtml}
                  placeholder="질문에 대한 구체적인 정답과 근거를 자유롭게 작성해 주세요..."
                 />
             </div>
          </div>

          {/* Right Sidebar (Metadata) */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
             {/* Expert Assignment */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4 flex items-center justify-between">
                   <span>담당 전문가 (Author / Expert)</span>
                </h3>
                <div className="flex flex-col gap-2">
                   <div className="flex flex-wrap gap-2 mb-2">
                     {expertIds.map(eid => {
                       const ex = experts.find(e => e.id === eid)
                       if (!ex) return null
                       return (
                         <div key={eid} className="bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                           {ex.name}
                           <button onClick={() => setExpertIds(expertIds.filter(id => id !== eid))} className="text-brand-400 hover:text-brand-900 focus:outline-none">
                             <X className="w-3 h-3" />
                           </button>
                         </div>
                       )
                     })}
                   </div>
                   
                   <select 
                     value=""
                     onChange={(e) => {
                       const id = e.target.value
                       if (id && !expertIds.includes(id)) {
                         setExpertIds([...expertIds, id])
                       }
                     }}
                     className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none"
                   >
                     <option value="">+ (다중 선택) 전문가 명단 추가...</option>
                     {experts.map(e => (
                       <option key={e.id} value={e.id}>{e.name} {e.organization ? `(${e.organization})` : ''}</option>
                     ))}
                   </select>
                </div>
             </div>

             {/* Topic Classification */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4">
                   대주제 (Topic)
                </h3>
                <div className="flex flex-col gap-2">
                   <select 
                     value={topicId}
                     onChange={(e) => setTopicId(e.target.value)}
                     className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none"
                   >
                      {topics.length === 0 && <option value="">주제를 등록해야 합니다</option>}
                      {topics.map(t => (
                         <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                   </select>
                </div>
             </div>

             {/* Category Field */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm mt-6">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4">
                   카테고리 (Category)
                </h3>
                <div className="flex flex-col gap-2">
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none"
                  >
                     <option value="">선택 안함</option>
                     {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                  </select>
                </div>
             </div>

             {/* Tags Field */}
             <div className="bg-white rounded-2xl border border-line-default p-5 shadow-sm mt-6">
                <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest mb-4">
                   단어 태그 (Tags)
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tagIds.map(tid => {
                      const tagItem = tags.find(t => t.id === tid)
                      if (!tagItem) return null
                      return (
                        <div key={tid} className="bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          #{tagItem.name}
                          <button onClick={() => setTagIds(tagIds.filter(id => id !== tid))} className="text-neutral-400 hover:text-neutral-900 focus:outline-none">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <select 
                    className="w-full bg-neutral-50 border border-line-strong rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-500 appearance-none"
                    defaultValue=""
                    onChange={(e) => {
                      const id = e.target.value
                      if (id && !tagIds.includes(id)) setTagIds([...tagIds, id])
                      e.target.value = ""
                    }}
                  >
                    <option value="">+ (다중 선택) 기존 태그 추가...</option>
                    {tags.map(t => (
                       <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}
