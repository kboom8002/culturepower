"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type PublishQueueItem = {
  id: string
  title: string
  content_type: 'Story' | 'Answer' | 'Event' | 'Brief' | 'Page'
  status: string
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

// Helper to get workflow status id
async function getStatusId(supabase: any, slug: string) {
  const { data } = await supabase.from('workflow_statuses').select('id').eq('slug', slug).maybeSingle()
  return data?.id
}

// ----------------------------------------------------
// Publishing Queue & Scheduled
// ----------------------------------------------------
export async function getPublishQueue(): Promise<PublishQueueItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  
  const { data: storiesData, error: sErr } = await supabase.from('stories').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').in('workflow_statuses.slug', ['approved', 'in-review']).order('created_at', { ascending: false })
  if (sErr) console.error("Publish Queue Stories Error:", sErr);
  const stories = (storiesData || []).map((s: any) => ({ ...s, author_id: s.created_by, status: s.workflow_statuses.slug, content_type: 'Story' as const }))
  
  const { data: answersData, error: aErr } = await supabase.from('answers').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').in('workflow_statuses.slug', ['approved', 'in-review']).order('created_at', { ascending: false })
  if (aErr) console.error("Publish Queue Answers Error:", aErr);
  const answers = (answersData || []).map((a: any) => ({ ...a, author_id: a.created_by, status: a.workflow_statuses.slug, content_type: 'Answer' as const }))

  const { data: eventsData, error: eErr } = await supabase.from('events').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').in('workflow_statuses.slug', ['approved', 'in-review']).order('created_at', { ascending: false })
  if (eErr) console.error("Publish Queue Events Error:", eErr);
  const events = (eventsData || []).map((e: any) => ({ ...e, author_id: e.created_by, status: e.workflow_statuses.slug, content_type: 'Event' as const }))

  const { data: briefsData, error: bErr } = await supabase.from('briefs').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').in('workflow_statuses.slug', ['approved', 'in-review']).order('created_at', { ascending: false })
  if (bErr) console.error("Publish Queue Briefs Error:", bErr);
  const briefs = (briefsData || []).map((b: any) => ({ ...b, author_id: b.created_by, status: b.workflow_statuses.slug, content_type: 'Brief' as const }))

  return [...stories, ...answers, ...events, ...briefs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getPublishHistory(page: number = 1, limit: number = 20): Promise<{ items: PublishQueueItem[], total: number }> {
  if (!isSupabaseConfigured()) return { items: [], total: 0 }
  const supabase = await createPublishingClient()
  
  const from = (page - 1) * limit
  const to = from + limit - 1
  const fetchLimit = to + 1

  const { data: sData, count: sCount } = await supabase.from('stories').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at', { count: 'exact' }).in('workflow_statuses.slug', ['published', 'archived']).order('published_at', { ascending: false }).limit(fetchLimit)
  const stories = (sData || []).map((s: any) => ({ ...s, author_id: s.created_by, status: s.workflow_statuses.slug, content_type: 'Story' as const }))
  
  const { data: aData, count: aCount } = await supabase.from('answers').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at', { count: 'exact' }).in('workflow_statuses.slug', ['published', 'archived']).order('published_at', { ascending: false }).limit(fetchLimit)
  const answers = (aData || []).map((a: any) => ({ ...a, author_id: a.created_by, status: a.workflow_statuses.slug, content_type: 'Answer' as const }))

  const { data: eData, count: eCount } = await supabase.from('events').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at', { count: 'exact' }).in('workflow_statuses.slug', ['published', 'archived']).order('published_at', { ascending: false }).limit(fetchLimit)
  const events = (eData || []).map((e: any) => ({ ...e, author_id: e.created_by, status: e.workflow_statuses.slug, content_type: 'Event' as const }))

  const { data: bData, count: bCount } = await supabase.from('briefs').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at', { count: 'exact' }).in('workflow_statuses.slug', ['published', 'archived']).order('published_at', { ascending: false }).limit(fetchLimit)
  const briefs = (bData || []).map((b: any) => ({ ...b, author_id: b.created_by, status: b.workflow_statuses.slug, content_type: 'Brief' as const }))

  const allItems = [...stories, ...answers, ...events, ...briefs].sort((a: any, b: any) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
  
  const total = (sCount || 0) + (aCount || 0) + (eCount || 0) + (bCount || 0)
  const items = allItems.slice(from, to + 1)

  return { items, total }
}

export async function getScheduledItems(): Promise<PublishQueueItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  
  const { data: storiesData } = await supabase.from('stories').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').eq('workflow_statuses.slug', 'scheduled').order('published_at', { ascending: true })
  const stories = (storiesData || []).map((s: any) => ({ ...s, author_id: s.created_by, status: s.workflow_statuses.slug, content_type: 'Story' as const }))
  
  const { data: answersData } = await supabase.from('answers').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').eq('workflow_statuses.slug', 'scheduled').order('published_at', { ascending: true })
  const answers = (answersData || []).map((a: any) => ({ ...a, author_id: a.created_by, status: a.workflow_statuses.slug, content_type: 'Answer' as const }))

  const { data: eventsData } = await supabase.from('events').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').eq('workflow_statuses.slug', 'scheduled').order('published_at', { ascending: true })
  const events = (eventsData || []).map((e: any) => ({ ...e, author_id: e.created_by, status: e.workflow_statuses.slug, content_type: 'Event' as const }))

  const { data: briefsData } = await supabase.from('briefs').select('id, title, workflow_statuses!inner(slug), created_by, created_at, published_at').eq('workflow_statuses.slug', 'scheduled').order('published_at', { ascending: true })
  const briefs = (briefsData || []).map((b: any) => ({ ...b, author_id: b.created_by, status: b.workflow_statuses.slug, content_type: 'Brief' as const }))

  return [...stories, ...answers, ...events, ...briefs].sort((a: any, b: any) => new Date(a.published_at || "").getTime() - new Date(b.published_at || "").getTime())
}

export async function publishImmediately(id: string, contentType: 'Story' | 'Answer' | 'Event' | 'Brief' | 'Page') {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : contentType === 'Event' ? 'events' : contentType === 'Brief' ? 'briefs' : 'pages'
  
  const statusId = await getStatusId(supabase, 'published')
  if (!statusId) return { success: false, error: 'Published status missing' }
  
  const { error } = await supabase.from(table).update({ workflow_status_id: statusId, published_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  
  // 무효화 (Clear Data Cache for Public Viewers)
  revalidatePath('/')
  revalidatePath('/network')
  revalidatePath('/webzine/stories')
  revalidatePath('/answers')
  revalidatePath('/archive/events')
  
  return { success: true }
}

export async function schedulePublish(id: string, contentType: 'Story' | 'Answer' | 'Event' | 'Brief' | 'Page', scheduledDate: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : contentType === 'Event' ? 'events' : contentType === 'Brief' ? 'briefs' : 'pages'

  const statusId = await getStatusId(supabase, 'scheduled')
  if (!statusId) return { success: false, error: 'Scheduled status missing' }

  const { error } = await supabase.from(table).update({ workflow_status_id: statusId, published_at: scheduledDate }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  
  // 무효화
  revalidatePath('/')
  revalidatePath('/webzine/stories')
  revalidatePath('/answers')
  revalidatePath('/archive/events')
  
  return { success: true }
}

export async function returnToReview(id: string, contentType: 'Story' | 'Answer' | 'Event' | 'Brief' | 'Page') {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  const table = contentType === 'Story' ? 'stories' : contentType === 'Answer' ? 'answers' : contentType === 'Event' ? 'events' : contentType === 'Brief' ? 'briefs' : 'pages'

  const statusId = await getStatusId(supabase, 'in-review')
  if (!statusId) return { success: false, error: 'in-review status missing' }

  const { error } = await supabase.from(table).update({ workflow_status_id: statusId, published_at: null }).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/publishing/queue')
  revalidatePath('/admin/publishing/scheduled')
  return { success: true }
}

// ----------------------------------------------------
// Featured Contents Curation
// ----------------------------------------------------
export async function getFeaturedContents(): Promise<(FeaturedContent & { title?: string, is_deleted?: boolean })[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  const { data } = await supabase.from('featured_contents').select('*').order('slot_name', { ascending: true }).order('display_order', { ascending: true })
  
  const items = (data || []) as FeaturedContent[]
  if (items.length === 0) return items

  // Gather IDs by content type (case-insensitive to be safe)
  const groupedIds: Record<string, string[]> = {
    story: items.filter(i => i.content_type.toLowerCase() === 'story').map(i => i.content_id),
    answer: items.filter(i => i.content_type.toLowerCase() === 'answer').map(i => i.content_id),
    event: items.filter(i => i.content_type.toLowerCase() === 'event').map(i => i.content_id),
    video: items.filter(i => i.content_type.toLowerCase() === 'video').map(i => i.content_id),
    document: items.filter(i => i.content_type.toLowerCase() === 'document').map(i => i.content_id),
    gallery: items.filter(i => i.content_type.toLowerCase() === 'gallery').map(i => i.content_id)
  };

  const titleMap: Record<string, string> = {}

  // Helper to fetch titles
  const fetchTitles = async (tableName: string, ids: string[]) => {
    if (ids.length === 0) return;
    const { data: rows, error } = await supabase.from(tableName).select('id, title').in('id', ids)
    if (error) console.error(`DEBUG [getFeaturedContents] ${tableName} error:`, error)
    rows?.forEach(row => titleMap[row.id.toLowerCase()] = row.title)
  }

  await Promise.all([
    fetchTitles('stories', groupedIds.story),
    fetchTitles('answers', groupedIds.answer),
    fetchTitles('events', groupedIds.event),
    fetchTitles('videos', groupedIds.video),
    fetchTitles('documents', groupedIds.document),
    fetchTitles('galleries', groupedIds.gallery)
  ])

  return items.map(item => {
    const foundTitle = titleMap[item.content_id.toLowerCase()]
    return {
      ...item,
      title: foundTitle || `[삭제된 콘텐츠] (ID: ${item.content_id.slice(0, 8)})`,
      is_deleted: !foundTitle
    }
  })
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
  
  // RLS bypasses or admin permissions might return all statuses. 
  // We use inner join to fetch only 'published' items since 'status' column was replaced by 'workflow_status_id'.
  const [stories, answers, events, vids, docs, gals] = await Promise.all([
    supabase.from('stories').select('id, title, published_at, workflow_statuses!inner(slug)').eq('workflow_statuses.slug', 'published').ilike('title', `%${query}%`).limit(5),
    supabase.from('answers').select('id, title, published_at, workflow_statuses!inner(slug)').eq('workflow_statuses.slug', 'published').ilike('title', `%${query}%`).limit(5),
    supabase.from('events').select('id, title, published_at, workflow_statuses!inner(slug)').eq('workflow_statuses.slug', 'published').ilike('title', `%${query}%`).limit(5),
    supabase.from('videos').select('id, title, status, created_at').eq('status', 'Public').ilike('title', `%${query}%`).limit(5),
    supabase.from('documents').select('id, title, status, created_at').eq('status', 'Public').ilike('title', `%${query}%`).limit(5),
    supabase.from('galleries').select('id, title, status, created_at').eq('status', 'Public').ilike('title', `%${query}%`).limit(5)
  ])

  const format = (res: any, type: string) => {
    if (res.error) console.error(`Search error for ${type}:`, res.error);
    return (res.data || []).map((d: any) => ({ ...d, content_type: type }))
  }
  
  return [
    ...format(stories, 'Story'), 
    ...format(answers, 'Answer'), 
    ...format(events, 'Event'),
    ...format(vids, 'Video'),
    ...format(docs, 'Document'),
    ...format(gals, 'Gallery')
  ]
}

// ----------------------------------------------------
// Custom Page Banners (e.g., Home Activities)
// ----------------------------------------------------
export type PageBanner = {
  id: string
  page_route: string
  slot_name: string
  title: string
  subtitle: string | null
  image_url: string | null
  link_url: string | null
  display_order: number
}

export async function getPageBanners(pageRoute?: string): Promise<PageBanner[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createPublishingClient()
  let query = supabase.from('page_banners').select('*').order('display_order', { ascending: true })
  if (pageRoute) query = query.eq('page_route', pageRoute)
    
  const { data } = await query
  return (data || []) as PageBanner[]
}

export async function updatePageBanners(slotName: string, items: Partial<PageBanner>[]) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createPublishingClient()
  
  // Get existing items to know what to keep/delete
  const { data: existing } = await supabase.from('page_banners').select('id').eq('slot_name', slotName)
  const existingIds = (existing || []).map(r => r.id)
  
  const incomingIds = items.map(i => i.id).filter(Boolean) as string[]
  const toDelete = existingIds.filter(id => !incomingIds.includes(id))
  
  if (toDelete.length > 0) {
    await supabase.from('page_banners').delete().in('id', toDelete)
  }

  for (const item of items) {
    if (item.id && !item.id.toString().startsWith('new-')) {
      // update
      await supabase.from('page_banners').update({
        title: item.title,
        subtitle: item.subtitle,
        image_url: item.image_url,
        link_url: item.link_url,
        display_order: item.display_order
      }).eq('id', item.id)
    } else {
      // insert
      await supabase.from('page_banners').insert({
        page_route: item.page_route || 'home',
        slot_name: slotName,
        title: item.title,
        subtitle: item.subtitle,
        image_url: item.image_url,
        link_url: item.link_url,
        display_order: item.display_order
      })
    }
  }

  revalidatePath('/admin/publishing/featured')
  revalidatePath('/')
  return { success: true }
}
