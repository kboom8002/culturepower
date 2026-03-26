import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Mock DB fetching: supabase.from('answers').select('slug, updated_at').eq('status','Public')
  const baseUrl = "https://culturepower.org"
  
  return [
    {
      url: `${baseUrl}/answers/k-civilization-origin`,
      lastModified: new Date("2026-03-24T10:00:00Z"),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/answers/local-culture-budget`,
      lastModified: new Date("2026-03-25T14:30:00Z"),
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]
}
