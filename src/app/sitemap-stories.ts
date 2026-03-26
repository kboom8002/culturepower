import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://culturepower.org"
  
  return [
    {
      url: `${baseUrl}/webzine/stories/k-architecture-philosophy`,
      lastModified: new Date("2026-03-22T00:00:00Z"),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
}
