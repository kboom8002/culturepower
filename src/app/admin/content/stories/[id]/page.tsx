"use client"

import { useState } from "react"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Image as ImageIcon, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
  const storyId = params.id as string

  // Mock pre-populated data
  const [title, setTitle] = useState("지역 소멸을 박물관 미술관으로 막을 수 있을까")
  const [deck, setDeck] = useState("문체부와 한국문화예술위원회가 주관한 특별 컨퍼런스 기조 연설 요약")
  const [category, setCategory] = useState("insight")
  const [bodyHtml, setBodyHtml] = useState("<p>본문 내용이 여기에 들어갑니다. 지역 소멸의 위기감 속에서...</p>")
  
  const handleSaveDraft = () => {
    alert("임시저장 되었습니다 (Demo)")
  }

  const handlePublish = () => {
    if (!title || !bodyHtml) {
      alert("제목과 본문은 필수입니다.")
      return
    }
    alert("발행 승인 요청이 큐에 등록되었습니다. (Demo)")
  }

  const handleDelete = () => {
    if(confirm("정말로 이 웹진 기사를 삭제하시겠습니까? 관련 피드 캐시도 무효화됩니다.")) {
       alert("기사가 삭제되었습니다.")
       // redirect back
       window.location.href = '/admin/content/stories'
    }
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <div className="bg-white border-b border-line-default sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/content/stories" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
               <h1 className="text-[20px] font-bold text-neutral-900">문강 RIO 기사 수정</h1>
               <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-xs font-mono font-bold">{storyId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="tertiary" size="sm" onClick={handleDelete} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
              <Trash2 className="w-4 h-4 mr-2" />
              기사 삭제
            </Button>
            <Button variant="tertiary" size="sm" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              변경사항 임시저장
            </Button>
            <Button variant="primary" size="sm" onClick={handlePublish}>
              <FileCheck className="w-4 h-4 mr-2" />
              수정 및 재승인
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 flex gap-8">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl border border-line-default shadow-sm min-h-[600px] flex flex-col gap-6">
            
            <input 
              type="text" 
              placeholder="기사 제목을 입력하세요" 
              className="w-full text-[32px] md:text-[40px] font-bold text-neutral-900 placeholder:text-neutral-300 focus:outline-none bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="border-b border-line-strong -mx-8" />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-600">요약 / 덱 (Deck)</label>
              <textarea 
                rows={3}
                placeholder="기사 본문 상단에 노출될 요약 문장을 입력하세요. 리스트 뷰에서도 표시됩니다." 
                className="w-full text-[16px] text-neutral-700 p-4 rounded-xl border border-line-default bg-surface-soft focus:bg-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold text-neutral-600">본문 내용 (사진/서식 지원)</label>
              <RichTextEditor 
                value={bodyHtml}
                onChange={setBodyHtml}
                placeholder="이곳에 기사 본문을 자유롭게 작성하세요."
              />
            </div>

          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-80 hidden lg:flex flex-col gap-6 shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm flex flex-col gap-5">
            <h3 className="font-bold text-[16px] text-neutral-900 border-b border-line-default pb-3">발행 설정</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-700">카테고리 (LNB)</label>
              <select 
                className="w-full p-2.5 bg-surface-soft border border-line-default rounded-lg text-sm text-neutral-800 focus:outline-none focus:border-brand-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {STORY_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-bold text-neutral-700">대표 썸네일</label>
              <div className="w-full aspect-video bg-neutral-100 rounded-lg border border-line-soft flex flex-col items-center justify-center text-neutral-400 gap-2 cursor-pointer hover:bg-neutral-200 transition-colors">
                <ImageIcon className="w-6 h-6" />
                <span className="text-xs font-medium">썸네일 변경/업로드</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-bold text-neutral-700">SSoT 연결 근거 추가</label>
              <Button variant="tertiary" size="sm" className="w-full justify-start text-neutral-600 font-normal">
                + 관련 정답카드 선택
              </Button>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
