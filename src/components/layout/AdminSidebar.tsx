"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  LayoutDashboard, Inbox, FileText, Archive, Users, 
  CheckSquare, Rocket, Activity, Wrench, Settings, ChevronDown, ChevronRight
} from "lucide-react"

const ADMIN_MENUS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    submenus: []
  },
  {
    title: "Inbox",
    icon: Inbox,
    href: "/admin/inbox",
    submenus: [
      { label: "All", href: "/admin/inbox/all" },
      { label: "Questions", href: "/admin/inbox/questions" },
      { label: "Suggestions", href: "/admin/inbox/suggestions" },
      { label: "Corrections", href: "/admin/inbox/corrections" },
      { label: "Participation Inquiries", href: "/admin/inbox/participation" }
    ]
  },
  {
    title: "Content",
    icon: FileText,
    href: "/admin/content",
    submenus: [
      { label: "Topics", href: "/admin/content/topics" },
      { label: "Answers", href: "/admin/content/answers" },
      { label: "Stories", href: "/admin/content/stories" },
      { label: "Experts", href: "/admin/content/experts" },
      { label: "Partners", href: "/admin/content/partners" },
      { label: "Resources", href: "/admin/content/resources" }
    ]
  },
  {
    title: "Archive",
    icon: Archive,
    href: "/admin/archive",
    submenus: [
      { label: "Events", href: "/admin/archive/events" },
      { label: "Videos", href: "/admin/archive/videos" },
      { label: "Documents", href: "/admin/archive/documents" },
      { label: "Galleries", href: "/admin/archive/galleries" },
      { label: "Completion Board", href: "/admin/archive/completion" }
    ]
  },
  {
    title: "Participation",
    icon: Users,
    href: "/admin/participation",
    submenus: [
      { label: "Member Apps", href: "/admin/participation/members" },
      { label: "Newsletter", href: "/admin/participation/newsletter" },
      { label: "Event Regs", href: "/admin/participation/events" },
      { label: "Partnerships", href: "/admin/participation/partnerships" },
      { label: "Segments", href: "/admin/participation/segments" }
    ]
  },
  {
    title: "Review",
    icon: CheckSquare,
    href: "/admin/review",
    submenus: [
      { label: "Needs Review", href: "/admin/review/needs" },
      { label: "My Reviews", href: "/admin/review/mine" },
      { label: "Returned", href: "/admin/review/returned" },
      { label: "Approved", href: "/admin/review/approved" }
    ]
  },
  {
    title: "Publishing",
    icon: Rocket,
    href: "/admin/publishing",
    submenus: [
      { label: "Publish Queue", href: "/admin/publishing/queue" },
      { label: "Scheduled", href: "/admin/publishing/scheduled" },
      { label: "Featured Control", href: "/admin/publishing/featured" },
      { label: "Feed Status", href: "/admin/publishing/feed" },
      { label: "Sitemap Status", href: "/admin/publishing/sitemap" },
      { label: "Link Check", href: "/admin/publishing/links" }
    ]
  },
  {
    title: "Observatory",
    icon: Activity,
    href: "/admin/observatory",
    submenus: [
      { label: "KPI Overview", href: "/admin/observatory/kpi" },
      { label: "Object Health", href: "/admin/observatory/health" },
      { label: "Question Coverage", href: "/admin/observatory/coverage" },
      { label: "Trust Health", href: "/admin/observatory/trust" },
      { label: "Conversion Health", href: "/admin/observatory/conversion" }
    ]
  },
  {
    title: "Fix-It",
    icon: Wrench,
    href: "/admin/fixit",
    submenus: [
      { label: "P0", href: "/admin/fixit/p0" },
      { label: "P1", href: "/admin/fixit/p1" },
      { label: "P2", href: "/admin/fixit/p2" },
      { label: "Root Cause Board", href: "/admin/fixit/rootcause" },
      { label: "Release Log", href: "/admin/fixit/release" }
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    submenus: [
      { label: "Users & Roles", href: "/admin/settings/users" },
      { label: "Workflow Rules", href: "/admin/settings/workflow" },
      { label: "Taxonomies", href: "/admin/settings/taxonomies" },
      { label: "Integrations", href: "/admin/settings/integrations" },
      { label: "Audit Log", href: "/admin/settings/audit" }
    ]
  }
]

function NavGroup({ group, pathname }: { group: typeof ADMIN_MENUS[0], pathname: string }) {
  const isActive = pathname.startsWith(group.href)
  const isDashboard = group.title === "Dashboard"
  const [isOpen, setIsOpen] = useState(isActive || isDashboard)

  const Icon = group.icon
  const hasSub = group.submenus.length > 0

  return (
    <div className="flex flex-col mb-1">
      {hasSub ? (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-bold transition-colors ${
            isActive ? 'bg-brand-050 text-brand-800' : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <div className="flex items-center gap-3 relative">
            <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-600' : 'text-neutral-500'}`} />
            {group.title}
            {isActive && <span className="absolute -left-3 w-1 h-4 bg-brand-600 rounded-r-full" />}
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-neutral-400" /> : <ChevronRight className="w-4 h-4 text-neutral-400" />}
        </button>
      ) : (
         <Link 
          href={group.href}
          className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-bold transition-colors relative ${
            isActive ? 'bg-brand-050 text-brand-800' : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-600' : 'text-neutral-500'}`} />
          {group.title}
          {isActive && <span className="absolute -left-2.5 w-1 h-4 bg-brand-600 rounded-r-full" />}
        </Link>
      )}

      {/* Submenus */}
      {hasSub && isOpen && (
        <div className="flex flex-col mt-1 ml-4 pl-3 border-l border-line-soft space-y-0.5">
          {group.submenus.map((sub) => {
            const isSubActive = pathname === sub.href
            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={`text-[13px] py-1.5 px-3 rounded-lg transition-colors ${
                  isSubActive ? 'text-brand-700 font-bold bg-brand-050/50' : 'text-neutral-500 font-medium hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {sub.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] shrink-0 bg-[#F9FAFB] border-r border-line-default h-screen p-4 flex flex-col hidden md:flex sticky top-0 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
      <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8 px-2 mt-2">
        <div className="w-8 h-8 bg-brand-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="font-extrabold text-[18px] text-brand-900 tracking-tight">Admin Console</span>
      </Link>
      
      <nav className="flex flex-col flex-1">
        {ADMIN_MENUS.map((group) => (
          <NavGroup key={group.title} group={group} pathname={pathname} />
        ))}
      </nav>
      
      <div className="mt-8 pt-4 border-t border-line-soft px-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs uppercase">ED</div>
          <div>
            <div className="text-sm font-bold text-neutral-900 leading-tight">Editor Account</div>
            <div className="text-[11px] text-neutral-500">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
