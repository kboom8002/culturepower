"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createSeoClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } 
        catch {}
      },
    },
  })
}

// ----------------------------------------------------
// Feed Status (AIO-PR Answer Feed Validation)
// ----------------------------------------------------
export type FeedItemStatus = {
  id: string
  title: string
  is_included: boolean
  error_reason: string[]
  updated_at: string
}

export async function getAnswerFeedStatus(): Promise<FeedItemStatus[]> {
  if (!isSupabaseConfigured()) return [
    { id: "MOCK-1", title: "지역 문화예술 공간 활성화 가이드", is_included: true, error_reason: [], updated_at: new Date().toISOString() },
    { id: "MOCK-2", title: "로컬브랜딩 예산 집행 한계", is_included: false, error_reason: ["Missing Reviewer (expert_id)"], updated_at: new Date().toISOString() }
  ]
  const supabase = await createSeoClient()
  
  // We strictly check Answers that are Public
  const { data } = await supabase.from('answers').select('id, title, expert_id, topic_id, updated_at').eq('status', 'Public').order('updated_at', { ascending: false })
  
  return (data || []).map(a => {
    const errors: string[] = []
    if (!a.expert_id) errors.push("Missing Reviewer (expert_id)")
    if (!a.topic_id) errors.push("Dangling Object (No Topic)")
    
    return {
      id: a.id,
      title: a.title,
      is_included: errors.length === 0,
      error_reason: errors,
      updated_at: a.updated_at
    }
  })
}

// ----------------------------------------------------
// Sitemap Status (XML Mismatch Validation)
// ----------------------------------------------------
export type SitemapItemStatus = {
  id: string
  title: string
  content_type: string
  loc: string
  lastmod: string
  db_updated_at: string
  is_mismatched: boolean
}

export async function getSitemapStatus(): Promise<SitemapItemStatus[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createSeoClient()
  
  // We check public Stories and Answers
  const [stories, answers] = await Promise.all([
    supabase.from('stories').select('id, title, updated_at, published_at').eq('status', 'Public').order('updated_at', { ascending: false }),
    supabase.from('answers').select('id, title, updated_at, published_at').eq('status', 'Public').order('updated_at', { ascending: false })
  ])

  const checkMismatch = (updated_at: string, published_at: string) => {
    // If updated recently but not reflected in sitemap lastmod metadata...
    // For MVP, we simulate mismatch if updated_at is significantly later than published_at (> 1 hour)
    const diff = new Date(updated_at).getTime() - new Date(published_at).getTime()
    return diff > 3600000 // 1 hour
  }

  const format = (data: any[] | null, type: string, pathPrefix: string) => (data || []).map(d => ({
    id: d.id,
    title: d.title,
    content_type: type,
    loc: `https://culturepower.network/${pathPrefix}/${d.id.slice(0,8)}`, // Mock slug
    lastmod: d.published_at, 
    db_updated_at: d.updated_at,
    is_mismatched: checkMismatch(d.updated_at, d.published_at || d.updated_at)
  }))

  return [
    ...format(stories.data, 'Story', 'webzine/stories'),
    ...format(answers.data, 'Answer', 'answers')
  ]
}

// ----------------------------------------------------
// Link & Meta Health Check
// ----------------------------------------------------
export type MetaHealthItem = {
  id: string
  title: string
  content_type: string
  meta_issues: string[]
}

export async function getMetaHealthIssues(): Promise<MetaHealthItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createSeoClient()
  
  const { data: stories } = await supabase.from('stories').select('id, title, cover_image_url').eq('status', 'Public')
  
  return (stories || [])
    .map(s => {
      const issues: string[] = []
      if (!s.cover_image_url) issues.push("Missing Cover Image (OG Image)")
      if (s.title.length < 5) issues.push("Meta Title too short")
      if (s.title.length > 60) issues.push("Meta Title too long")
      
      return {
        id: s.id,
        title: s.title,
        content_type: 'Story',
        meta_issues: issues
      }
    })
    .filter(i => i.meta_issues.length > 0)
}
