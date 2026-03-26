import * as React from "react"
import { cn } from "@/components/ui/button"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "reviewed" | "issue" | "success"
}

export function Chip({ className, variant = "default", ...props }: ChipProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-pill h-[34px] px-[14px] text-body-sm font-medium border"
  
  // Variants based on Token 9.2
  const variants = {
    default: "bg-surface-soft text-neutral-600 border-line-default",
    primary: "bg-brand-100 text-brand-700 border-[#BFD8F6]", // Topic/Pillar
    reviewed: "bg-trust-bg text-trust-text border-trust-line", // 검수
    issue: "bg-danger-bg text-danger-text border-danger-line", // 주의
    success: "bg-success-bg text-success-text border-success-line" // 정상
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
}
