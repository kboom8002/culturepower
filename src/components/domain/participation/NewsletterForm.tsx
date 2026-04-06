"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { subscribeToNewsletter } from "@/lib/actions/participation"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    setMessage("")

    try {
      const formData = new FormData()
      formData.append("email", email)
      
      const result = await subscribeToNewsletter(formData)
      
      if (result.error) {
        setStatus("error")
        setMessage(result.error)
      } else {
        setStatus("success")
        setMessage(result.message || "구독 신청이 완료되었습니다!")
        setEmail("")
      }
    } catch (err) {
      setStatus("error")
      setMessage("서버와 통신 중 오류가 발생했습니다.")
    }
  }

  if (status === "success") {
    return (
      <div className="w-full flex items-center justify-between mt-auto bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl font-bold">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>{message}</span>
        </div>
        <Button variant="tertiary" className="text-green-700 hover:bg-green-100" onClick={() => setStatus("idle")}>추가 구독</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-auto flex flex-col gap-3">
      {status === "error" && (
        <p className="text-sm font-bold text-red-500">{message}</p>
      )}
      <input 
        type="email" 
        required 
        placeholder="이메일 주소를 입력해주세요"
        className="w-full px-4 py-3.5 bg-white border border-line-strong rounded-xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all font-medium text-neutral-900 placeholder:text-neutral-400 shadow-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
      />
      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="w-full justify-between"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
           <span className="flex items-center justify-center w-full"><Loader2 className="w-5 h-5 animate-spin mr-2" /> 처리중...</span>
        ) : (
           <>이메일 구독 신청 <ArrowRight className="w-5 h-5" /></>
        )}
      </Button>
    </form>
  )
}
