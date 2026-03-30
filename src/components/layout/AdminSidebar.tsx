"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { logout } from "@/app/(public)/login/actions"
import { 
  LayoutDashboard, Inbox, FileText, Archive, Users, 
  CheckSquare, Rocket, Activity, Wrench, Settings, ChevronDown, ChevronRight
} from "lucide-react"

const ADMIN_MENUS = [
  {
    title: "대시보드",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    submenus: []
  },
  {
    title: "수신함",
    icon: Inbox,
    href: "/admin/inbox",
    submenus: []
  },
  {
    title: "콘텐츠 관리",
    icon: FileText,
    href: "/admin/content",
    submenus: [
      { label: "주제 (Topics)", href: "/admin/content/topics" },
      { label: "핵심 질문 (Answers)", href: "/admin/content/answers" },
      { label: "기사/스토리 (Stories)", href: "/admin/content/stories" },
      { label: "브리프 (Briefs)", href: "/admin/content/briefs" },
      { label: "전문가 풀 (Experts)", href: "/admin/content/experts" },
      { label: "자료실 (Resources)", href: "/admin/content/resources" }
    ]
  },
  {
    title: "아카이브",
    icon: Archive,
    href: "/admin/archive",
    submenus: [
      { label: "행사·토론회", href: "/admin/archive/events" },
      { label: "영상 기록", href: "/admin/archive/videos" },
      { label: "발간 문서", href: "/admin/archive/documents" },
      { label: "사진 갤러리", href: "/admin/archive/galleries" },
      { label: "완결 보드", href: "/admin/archive/completion" }
    ]
  },
  {
    title: "참여 관리",
    icon: Users,
    href: "/admin/participation",
    submenus: [
      { label: "회원 가입 관리", href: "/admin/participation/members" },
      { label: "뉴스레터 발송", href: "/admin/participation/newsletter" },
      { label: "행사 참가 접수", href: "/admin/participation/events" },
      { label: "제휴 문의", href: "/admin/participation/partnerships" },
      { label: "세그먼트 타겟팅", href: "/admin/participation/segments" }
    ]
  },
  {
    title: "발행 검수",
    icon: CheckSquare,
    href: "/admin/review",
    submenus: [
      { label: "검수 대기함", href: "/admin/review/needs" },
      { label: "나의 검수건", href: "/admin/review/mine" },
      { label: "반려 됨", href: "/admin/review/returned" },
      { label: "승인 완료", href: "/admin/review/approved" }
    ]
  },
  {
    title: "콘텐츠 노출/발행",
    icon: Rocket,
    href: "/admin/publishing",
    submenus: [
      { label: "발행 대기열 (Queue)", href: "/admin/publishing/queue" },
      { label: "예약 발행", href: "/admin/publishing/scheduled" },
      { label: "🖥 페이지 노출 관리", href: "/admin/publishing/featured" },
      { label: "피드 (RSS) 상태", href: "/admin/publishing/feed" },
      { label: "사이트맵 제어", href: "/admin/publishing/sitemap" },
      { label: "설계/링크 점검", href: "/admin/publishing/links" }
    ]
  },
  {
    title: "운영 지표 (Observatory)",
    icon: Activity,
    href: "/admin/observatory",
    submenus: [
      { label: "KPI 요약", href: "/admin/observatory/kpi" },
      { label: "콘텐츠 건전성", href: "/admin/observatory/health" },
      { label: "질문 커버리지", href: "/admin/observatory/coverage" },
      { label: "신뢰 지표 (Trust)", href: "/admin/observatory/trust" },
      { label: "전환 지표 (Conversion)", href: "/admin/observatory/conversion" }
    ]
  },
  {
    title: "유지보수 (Fix-It)",
    icon: Wrench,
    href: "/admin/fixit",
    submenus: [
      { label: "P0 (긴급 장애)", href: "/admin/fixit/p0" },
      { label: "P1 (주요 이슈)", href: "/admin/fixit/p1" },
      { label: "P2 (일반 개선)", href: "/admin/fixit/p2" },
      { label: "근본 원인 분석(Root Cause)", href: "/admin/fixit/rootcause" },
      { label: "릴리즈 노트", href: "/admin/fixit/release" }
    ]
  },
  {
    title: "환경 설정",
    icon: Settings,
    href: "/admin/settings",
    submenus: [
      { label: "기본 사이트 정보", href: "/admin/settings/site" },
      { label: "메뉴(GNB/LNB) 편집", href: "/admin/settings/menus" },
      { label: "분류 체계 (Taxonomies)", href: "/admin/settings/taxonomies" },
      { label: "사용자 및 권한 설정", href: "/admin/settings/users" },
      { label: "워크플로우 규칙", href: "/admin/settings/workflow" },
      { label: "외부 시스템 연동", href: "/admin/settings/integrations" },
      { label: "관리자 활동 로그", href: "/admin/settings/audit" }
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
      
      <div className="mt-8 pt-4 border-t border-line-soft px-2 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs uppercase">AD</div>
          <div>
            <div className="text-sm font-bold text-neutral-900 leading-tight">Admin</div>
            <div className="text-[11px] text-neutral-500">SSoT Editor</div>
          </div>
        </div>
        <form action={logout}>
          <button type="submit" className="text-xs font-semibold text-neutral-500 hover:text-brand-600 transition-colors px-2 py-1 rounded-md hover:bg-brand-50">
            Logout
          </button>
        </form>
      </div>
    </aside>
  )
}
