import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://culturepower.vercel.app"
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  
  const [answersRes, storiesRes] = await Promise.all([
    supabase.from('answers').select('slug, updated_at').order('updated_at', { ascending: false }),
    supabase.from('stories').select('slug, updated_at').order('updated_at', { ascending: false })
  ])

  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/network`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/answers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/webzine/stories`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const answerRoutes: MetadataRoute.Sitemap = (answersRes.data || []).map(a => ({
    url: `${baseUrl}/answers/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  const storyRoutes: MetadataRoute.Sitemap = (storiesRes.data || []).map(s => ({
    url: `${baseUrl}/webzine/stories/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [...staticRoutes, ...answerRoutes, ...storyRoutes]
}
