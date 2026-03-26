"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type PublishQueueItem = {
  id: string
  title: string
  content_type: 'Story' | 'Answer'
  status: 'Draft' | 'Review' | 'Scheduled'
  author_id: string | null
  created_at: string
  published_at?: string | null
}

export type FeaturedContent = {
  id: string
  placement_type: string
  content_type: string
  content_id: string
  display_order: number
  title_override: string | null
  is_active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createPublishingClient() {
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
// Publishing Queue & Scheduled
// ----------------------------------------------------
export async function getPublishQueue(): Promise<PublishQueueItem[]> {
  if (!isSupabaseConfigured()) return [
    { id: "MOCK-1", title: "[Draft] 미래 정책 방향 제시", content_type: "Story", status: "Draft", author_id: null, created_at: new Date().toISOString() },
    { id: "MOCK-2", title: "[Review] 지역 문화 예술 공간 활성화...", content_type: "Answer", status: "Review", author_id: null, created_at: new Date().toISOString() }
  ]
  const supabase = await createPublishingClient()
  
  // Aggregate from stories (Review, Draft)
  const { data: storiesData } = await supabase.from('stories').select('id, title, status, author_id, created_at, published_at').in('status', ['Draft', 'Review']).order('created_at', { ascending: false })
  const stories = (storiesData || []).map(s => ({ ...s, content_type: 'Story' as const }))
  
  // We'll mock answers table integration dynamically if it doesn't exist yet to prevent crashes
  const { data: answersData, error: answersError } = await supabase.from('answers').select('id, title, status, author_id, created_at, published_at').in('status', ['Draft', 'Review']).order('created_at', { ascending: false })
  const answers = !answersError && answersData ? answersData.map(a => ({ ...a, content_type: 'Answer' as const })) : []

  return [...stories, ...answers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getScheduledItems(): Promise<PublishQueueItem[]> {
  if (!isSupabaseConfigured()) return [
    { id: "MOCK-S1", title: "[Scheduled] 특집 기획 - AI 연대기", content_type: "Story", status: "Scheduled", author_id: null, created_at: new Date().toISOString(), published_at: new Date(Date.now() + 86400000).toISOString() }
  ]
  const supabase = await createPublishingClient()
  
  const { data: storiesData } = await supabase.from('stories').select('id, title, status, author_id, created_at, published_at').eq('status', 'Scheduled').order('published_at', { ascending: true })
  const stories = (storiesData || []).map(s => ({ ...s, content_type: 'Story' as const }))
  
  const { data: answersData, error: answersError } = await supabase.from('answers').select('id, title, status, author_id, created_at, published_at').eq('status', 'Scheduled').order('published_at', { ascending: true })
  const answers = !answersError && answersData ? answersData.map(a => ({ ...a, content_type: 'Answer' as const })) : []

  return [...stories, ...answers].sort((a: any, b: any) => new Date(a.published_at || "").getTime() - new Date(b.published_at || "").getTime())
}

export async function publishItemNow(id: string, contentType: 'Story' | 'Answer') {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : 'answers'
  const { error } = await supabase.from(table).update({ status: 'Public', published_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/content/stories')
  return { success: true }
}

// ----------------------------------------------------
// Featured Contents Curation
// ----------------------------------------------------
export async function getFeaturedContents(): Promise<FeaturedContent[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  const { data } = await supabase.from('featured_contents').select('*').order('placement_type', { ascending: true }).order('display_order', { ascending: true })
  return (data || []) as FeaturedContent[]
}
