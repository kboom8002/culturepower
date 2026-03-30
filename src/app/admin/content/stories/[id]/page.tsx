"use client"

import { useState, useRef, useEffect } from "react"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Image as ImageIcon, Trash2, X, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { getStoryById, updateStory, deleteStory, createStory } from "@/lib/actions/story"
import { submitToReview } from "@/lib/actions/review"
import { getTopics, getExperts, getAnswers, getSections, getCategories, getSeries, getTags, ContentTopic, Expert, Answer, TaxonomyItem } from "@/lib/actions/content"
import { compressImage } from "@/lib/utils/image"

export default function AdminEditStoryPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string
  const isNew = storyId === "new"

  // Data States
  const [title, setTitle] = useState("")
  const [deck, setDeck] = useState("")
  const [sectionId, setSectionId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [seriesId, setSeriesId] = useState("")
  const [topicId, setTopicId] = useState("")
  const [expertIds, setExpertIds] = useState<string[]>([])
  const [relatedAnswerIds, setRelatedAnswerIds] = useState<string[]>([])
  const [bodyHtml, setBodyHtml] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)

  // DB States
  const [topics, setTopics] = useState<ContentTopic[]>([])
  const [experts, setExperts] = useState<Expert[]>([])
  const [availableAnswers, setAvailableAnswers] = useState<Answer[]>([])
  const [sections, setSections] = useState<TaxonomyItem[]>([])
  const [categories, setCategories] = useState<TaxonomyItem[]>([])
  const [seriesList, setSeriesList] = useState<TaxonomyItem[]>([])
  const [tags, setTags] = useState<TaxonomyItem[]>([])

  // Multi select tag tracking
  const [tagIds, setTagIds] = useState<string[]>([])

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  // SSoT Links State
  const [ssotLinks, setSsotLinks] = useState<{id: string, question: string}[]>([])
  const [showSsotDropdown, setShowSsotDropdown] = useState(false)

  // Action States
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [fetchedTopics, fetchedExperts, fetchedAnswers, fetchedSections, fetchedCategories, fetchedSeries, fetchedTags] = await Promise.all([getTopics(), getExperts(), getAnswers(), getSections(), getCategories(), getSeries(), getTags()])
      setTopics(fetchedTopics)
      setExperts(fetchedExperts)
      setAvailableAnswers(fetchedAnswers)
      setSections(fetchedSections)
      setCategories(fetchedCategories)
      setSeriesList(fetchedSeries)
      setTags(fetchedTags)
      
      if (isNew) {
        if (fetchedTopics.length > 0) setTopicId(fetchedTopics[0].id)
        if (fetchedSections.length > 0) setSectionId(fetchedSections[0].id)
        if (fetchedCategories.length > 0) setCategoryId(fetchedCategories[0].id)
      }

      if (!isNew) {
        const story = await getStoryById(storyId)
        if (story) {
           setTitle(story.title || "")
           setDeck(story.deck || "")
           setBodyHtml(story.body || "")
           if (story.topic_id) setTopicId(story.topic_id)
           if (story.section_id) setSectionId(story.section_id)
           if (story.category_id) setCategoryId(story.category_id)
           if (story.series_id) setSeriesId(story.series_id)
           if (story.author_expert_ids) setExpertIds(story.author_expert_ids)
           if (story.related_answer_ids) setRelatedAnswerIds(story.related_answer_ids)
           if (story.tag_ids) setTagIds(story.tag_ids)
           if (story.og_image_url) setThumbnailPreview(story.og_image_url)
        }
      }
      setIsLoadingData(false)
    }
    loadData()
  }, [isNew, storyId])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const compressedObjectUrl = await compressImage(file)
      setThumbnailPreview(compressedObjectUrl)
    }
  }

  const handleRemoveExpert = (id: string) => {
    setExpertIds(expertIds.filter(e => e !== id))
  }

  const handleAddRelatedAnswer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (id && !relatedAnswerIds.includes(id)) {
      setRelatedAnswerIds([...relatedAnswerIds, id])
    }
    e.target.value = "" // reset select
  }

  const handleRemoveRelatedAnswer = (id: string) => {
    setRelatedAnswerIds(relatedAnswerIds.filter(a => a !== id))
  }

  const buildPayload = (status: 'Draft' | 'Review') => {
    return { 
      title, 
      deck, 
      section_id: sectionId || null,
      category_id: categoryId || null,
      series_id: seriesId || null,
      body: bodyHtml, 
      topic_id: topicId || null, 
      author_expert_ids: expertIds,
      related_answer_ids: relatedAnswerIds,
      tag_ids: tagIds,
      status, 
      og_image_url: thumbnailPreview
    }
  }

  const handleSaveDraft = async () => {
    if (!title) {
      alert("제목은 필수입니다.")
      return
    }
    setIsSaving(true)
    const payload = buildPayload('Draft')
    
    try {
      if (isNew) {
        const res = await createStory(payload)
        if(res.success) {
          alert("임시저장 되었습니다")
          router.push("/admin/content/stories")
        } else alert(`실패: ${res.error}`)
      } else {
        const res = await updateStory(storyId, payload)
        if(res.success) {
          alert("저장되었습니다")
        } else alert(`실패: ${res.error}`)
      }
    } catch (e: any) {
      alert(`네트워크/서버 에러가 발생했습니다. (첨부 이미지가 너무 큰 경우일 수 있습니다): ${e.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!title || !bodyHtml || !deck) {
      alert("제목, 요약(Deck), 본문은 필수 입력 항목입니다.")
      return
    }
    if (!thumbnailPreview) {
      if(!confirm("대표 썸네일 이미지가 없습니다. 이대로 발행 대기열에 올리시겠습니까?")) return
    }
    setIsPublishing(true)
    const payload = buildPayload('Review')
    
    try {
      if (isNew) {
        const res = await createStory(payload)
        if(res.success) {
          await submitToReview('Story', res.data.id)
          alert("발행 승인 요청이 큐에 안전하게 등록되었습니다!")
          router.push("/admin/content/stories")
        } else alert(`실패: ${res.error}`)
      } else {
        const res = await updateStory(storyId, payload)
        if(res.success) {
          await submitToReview('Story', res.data.id)
          alert("발행 승인 요청 등록!")
          router.push("/admin/content/stories")
        } else alert(`실패: ${res.error}`)
      }
    } catch (e: any) {
      alert(`네트워크/서버 에러가 발생했습니다. (첨부 이미지가 너무 큰 경우일 수 있습니다): ${e.message}`)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("정말로 이 웹진 기사를 삭제하시겠습니까? 관련 피드 캐시도 무효화됩니다.")) {
      const res = await deleteStory(storyId)
      if (res.success) {
        alert("기사가 삭제되었습니다.")
        router.push("/admin/content/stories")
      } else {
        alert(`삭제 실패: ${res.error}`)
      }
    }
  }

  if (isLoadingData) {
    return <div className="flex items-center justify-center p-24"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <div className="bg-white border-b border-line-default sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">{isNew ? "새 기사 작성 (문강 RIO)" : "문강 RIO 기사 수정"}</h1>
               {!isNew && <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-[11px] font-mono font-bold tracking-wider">{storyId}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isNew && (
              <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50 font-medium">
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={handleSaveDraft} disabled={isSaving || isPublishing} className="font-medium bg-white">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isSaving ? "저장 중..." : "임시저장"}
            </Button>
            <Button variant="primary" size="sm" onClick={handlePublish} disabled={isSaving || isPublishing} className="font-medium">
              {isPublishing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileCheck className="w-4 h-4 mr-2" />}
              {isPublishing ? "처리 중..." : (isNew ? "발행 요청 (큐 등록)" : "수정 및 재승인")}
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[700px] flex flex-col gap-6">
            
            <input 
              type="text" 
              placeholder="기사 제목을 입력하세요" 
              className="w-full text-[28px] md:text-[36px] font-extrabold text-neutral-900 tracking-tight placeholder:text-neutral-300 focus:outline-none bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="border-b border-line-soft -mx-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-line-strong to-transparent opacity-30 transform -translate-y-1/2"></div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-600 tracking-tight">요약 및 하이라이트 (Deck)</label>
              <textarea 
                rows={2}
                placeholder="기사 본문 상단에 노출될 요약 문장을 입력하세요. (SNS 공유 시에도 활용됩니다)" 
                className="w-full text-[15px] leading-relaxed text-neutral-700 p-4 rounded-xl border border-line-strong bg-white focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-none shadow-sm"
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2 flex-1 mt-4">
              <label className="text-sm font-bold text-neutral-600 tracking-tight flex justify-between items-center">
                <span>본문 내용 (사진/서식 지원)</span>
                <span className="text-xs text-brand-600 font-medium bg-brand-50 px-2 py-0.5 rounded">클립보드 이미지 복붙 지원</span>
              </label>
              <div className="rounded-xl border border-line-strong overflow-hidden shadow-sm flex-1 flex flex-col">
                <RichTextEditor 
                  value={bodyHtml}
                  onChange={setBodyHtml}
                  placeholder="이곳에 기사 본문을 자유롭게 작성하세요. 블록 드래그, 이미지 붙여넣기 등이 지원됩니다."
                />
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-line-default shadow-sm flex flex-col gap-6">
            <h3 className="font-bold text-[16px] text-neutral-900 tracking-tight border-b border-line-soft pb-4 border-dashed">문서 속성 및 발행 설정</h3>
            
            {/* Topic Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">대주제 (Primary Topic) *</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
              >
                {topics.length === 0 ? <option value="">토픽 데이터가 없습니다</option> : null}
                {topics.map(t => (
                  <option key={t.id} value={t.id}>{t.name_ko}</option>
                ))}
              </select>
            </div>

            {/* Expert Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">담당 전문가 (Author / Expert)</label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {expertIds.map(eid => {
                  const ex = experts.find(e => e.id === eid)
                  if (!ex) return null
                  return (
                    <div key={eid} className="bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      {ex.name}
                      <button onClick={() => handleRemoveExpert(eid)} className="text-brand-400 hover:text-brand-900 focus:outline-none">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>

              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                defaultValue=""
                onChange={(e) => {
                  const id = e.target.value
                  if (id && !expertIds.includes(id)) setExpertIds([...expertIds, id])
                  e.target.value = ""
                }}
              >
                <option value="">+ (다중 선택) 전문가 명단 추가...</option>
                {experts.map(e => (
                   <option key={e.id} value={e.id}>{e.name} {e.organization ? `(${e.organization})` : ''}</option>
                ))}
              </select>
            </div>

            {/* Section Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">LNB 섹션 (Section) *</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
              >
                <option value="">선택 안함</option>
                {sections.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">기사 카테고리 (Category) *</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">선택 안함</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Series Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">기획 연재 (Series)</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={seriesId}
                onChange={(e) => setSeriesId(e.target.value)}
              >
                <option value="">기획 연재에 속하지 않음</option>
                {seriesList.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Tags Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">단어 태그 (Tags)</label>
              
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
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
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
            
            {/* Thumbnail Upload */}
            <div className="flex flex-col gap-2 pt-2 border-t border-line-soft">
              <label className="text-sm font-bold text-neutral-700 flex justify-between items-center">
                <span>대표 썸네일 (Cover Image)</span>
                {thumbnailPreview && (
                   <button onClick={() => setThumbnailPreview(null)} className="text-[11px] text-danger-500 hover:text-danger-600 font-medium z-10">제거</button>
                )}
              </label>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
                accept="image/png, image/jpeg, image/webp"
                className="hidden" 
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-[4/3] rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden relative group shadow-sm ${thumbnailPreview ? 'border-line-soft bg-black' : 'border-line-strong border-dashed bg-neutral-50 hover:bg-neutral-100 hover:border-brand-300'}`}
              >
                {thumbnailPreview ? (
                  <>
                    <Image src={thumbnailPreview} alt="Thumbnail preview" fill className="object-cover opacity-90 group-hover:opacity-75 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                         <ImageIcon className="w-3.5 h-3.5" /> 이미지 호체
                       </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-line-soft text-brand-500 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-neutral-600 mt-1">클릭하여 이미지 업로드</span>
                    <span className="text-[10px] text-neutral-400">권장 비율 4:3 (JPEG, PNG, WEBP)</span>
                  </>
                )}
              </div>
            </div>

            {/* SSoT Linking */}
            <div className="flex flex-col gap-3 pt-4 border-t border-line-soft">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-neutral-700">SSoT 연결 근거 (정답카드)</label>
              </div>
              
              <div className="flex flex-col gap-2">
                {relatedAnswerIds.map(aid => {
                  const ans = availableAnswers.find(a => a.id === aid)
                  if (!ans) return null
                  return (
                    <div key={aid} className="bg-neutral-50 border border-line-strong rounded-lg p-2 flex items-start justify-between gap-2 shadow-sm relative pr-8">
                       <span className="text-[13px] font-bold text-neutral-800 leading-tight block">{ans.title}</span>
                       <button onClick={() => handleRemoveRelatedAnswer(aid)} className="absolute right-2 top-2 p-1 text-neutral-400 hover:text-danger-500 hover:bg-neutral-200 rounded">
                         <X className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  )
                })}
              </div>

              <select 
                className="w-full mt-1 p-2.5 bg-neutral-50 hover:bg-white border border-line-strong rounded-xl text-[13px] font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                defaultValue=""
                onChange={handleAddRelatedAnswer}
              >
                 <option value="">+ (다중 선택) 연관 정답카드 찾기...</option>
                 {availableAnswers.map(ans => (
                    <option key={ans.id} value={ans.id}>{ans.title.slice(0, 40)}{ans.title.length > 40 ? '...' : ''}</option>
                 ))}
              </select>

              <div className="text-[11px] text-neutral-400 italic">
                다수의 정답카드를 팩트체크 근거로 연결할 수 있습니다.
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
