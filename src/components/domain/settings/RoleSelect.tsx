"use client"

import { useState, useTransition } from "react"
import { updateAdminRole, ADMIN_ROLES } from "@/lib/actions/settings"
import { ShieldAlert, Shield, ChevronDown, Check, Loader2 } from "lucide-react"

export function RoleSelect({ userId, currentRole }: { userId: string, currentRole: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (newRole: string) => {
    setIsOpen(false)
    if (newRole === currentRole) return

    startTransition(async () => {
      await updateAdminRole(userId, newRole)
    })
  }

  // Display badge logic
  const isSuperAdmin = currentRole === 'Super Admin'
  const isEditor = currentRole === '콘텐츠 기획·편집 담당' || currentRole === 'Editor'
  
  let BadgeColor = "bg-neutral-100 text-neutral-600"
  if (isSuperAdmin || currentRole === '운영 총괄') BadgeColor = "bg-danger-50 text-danger-600"
  else if (isEditor || currentRole === '검수자') BadgeColor = "bg-brand-50 text-brand-600"
  
  const DisplayIcon = (isSuperAdmin || currentRole === '운영 총괄') ? ShieldAlert : Shield

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-1.5 font-bold text-xs px-2 py-1.5 rounded w-fit border border-transparent hover:border-line-default transition-all ${BadgeColor} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <DisplayIcon className="w-3 h-3" />}
        <span>{currentRole}</span>
        <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl bg-white shadow-lg border border-line-default py-1 focus:outline-none">
          <div className="px-3 py-2 border-b border-line-soft mb-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Assign Role</span>
          </div>
          {ADMIN_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-colors"
            >
              <span className={role === currentRole ? "font-bold text-brand-600" : "font-medium"}>{role}</span>
              {role === currentRole && <Check className="w-4 h-4 text-brand-600" />}
            </button>
          ))}
        </div>
      )}
      
      {/* Invisible overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
