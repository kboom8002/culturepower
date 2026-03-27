"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type PublishQueueItem = {
  id: string
  title: string
  content_type: 'Story' | 'Answer' | 'Event'
  status: 'Draft' | 'Review' | 'Scheduled' | 'Public'
  author_id: string | null
  created_at: string
  published_at?: string | null
}

export type FeaturedContent = {
  id: string
  slot_name: string
  content_type: string
  content_id: string
  display_order: number
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
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  
  // We fetch items that are ready for publishing (status = 'Review')
  // For robustness, returning Drafts as well if they want to bypass review in small teams
  const { data: storiesData, error: sErr } = await supabase.from('stories').select('id, title, status, creator_id, created_at, published_at').in('status', ['Review']).order('created_at', { ascending: false })
  if (sErr) console.error("Publish Queue Stories Error:", sErr);
  const stories = (storiesData || []).map(s => ({ ...s, author_id: s.creator_id, content_type: 'Story' as const }))
  
  const { data: answersData, error: aErr } = await supabase.from('answers').select('id, title, status, creator_id, created_at, published_at').in('status', ['Review']).order('created_at', { ascending: false })
  if (aErr) console.error("Publish Queue Answers Error:", aErr);
  const answers = (answersData || []).map(a => ({ ...a, author_id: a.creator_id, content_type: 'Answer' as const }))

  const { data: eventsData, error: eErr } = await supabase.from('events').select('id, title, status, created_at, published_at').in('status', ['Review']).order('created_at', { ascending: false })
  if (eErr) console.error("Publish Queue Events Error:", eErr);
  const events = (eventsData || []).map(e => ({ ...e, author_id: null, content_type: 'Event' as const }))

  return [...stories, ...answers, ...events].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getScheduledItems(): Promise<PublishQueueItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  
  const { data: storiesData } = await supabase.from('stories').select('id, title, status, creator_id, created_at, published_at').eq('status', 'Scheduled').order('published_at', { ascending: true })
  const stories = (storiesData || []).map(s => ({ ...s, author_id: s.creator_id, content_type: 'Story' as const }))
  
  const { data: answersData } = await supabase.from('answers').select('id, title, status, creator_id, created_at, published_at').eq('status', 'Scheduled').order('published_at', { ascending: true })
  const answers = (answersData || []).map(a => ({ ...a, author_id: a.creator_id, content_type: 'Answer' as const }))

  const { data: eventsData } = await supabase.from('events').select('id, title, status, created_at, published_at').eq('status', 'Scheduled').order('published_at', { ascending: true })
  const events = (eventsData || []).map(e => ({ ...e, author_id: null, content_type: 'Event' as const }))

  return [...stories, ...answers, ...events].sort((a: any, b: any) => new Date(a.published_at || "").getTime() - new Date(b.published_at || "").getTime())
}

export async function publishImmediately(id: string, contentType: 'Story' | 'Answer' | 'Event') {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : 'events'
  
  const { error } = await supabase.from(table).update({ status: 'Public', published_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  
  // 무효화 (Clear Data Cache for Public Viewers)
  revalidatePath('/')
  revalidatePath('/webzine/stories')
  revalidatePath('/answers')
  revalidatePath('/archive/events')
  
  return { success: true }
}

export async function schedulePublish(id: string, contentType: 'Story' | 'Answer' | 'Event', scheduledDate: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : 'events'

  const { error } = await supabase.from(table).update({ status: 'Scheduled', published_at: scheduledDate }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  
  // 무효화 (Clear Data Cache for Public Viewers)
  revalidatePath('/')
  revalidatePath('/webzine/stories')
  revalidatePath('/answers')
  revalidatePath('/archive/events')
  
  return { success: true }
}

export async function returnToReview(id: string, contentType: 'Story' | 'Answer' | 'Event') {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : 'events'

  const { error } = await supabase.from(table).update({ status: 'Review', published_at: null }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  return { success: true }
}

// ----------------------------------------------------
// Featured Contents Curation
// ----------------------------------------------------
export async function getFeaturedContents(): Promise<FeaturedContent[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  const { data } = await supabase.from('featured_contents').select('*').order('slot_name', { ascending: true }).order('display_order', { ascending: true })
  return (data || []) as FeaturedContent[]
}

export async function getFeaturedSlots(slotName: string): Promise<FeaturedContent[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  const { data } = await supabase.from('featured_contents').select('*').eq('slot_name', slotName).order('display_order', { ascending: true })
  return (data || []) as FeaturedContent[]
}

export async function updateFeaturedContent(slotName: string, items: { content_type: string, content_id: string, display_order: number }[]) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  
  // 1. Delete existing for this slot
  await supabase.from('featured_contents').delete().eq('slot_name', slotName)

  // 2. Insert new
  if (items.length > 0) {
    const payload = items.map(i => ({
      slot_name: slotName,
      content_type: i.content_type,
      content_id: i.content_id,
      display_order: i.display_order
    }))
    const { error } = await supabase.from('featured_contents').insert(payload)
    if (error) return { success: false, error: error.message }
  }

  revalidatePath('/admin/publishing/featured')
  // We might want to revalidate public routes like '/' here if we had them.
  return { success: true }
}

export async function searchPublicContent(query: string) {
  if (!isSupabaseConfigured() || !query) return []
  const supabase = await createPublishingClient()
  
  const [stories, answers, events] = await Promise.all([
    supabase.from('stories').select('id, title, status, published_at').eq('status', 'Public').ilike('title', `%${query}%`).limit(5),
    supabase.from('answers').select('id, title, status, published_at').eq('status', 'Public').ilike('title', `%${query}%`).limit(5),
    supabase.from('events').select('id, title:name, status, published_at').eq('status', 'Public').ilike('name', `%${query}%`).limit(5)
  ])

  const format = (data: any[] | null, type: string) => (data || []).map(d => ({ ...d, content_type: type }))
  
  return [...format(stories.data, 'Story'), ...format(answers.data, 'Answer'), ...format(events.data, 'Event')]
}
