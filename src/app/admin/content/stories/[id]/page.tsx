"use client"

import { useState, useRef, useEffect } from "react"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Image as ImageIcon, Trash2, X, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { getStoryById, updateStory, deleteStory, createStory } from "@/lib/actions/story"
import { getExperts, getAnswers, Expert, Answer } from "@/lib/actions/content"

const STORY_CATEGORIES = [
  { value: "editorial", label: "창간사" },
  { value: "interview", label: "스페셜 인터뷰" },
  { value: "insight", label: "Policy Insight" },
  { value: "report", label: "Culture Power Report" },
  { value: "local", label: "지역이 문화가 되다" },
  { value: "people", label: "Culture People" },
  { value: "global", label: "Global & Trend" },
]

export default function AdminEditStoryPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string
  const isNew = storyId === "new"

  // Data States
  const [title, setTitle] = useState("")
  const [deck, setDeck] = useState("")
  const [category, setCategory] = useState("insight")
  const [authorId, setAuthorId] = useState("")
  const [bodyHtml, setBodyHtml] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)

  // DB States
  const [experts, setExperts] = useState<Expert[]>([])
  const [allAnswers, setAllAnswers] = useState<Answer[]>([])

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
      const [fetchedExperts, fetchedAnswers] = await Promise.all([
        getExperts(),
        getAnswers()
      ])
      setExperts(fetchedExperts)
      setAllAnswers(fetchedAnswers)
      if (isNew && fetchedExperts.length > 0) {
        setAuthorId(fetchedExperts[0].id)
      }

      if (!isNew) {
        const story = await getStoryById(storyId)
        if (story) {
           setTitle(story.title || "")
           setDeck(story.deck || "")
           setBodyHtml(story.body || "")
           setCategory(story.section || "insight")
           if (story.author_expert_id) setAuthorId(story.author_expert_id)
           if (story.og_image_url) setThumbnailPreview(story.og_image_url)
           if (story.related_answers_meta) {
               try {
                  setSsotLinks(typeof story.related_answers_meta === 'string' ? JSON.parse(story.related_answers_meta) : story.related_answers_meta)
               } catch (e) {
                  console.error("Failed to parse related_answers_meta", e)
               }
           }
        }
      }
      setIsLoadingData(false)
    }
    loadData()
  }, [isNew, storyId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSsotSelect = (answer: Answer) => {
    if (!ssotLinks.find(link => link.id === answer.id)) {
      setSsotLinks([...ssotLinks, { id: answer.id, question: answer.title }])
    }
    setShowSsotDropdown(false)
  }

  const handleRemoveSsot = (id: string) => {
    setSsotLinks(ssotLinks.filter(link => link.id !== id))
  }

  const buildPayload = (status: 'Draft' | 'Review') => {
    return { 
      title, 
      deck, 
      section: category, 
      body: bodyHtml, 
      author_expert_id: authorId || null, 
      status, 
      og_image_url: thumbnailPreview,
      related_answers_meta: ssotLinks 
    }
  }

  const handleSaveDraft = async () => {
    if (!title) {
      alert("제목은 필수입니다.")
      return
    }
    setIsSaving(true)
    const payload = buildPayload('Draft')
    
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
    setIsSaving(false)
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
    
    if (isNew) {
      const res = await createStory(payload)
      if(res.success) {
        alert("발행 승인 요청이 큐에 안전하게 등록되었습니다!")
        router.push("/admin/content/stories")
      } else alert(`실패: ${res.error}`)
    } else {
      const res = await updateStory(storyId, payload)
      if(res.success) {
        alert("발행 승인 요청 등록!")
        router.push("/admin/content/stories")
      } else alert(`실패: ${res.error}`)
    }
    setIsPublishing(false)
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
            
            {/* Author Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">작성자 (Author)</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                {experts.length === 0 ? <option value="">전문가 풀이 비어있습니다</option> : null}
                {experts.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">카테고리 (LNB 섹션)</label>
              <select 
                className="w-full p-2.5 bg-white border border-line-strong rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:border-brand-500 shadow-sm appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {STORY_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
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
            <div className="flex flex-col gap-3 pt-4 border-t border-line-soft relative">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-neutral-700">SSoT 연결 근거 (정답카드)</label>
                <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">신뢰성 +1</span>
              </div>
              
              {/* Selected Links */}
              <div className="flex flex-col gap-2">
                {ssotLinks.map(link => (
                  <div key={link.id} className="flex items-center justify-between p-2.5 bg-neutral-50 border border-line-soft rounded-lg group">
                    <div className="flex flex-col overflow-hidden mr-2">
                       <span className="text-[10px] font-mono font-bold text-neutral-400 mb-0.5 truncate">{link.id}</span>
                       <span className="text-xs font-medium text-neutral-800 truncate" title={link.question}>{link.question}</span>
                    </div>
                    <button onClick={() => handleRemoveSsot(link.id)} className="p-1.5 text-neutral-400 hover:text-danger-500 hover:bg-danger-50 rounded-md transition-colors shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {ssotLinks.length === 0 && (
                  <div className="text-xs text-neutral-400 italic text-center py-2">
                    연결된 근거 카드가 없습니다.
                  </div>
                )}
              </div>

              {/* Add SSoT Button */}
              <div className="relative">
                <Button 
                  variant="tertiary" 
                  size="sm" 
                  onClick={() => setShowSsotDropdown(!showSsotDropdown)}
                  className="w-full justify-center text-brand-600 font-bold border border-brand-100 bg-brand-50 hover:bg-brand-100 mt-1"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  근거 카드 검색 및 추가
                </Button>
                
                {/* SSoT Dropdown */}
                {showSsotDropdown && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-line-strong rounded-xl shadow-lg z-50 flex flex-col max-h-[240px] overflow-y-auto p-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-line-soft mb-1 flex justify-between items-center sticky top-0 bg-white">
                      <span className="text-[10px] font-bold text-neutral-500">정답카드 목록 ({allAnswers.length}건)</span>
                      <button onClick={() => setShowSsotDropdown(false)} className="text-neutral-400 hover:text-neutral-700"><X className="w-4 h-4"/></button>
                    </div>
                    {allAnswers.length === 0 && <span className="p-4 text-xs text-neutral-400 text-center">등록된 정답카드가 없습니다.</span>}
                    {allAnswers.map(ans => {
                      const isSelected = ssotLinks.some(l => l.id === ans.id)
                      return (
                        <button 
                          key={ans.id} 
                          onClick={() => handleSsotSelect(ans)}
                          disabled={isSelected}
                          className={`text-left p-2 rounded-md text-xs flex flex-col gap-0.5 transition-colors ${isSelected ? 'opacity-50 bg-neutral-50 cursor-not-allowed' : 'hover:bg-neutral-100 text-neutral-800'}`}
                        >
                          <span className="font-mono text-[9px] text-brand-600 font-bold">{ans.topic_id || 'GENERAL'} • {new Date(ans.created_at).toLocaleDateString()}</span>
                          <span className="font-medium truncate max-w-full">{ans.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
