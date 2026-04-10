import React from 'react'

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "문화강국네트워크",
    "url": "https://culturepower.vercel.app",
    "logo": "https://culturepower.vercel.app/images/logo.png",
    "description": "지역에서 세계로, 문화강국 대한민국. 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크입니다.",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function ArticleJsonLd({ title, description, publishedAt, updatedAt, url, imageUrl, authorName = "문강 RIO" }: any) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "url": url,
    "image": imageUrl ? [imageUrl] : [],
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "문강 RIO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturepower.vercel.app/images/logo.png"
      }
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function FAQPageJsonLd({ faqs }: { faqs: { question: string, answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
