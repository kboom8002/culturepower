import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-caption text-neutral-500 mb-6">
      <Link href="/" className="hover:text-brand-700 transition-colors">
        홈
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-neutral-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
