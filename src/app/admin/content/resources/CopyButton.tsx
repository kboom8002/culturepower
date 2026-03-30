"use client"

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="secondary" size="sm" type="button" onClick={handleCopy} className="w-full text-xs">
      {copied ? <Check className="w-3.5 h-3.5 mr-1 text-success-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
      {copied ? "Copied!" : "Copy URL"}
    </Button>
  )
}
