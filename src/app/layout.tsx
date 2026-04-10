import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://culturepower.vercel.app"),
  title: {
    template: "%s | 문강 RIO - 문화강국네트워크",
    default: "문화강국네트워크 - 국가 문화전략 플랫폼",
  },
  description: "사단법인 문화강국네트워크 공식 플랫폼 - 문화자치, 문화분권, 지역문화 혁신을 위한 RIO(Reform, Implementation, Outcomes) 지식 허브",
  keywords: ["문화정책", "문화강국", "지역문화", "문화자치", "문화분권", "문강RIO", "정책연구", "K컬처", "문화산업"],
  openGraph: {
    title: "문화강국네트워크",
    description: "국가 문화전략 플랫폼, 기록이 아닌 제안, 평론이 아닌 대안",
    url: "https://culturepower.vercel.app",
    siteName: "문화강국네트워크",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "문화강국네트워크",
    description: "국가 문화전략 플랫폼, 기록이 아닌 제안",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
