import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://culturepower.org"
  
  return [
    {
      url: `${baseUrl}/events/local-networking-day`,
      lastModified: new Date("2026-06-10T14:00:00Z"),
      changeFrequency: 'daily', // Open event changes frequently
      priority: 0.7,
    }
  ]
}
