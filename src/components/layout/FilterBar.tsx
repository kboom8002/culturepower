"use client";

import { useState } from "react"
import { Chip } from "@/components/ui/chip"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterBarProps {
  options: FilterOption[]
  initialValue?: string
  onChange?: (value: string) => void
}

export function FilterBar({ options, initialValue, onChange }: FilterBarProps) {
  const [activeValue, setActiveValue] = useState(initialValue || options[0]?.value)

  const handleSelect = (value: string) => {
    setActiveValue(value)
    if (onChange) onChange(value)
  }

  return (
    <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-line-strong mb-8 relative">
      {options.map((opt) => {
        const isActive = activeValue === opt.value
        return (
          <button 
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className="shrink-0 focus:outline-none"
          >
            <Chip 
              variant={isActive ? "primary" : "default"} 
              className={isActive ? "bg-brand-900 text-white border-brand-900" : "hover:bg-neutral-100"}
            >
              {opt.label}
            </Chip>
          </button>
        )
      })}
    </div>
  )
}
