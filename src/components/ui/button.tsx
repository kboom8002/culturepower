import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "secondary" | "tertiary" | "tool"
  size?: "lg" | "md" | "sm"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Core Button Styles
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-700 disabled:pointer-events-none disabled:opacity-50"
    
    // Variants based on Design Token 8.2
    const variants = {
      primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-sm rounded-md border border-brand-700",
      secondary: "bg-white text-brand-700 hover:bg-surface-soft shadow-sm rounded-md border border-brand-700",
      tertiary: "bg-transparent text-neutral-600 hover:text-neutral-900 rounded-sm border border-line-default hover:bg-surface-soft",
      tool: "bg-brand-900 text-white hover:bg-brand-800 rounded-md shadow-sm border border-brand-900",
    }
    
    // Sizes based on Design Token 8.1
    const sizes = {
      lg: "h-[52px] px-6 text-[16px]",
      md: "h-[44px] px-5 text-[15px]",
      sm: "h-[36px] px-4 text-[14px]",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
