import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb"

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  title: string
  description?: string
}

export function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  return (
    <div className="w-full bg-surface-muted border-b border-line-default py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-h2 md:text-[40px] leading-[1.25] text-neutral-900 font-bold mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-body-lg text-neutral-600 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
