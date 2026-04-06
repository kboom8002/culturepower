"use client"

import { useState } from "react"
import { MessageSquarePlus, X, Send, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitInboxItem } from "@/lib/actions/inbox"

export function GlobalInboxForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const [type, setType] = useState<"Question" | "Suggestion" | "Correction">("Question")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("type", type)
      formData.append("email", email)
      formData.append("content", content)
      // Extract a short subject from content
      const subject = content.split('\n')[0].substring(0, 30) + (content.length > 30 ? "..." : "")
      formData.append("subject", subject)

      const result = await submitInboxItem(formData)
      if (result.error) {
        setStatus("error")
        setErrorMessage(result.error)
      } else {
        setStatus("success")
      }
    } catch (err) {
      setStatus("error")
      setErrorMessage("서버와 통신 중 오류가 발생했습니다.")
    }
  }

  const resetForm = () => {
    setStatus("idle")
    setContent("")
    setType("Question")
    // Keep email for convenience
  }

  return (
    <>
      {/* Floating Button Component */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-brand-900 text-white rounded-full shadow-xl hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-brand-500/30 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'}`}
        aria-label="문의 및 제안하기"
      >
        <MessageSquarePlus className="w-7 h-7" />
      </button>

      {/* Popover Form Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-neutral-900/40 backdrop-blur-sm transition-opacity flex items-end sm:items-center justify-center sm:p-4 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`w-full sm:w-[450px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-out transform ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-8 sm:scale-95'}`}
          onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Header */}
          <div className="bg-brand-900 px-6 py-5 flex items-center justify-between text-white">
            <div>
              <h3 className="font-bold text-lg">💡 의견 남기기</h3>
              <p className="text-brand-200 text-sm opacity-90 mt-0.5">질문, 제안, 정정 사항을 자유롭게 알려주세요.</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors -mr-2">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {status === "success" ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2">접수되었습니다!</h4>
                <p className="text-neutral-600 mb-8 max-w-[240px] text-balance">
                  소중한 의견 감사드립니다.<br/>담당팀이 빠르게 검토 후 지식 자산으로 반영하겠습니다.
                </p>
                <Button variant="secondary" onClick={resetForm} className="w-full">
                  새 의견 다시 쓰기
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === "error" && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}
                
                {/* Type Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-700">제보 유형 <span className="text-brand-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Question", "Suggestion", "Correction"] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`py-2 px-1 text-[13px] font-bold rounded-lg border text-center transition-colors ${type === t ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm' : 'bg-white border-line-soft text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`}
                      >
                        {t === 'Question' ? "🤔 질문" : t === 'Suggestion' ? "💡 제안" : "🔧 정정"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-700">답변 받을 이메일 <span className="text-neutral-400 font-normal ml-1">(선택)</span></label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-4 py-2.5 bg-surface-soft border border-line-strong rounded-xl outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>

                {/* Content Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-neutral-700">상세 내용 <span className="text-brand-500">*</span></label>
                  <textarea
                    required
                    rows={4}
                    placeholder={type === 'Question' ? "궁금한 정책이나 정보에 대해 자세히 물어보세요." : type === 'Suggestion' ? "행사 의견이나 새로운 주제를 제안해주세요." : "수정이 필요한 페이지나 잘못된 정보를 정확히 짚어주세요."}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-surface-soft border border-line-strong rounded-xl outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-neutral-900 placeholder:text-neutral-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={status === "loading" || !content.trim()}
                  className="mt-2"
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> 전송 중...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> 의견 보내기</>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
