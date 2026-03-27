"use client"

import { useState } from "react"
import { Plus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createTopic } from "@/lib/actions/content"
import { useRouter } from "next/navigation"

export function AddTopicButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) return alert("이름과 슬러그는 필수입니다.")
    setIsSubmitting(true)
    const res = await createTopic({ name, slug, description })
    setIsSubmitting(false)
    if (res.success) {
      alert("대주제가 등록되었습니다")
      setIsOpen(false)
      setName("")
      setSlug("")
      setDescription("")
      router.refresh()
    } else {
      alert("등록 실패: " + res.error)
    }
  }

  if (!isOpen) {
    return (
      <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-1" /> Add Topic
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-neutral-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-line-soft">
          <h2 className="font-bold text-lg text-neutral-900">대주제 (Topic) 추가</h2>
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-neutral-700">Topic Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="예: Policy Insight"
              className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500"
              required 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-neutral-700">Slug (URL)</label>
            <input 
              type="text" 
              value={slug} 
              onChange={e => setSlug(e.target.value)} 
              placeholder="예: policy-insight"
              className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500 font-mono text-sm"
              required 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-neutral-700">Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="대주제에 대한 간략한 설명"
              rows={3}
              className="w-full px-3 py-2 border border-line-strong rounded-lg focus:outline-none focus:border-brand-500 resize-none text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>취소</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "등록 완료"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
