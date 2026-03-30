import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Image as ImageIcon } from "lucide-react"
import { getPageBanners } from "@/lib/actions/publishing"

export async function HomeActivities() {
  const banners = await getPageBanners('home')
  const activities = banners
    .filter(b => b.slot_name === 'home-activities' || b.slot_name === 'main-activities')
    .sort((a,b) => a.display_order - b.display_order)

  // 만약 관리자가 1개도 등록하지 않았다면 기본값(Fallback) 표시
  const list = activities.length > 0 ? activities : [
    { title: "문화정책 연구와 공론장 형성", link_url: "/answers?topic=cultural-policy-governance", image_url: null },
    { title: "지역문화대전환 순회토론회", link_url: "/events?series=regional-culture-transition", image_url: null },
    { title: "문화산업·AI·K-푸드·기초예술 토론회", link_url: "/events?category=forum-report", image_url: null }
  ] as any[];

  return (
    <section className="w-full bg-surface-soft py-24 px-4 border-t border-b border-line-default">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-h3 md:text-h2 font-bold text-neutral-900 mb-2">주요 활동</h2>
            <p className="text-body text-neutral-600">
              문화자치와 지속가능한 발전을 위한 핵심 프로젝트 기획
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/events" className="text-sm font-semibold text-neutral-700 hover:text-brand-700 flex items-center gap-1">
              행사·토론회 전체 
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((act, idx) => (
            <Link 
              key={act.id || idx} 
              href={act.link_url || "#"}
              className="group flex flex-col bg-white border border-line-default rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-300 transition-all"
            >
              <div className="w-full aspect-[2/1] bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                {act.image_url ? (
                  <Image src={act.image_url} alt={act.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> 
                ) : (
                  <ImageIcon className="w-10 h-10 text-neutral-300 group-hover:scale-110 transition-transform duration-500" />
                )}
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                  {act.title}
                </h3>
                {act.subtitle && (
                  <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{act.subtitle}</p>
                )}
                <div className="mt-6 flex items-center text-sm font-semibold text-brand-600">
                  자세히 보기 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
