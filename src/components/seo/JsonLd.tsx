import React from 'react'

export interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify({ 
          "@context": "https://schema.org", 
          ...data 
        }) 
      }}
    />
  )
}
