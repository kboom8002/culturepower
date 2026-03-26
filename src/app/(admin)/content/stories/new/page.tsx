"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Save, FileCheck, ArrowLeft, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

const STORY_CATEGORIES = [
  { value: "editorial", label: "창간사" },
  { value: "interview", label: "스페셜 인터뷰" },
  { value: "insight", label: "Policy Insight" },
  { value: "report", label: "Culture Power Report" },
  { value: "local", label: "지역이 문화가 되다" },
  { value: "people", label: "Culture People" },
  { value: "global", label: "Global & Trend" },
]

export default function AdminNewStoryPage() {
  const [title, setTitle] = useState("")
  const [deck, setDeck] = useState("")
  const [category, setCategory] = useState("insight")
  const [bodyHtml, setBodyHtml] = useState("")
  
  const handleSaveDraft = () => {
    alert("임시저장 되었습니다 (Demo)")
    console.log({ title, deck, category, bodyHtml, status: 'Draft' })
  }

  const handlePublish = () => {
    if (!title || !bodyHtml) {
      alert("제목과 본문은 필수입니다.")
      return
    }
    alert("발행 승인 요청이 큐에 등록되었습니다. (Demo)")
    console.log({ title, deck, category, bodyHtml, status: 'Review' })
  }

  return (
    <div className="flex flex-col w-full bg-surface-page min-h-screen pb-24">
      <div className="bg-white border-b border-line-default sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/publishing" className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-[20px] font-bold text-neutral-900">새 기사 작성 (문강 RIO)</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="tertiary" size="sm" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              임시저장
            </Button>
            <Button variant="primary" size="sm" onClick={handlePublish}>
              <FileCheck className="w-4 h-4 mr-2" />
              발행 큐 등록
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
                placeholder="이곳에 기사 본문을 자유롭게 작성하세요. 상단 툴바를 이용해 굵게, H2/H3 제목, 리스트, 그리고 사진 URL을 첨부할 수 있습니다."
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
                <span className="text-xs font-medium">클릭하여 이미지 업로드</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-bold text-neutral-700">SSoT 연결 근거 (옵션)</label>
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
