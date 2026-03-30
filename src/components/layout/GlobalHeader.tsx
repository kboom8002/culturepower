"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { MainMenuWithItems } from "@/lib/actions/navigation";

export function GlobalHeader({ menus }: { menus: MainMenuWithItems[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileGnb, setExpandedMobileGnb] = useState<string | null>(
    null,
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line-default bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 shrink-0 flex items-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="문화강국네트워크 로고"
            width={400}
            height={85}
            className="w-48 md:w-64 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {menus.map((gnb) => (
            <div
              key={gnb.label}
              className="group h-full flex items-center relative"
            >
              <Link
                href={gnb.href}
                className="text-body-sm font-bold text-neutral-800 hover:text-brand-700 transition-colors flex items-center gap-1 h-full"
              >
                {gnb.label}
              </Link>

              {/* Desktop Dropdown Wrapper (pt-4 acts as invisible hover bridge) */}
              <div className="absolute top-full mt-[-8px] pt-[8px] left-1/2 -translate-x-1/2 hidden group-hover:block z-50">
                <div className="flex flex-col bg-white border border-line-default shadow-xl rounded-xl py-3 min-w-[200px]">
                  {gnb.items.map((lnb) => (
                    <Link
                      key={lnb.label}
                      href={lnb.href}
                      className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-brand-700 hover:bg-brand-50 transition-colors whitespace-nowrap"
                    >
                      {lnb.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Actions Desktop & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-50 shrink-0">
          <Button
            variant="tertiary"
            size="sm"
            className="hidden sm:inline-flex rounded-full px-3"
            asChild
          >
            <Link href="/search">
              <Search className="w-4 h-4 mr-2" />
              검색
            </Link>
          </Button>
          <Button
            variant="primary"
            size="sm"
            asChild
            className="hidden md:inline-flex"
          >
            <Link href="/join">가입하기</Link>
          </Button>
          <button
            className="lg:hidden p-2 -mr-2 text-neutral-700 hover:text-brand-700 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-white flex flex-col pt-4 px-6 lg:hidden overflow-y-auto pb-24 h-[calc(100vh-72px)]">
          <nav className="flex flex-col gap-2">
            {menus.map((gnb) => {
              const isExpanded = expandedMobileGnb === gnb.label;
              return (
                <div
                  key={gnb.label}
                  className="flex flex-col border-b border-line-soft last:border-0"
                >
                  <div className="flex items-center justify-between py-4">
                    <Link
                      href={gnb.href}
                      className="text-[20px] font-bold text-neutral-900 flex-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {gnb.label}
                    </Link>
                    <button
                      className="p-2 -mr-2 text-neutral-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedMobileGnb(isExpanded ? null : gnb.label);
                      }}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="flex flex-col gap-1 pb-4 pl-4 border-l-2 border-brand-100 ml-2">
                      {gnb.items.map((lnb) => (
                        <Link
                          key={lnb.label}
                          href={lnb.href}
                          className="py-2.5 text-[15px] font-medium text-neutral-600 hover:text-brand-700"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {lnb.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="w-full justify-center"
              asChild
            >
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
                <Search className="w-5 h-5 mr-3" />
                궁금한 주제 검색하기
              </Link>
            </Button>
            <Button
              variant="primary"
              size="lg"
              asChild
              className="w-full justify-center"
            >
              <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>
                정회원 가입 및 구독
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
