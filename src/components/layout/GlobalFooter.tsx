import Link from "next/link";
import Image from "next/image";

export function GlobalFooter() {
  return (
    <footer className="bg-surface-soft border-t border-line-default py-12 lg:py-16 mt-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between gap-8">
        
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="문화강국네트워크 로고"
              width={400}
              height={85}
              className="w-48 md:w-64 h-auto object-contain mix-blend-multiply"
            />
          </div>
          <p className="text-body-sm text-neutral-600">
            질문을 시작하고, 검증된 답변을 나누는 공공형 해설 플랫폼입니다. K-문명과 문화강국의 비전을 구체적인 근거와 함께 차분하게 기록합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full lg:w-auto">
          {/* Col 1 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/webzine/stories" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">문강 RIO</Link>
              <Link href="/webzine/about" className="hover:text-brand-700">문강 RIO 소개</Link>
              <Link href="/webzine/stories" className="hover:text-brand-700">전체 Story</Link>
            </div>
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/answers" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">정답카드</Link>
              <Link href="/answers" className="hover:text-brand-700">전체 정답카드</Link>
              <Link href="/answers?sort=latest" className="hover:text-brand-700">최신 업데이트</Link>
            </div>
          </div>
          
          {/* Col 2 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/pillars/topics" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">3 Pillars</Link>
              <Link href="/pillars/reform" className="hover:text-brand-700">Reform</Link>
              <Link href="/pillars/implementation" className="hover:text-brand-700">Implementation</Link>
              <Link href="/pillars/outcomes" className="hover:text-brand-700">Outcomes</Link>
            </div>
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/events" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">행사·영상</Link>
              <Link href="/events?tab=schedule" className="hover:text-brand-700">행사 일정</Link>
              <Link href="/events?tab=archive" className="hover:text-brand-700">자료 아카이브</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/data" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">데이터·자료</Link>
              <Link href="/data?category=info" className="hover:text-brand-700">문화예술정보</Link>
              <Link href="/data?category=news" className="hover:text-brand-700">문화정책 뉴스</Link>
              <Link href="/data?category=brief" className="hover:text-brand-700">One-Pager / Brief</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/network" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">네트워크</Link>
              <Link href="/network/about" className="hover:text-brand-700">네트워크 소개</Link>
              <Link href="/network/organization" className="hover:text-brand-700">조직구성</Link>
            </div>
            <div className="flex flex-col gap-3 text-body-sm text-neutral-600">
              <Link href="/join" className="font-semibold text-neutral-900 mb-1 hover:text-brand-700">참여·회원</Link>
              <Link href="/join/about" className="hover:text-brand-700">가입 안내</Link>
              <Link href="/join/newsletter" className="hover:text-brand-700">뉴스레터 구독</Link>
            </div>
          </div>
        </div>

      </div>
      
      <div className="container mx-auto px-4 md:px-6 pt-8 mt-8 border-t border-line-default flex flex-col sm:flex-row items-center justify-between text-caption text-neutral-500">
        <span>© 2026 문화강국네트워크. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Powered by Media SSoT Architecture</span>
      </div>
    </footer>
  )
}
