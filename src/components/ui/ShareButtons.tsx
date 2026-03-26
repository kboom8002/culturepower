"use client"

import { useState } from "react"
import { Link2, Check } from "lucide-react"

export function ShareButtons({ title, description }: { title?: string, description?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
      alert("URL 복사에 실패했습니다.")
    }
  }

  const handleKakaoShare = () => {
    // In a real application, this would use window.Kakao.Share.sendDefault
    // For this mock/demo, we'll just show an alert
    alert(`[카카오톡 팝업 열림 Demo]\n\n제목: ${title || document.title}\n설명: ${description || '문화강국네트워크에서 확인하세요.'}\nURL: ${window.location.href}`)
  }

  return (
    <div className="flex items-center gap-2 mt-6 mb-8 pt-6 border-t border-line-soft">
      <span className="text-sm font-bold text-neutral-600 mr-2">공유하기</span>
      <button 
        onClick={handleKakaoShare}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FEE500] text-[#000000] hover:bg-[#F4DC00] transition-colors shadow-sm"
        title="카카오톡으로 공유하기"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 4C7.03 4 3 7.21 3 11.17c0 2.53 1.55 4.75 3.93 6.01-.13.48-.47 1.77-.54 2.05-.08.35.12.35.32.22.15-.1.59-.39 2.21-1.46a9.58 9.58 0 003.08.51c4.97 0 9-3.21 9-7.17S16.97 4 12 4z" />
        </svg>
      </button>
      
      <button 
        onClick={handleCopyUrl}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors shadow-sm"
        title="URL 복사"
      >
        {copied ? <Check className="w-5 h-5 text-success-600" /> : <Link2 className="w-5 h-5" />}
      </button>
      
      {copied && (
        <span className="text-sm font-medium text-success-600 ml-2 animate-in fade-in slide-in-from-left-2 duration-200">
          URL이 복사되었습니다
        </span>
      )}
    </div>
  )
}
