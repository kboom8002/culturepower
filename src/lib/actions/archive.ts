"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Define the Types based on our schema
export type ArchiveEvent = {
  id: string
  title: string
  summary: string | null
  event_type: string | null
  status: 'Draft' | 'Review' | 'Public' | 'Hidden' | 'Archived' | 'Closed'
  start_date: string | null
  end_date: string | null
  location: string | null
  registration_link: string | null
  slug: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  program_json: any | null
  topic_id: string | null
  owner_user_id: string | null
  reviewer_id: string | null
  
  series_id?: string | null
  round_no?: number | null
  has_result_assets?: boolean
  featured_image_url?: string | null
  event_status?: string | null
}

export type ArchiveVideo = {
  id: string
  title: string
  summary: string | null
  source_url: string
  embed_url: string | null
  thumbnail_url: string | null
  duration_seconds: number | null
  status: string
  related_event_id: string | null
  created_at: string
  updated_at: string
}

export type ArchiveDocument = {
  id: string
  title: string
  document_type: string | null
  file_url: string
  summary: string | null
  source_label: string | null
  status: string
  related_event_id: string | null
  created_at: string
  updated_at: string
}

export type ArchiveGallery = {
  id: string
  title: string
  caption_summary: string | null
  photo_count: number
  status: string
  related_event_id: string | null
  created_at: string
  updated_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => {
  return SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0
}

export async function createArchiveClient() {
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

// Fallback Mock Data
const MOCK_EVENTS: ArchiveEvent[] = [
  {
    id: "EVT-001", title: "[Mock] 제1회 K-문명 포럼", summary: "K-문명 기초 확립 컨퍼런스", event_type: "Conference",
    status: "Closed", start_date: "2026-03-10T10:00:00Z", end_date: "2026-03-10T18:00:00Z", location: "서울 DDP",
    registration_link: null, slug: "k-civilization-forum-1", published_at: "2026-03-01T00:00:00Z",
    created_at: "2026-02-15T00:00:00Z", updated_at: "2026-03-11T00:00:00Z", program_json: null, topic_id: null, owner_user_id: null, reviewer_id: null
  }
]

// ----------------------------------------------------
// Database Mappings for Events
// ----------------------------------------------------

async function fetchStatusId(supabase: any, frontendStatus: string): Promise<string | null> {
  const slug = frontendStatus.toLowerCase()
  const { data } = await supabase.from('workflow_statuses').select('id').eq('slug', slug).maybeSingle()
  return data?.id || null
}

async function fetchStatusSlug(supabase: any, dbStatusId: string): Promise<string> {
  const { data } = await supabase.from('workflow_statuses').select('slug').eq('id', dbStatusId).maybeSingle()
  return data?.slug ? data.slug.charAt(0).toUpperCase() + data.slug.slice(1) : 'Draft'
}

async function ensureMediaAsset(supabase: any, url: string) {
  if (!url) return null;
  const { data } = await supabase.from('media_assets').select('id').eq('public_url', url).maybeSingle()
  if (data) return data.id;
  
  const { data: newData, error } = await supabase.from('media_assets').insert({
    public_url: url,
    asset_type: 'image',
    filename: url.split('/').pop() || 'uploaded.jpg'
  }).select('id').single()
  
  if (error) console.error("Error creating media asset:", error)
  return newData?.id || null
}

async function mapDbToEvent(supabase: any, row: any): Promise<ArchiveEvent> {
  return {
    id: row.id,
    title: row.title || '',
    summary: row.summary || null,
    event_type: 'Conference',
    status: (await fetchStatusSlug(supabase, row.workflow_status_id)) as any,
    start_date: row.start_at || null,
    end_date: row.end_at || null,
    location: row.location_name || null,
    registration_link: row.registration_url || null,
    slug: row.slug || null,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    program_json: row.custom_fields || null,
    topic_id: row.primary_topic_id || null,
    owner_user_id: null,
    reviewer_id: null,
    round_no: row.round_no || null,
    has_result_assets: row.has_result_assets || false,
    event_status: row.event_status || null,
    featured_image_url: row.featured_image_asset?.public_url || null,
    series_id: row.event_series?.[0]?.series_id || null,
  }
}

async function mapEventToDb(supabase: any, data: Partial<ArchiveEvent>) {
  const payload: any = {}
  if (data.title !== undefined) payload.title = data.title
  if (data.summary !== undefined) payload.summary = data.summary
  if (data.start_date !== undefined) payload.start_at = data.start_date
  if (data.end_date !== undefined) payload.end_at = data.end_date
  if (data.location !== undefined) payload.location_name = data.location
  if (data.registration_link !== undefined) payload.registration_url = data.registration_link
  if (data.topic_id !== undefined) payload.primary_topic_id = data.topic_id || null
  if (data.round_no !== undefined) payload.round_no = data.round_no
  if (data.has_result_assets !== undefined) payload.has_result_assets = data.has_result_assets
  if (data.event_status !== undefined) payload.event_status = data.event_status

  if (data.featured_image_url !== undefined) {
    if (data.featured_image_url) {
      payload.featured_image_asset_id = await ensureMediaAsset(supabase, data.featured_image_url)
    } else {
      payload.featured_image_asset_id = null
    }
  }

  if (data.status) {
    // If user saves as Public, map it immediately to 'published' skip queue
    const targetStatus = data.status === 'Public' ? 'published' : data.status
    const stId = await fetchStatusId(supabase, targetStatus)
    if (stId) payload.workflow_status_id = stId
    
    if (data.status === 'Public' && !data.id) {
       payload.published_at = new Date().toISOString()
    }
  }

  if (!payload.workflow_status_id && !data.id) {
     const draftId = await fetchStatusId(supabase, 'draft')
     payload.workflow_status_id = draftId
  }

  if (!data.id && data.title) {
    payload.slug = `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  return payload
}

export async function getEvents(): Promise<ArchiveEvent[]> {
  if (!isSupabaseConfigured()) return MOCK_EVENTS
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('events').select('*, featured_image_asset:media_assets!featured_image_asset_id(public_url), event_series(series_id)').order('start_at', { ascending: false })
  if (error || !data) { console.error("Error fetching events:", error); return [] }
  const results = await Promise.all(data.map(d => mapDbToEvent(supabase, d)))
  return results
}

export async function getEventById(id: string): Promise<ArchiveEvent | null> {
  if (!isSupabaseConfigured()) return MOCK_EVENTS.find(e => e.id === id) || MOCK_EVENTS[0]
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('events').select('*, featured_image_asset:media_assets!featured_image_asset_id(public_url), event_series(series_id)').eq('id', id).single()
  if (error || !data) { console.error(`Error fetching event ${id}:`, error); return null }
  return mapDbToEvent(supabase, data)
}

export async function createEvent(partialPayload: Partial<ArchiveEvent>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id: "mock-evt", ...partialPayload } }
  const supabase = await createArchiveClient()
  const { series_id, ...restPayload } = partialPayload
  const payload = await mapEventToDb(supabase, restPayload)
  
  const { data, error } = await supabase.from('events').insert([payload]).select().single()
  if (error) return { success: false, error: error.message }
  
  if (series_id) {
     await supabase.from('event_series').insert([{ event_id: data.id, series_id }])
  }
  
  revalidatePath('/admin/archive/events')
  return { success: true, data }
}

export async function updateEvent(id: string, partialPayload: Partial<ArchiveEvent>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id, ...partialPayload } }
  const supabase = await createArchiveClient()
  const { series_id, ...restPayload } = partialPayload
  const payload = await mapEventToDb(supabase, restPayload)
  
  const { data, error } = await supabase.from('events').update(payload).eq('id', id).select().single()
  if (error) return { success: false, error: error.message }
  
  if (series_id !== undefined) {
     await supabase.from('event_series').delete().eq('event_id', id)
     if (series_id) {
        await supabase.from('event_series').insert([{ event_id: id, series_id }])
     }
  }

  revalidatePath('/admin/archive/events')
  revalidatePath(`/admin/archive/events/${id}`)
  return { success: true, data }
}

export async function getSeriesList() {
  const supabase = await createArchiveClient()
  const { data } = await supabase.from('series').select('*').order('name_ko', { ascending: true })
  return data || []
}

export async function deleteEvent(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createArchiveClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/events')
  return { success: true }
}

// Completion Score Logic
export type EventCompletionStatus = {
  event: ArchiveEvent,
  docsCount: number,
  videosCount: number,
  galleriesCount: number
}

export async function getEventCompletions(): Promise<EventCompletionStatus[]> {
  const events = await getEvents()
  
  if (!isSupabaseConfigured()) {
    // Mock Completion
    return events.map(event => ({
      event,
      docsCount: 1,
      videosCount: 0, // Missing!
      galleriesCount: 2
    }))
  }

  const supabase = await createArchiveClient()
  
  // To avoid N+1 queries in a real app, this should be a DB View or RPC, but for prototype we can fetch all or do Promise.all
  // Since it's a prototype admin, Promise.all is acceptable for a small number of events.
  const completions = await Promise.all(events.map(async (event) => {
    const [{ count: docs }, { count: vids }, { count: gals }] = await Promise.all([
      supabase.from('documents').select('*', { count: 'exact', head: true }).eq('related_event_id', event.id),
      supabase.from('videos').select('*', { count: 'exact', head: true }).eq('related_event_id', event.id),
      supabase.from('galleries').select('*', { count: 'exact', head: true }).eq('related_event_id', event.id),
    ])
    
    return {
      event,
      docsCount: docs || 0,
      videosCount: vids || 0,
      galleriesCount: gals || 0
    }
  }))
  
  return completions
}

// Media Actions (Videos, Documents, Galleries)

export async function getVideos(): Promise<ArchiveVideo[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createArchiveClient()
  const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
  return (data || []) as ArchiveVideo[]
}

export async function getVideoById(id: string): Promise<ArchiveVideo | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('videos').select('*').eq('id', id).single()
  if (error) { console.error(`Error fetching video ${id}:`, error); return null }
  return data as ArchiveVideo
}

export async function createVideo(payload: Partial<ArchiveVideo>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id: "mock-vid", ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('videos').insert([payload]).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/videos')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function updateVideo(id: string, payload: Partial<ArchiveVideo>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id, ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('videos').update(payload).eq('id', id).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/videos')
  revalidatePath(`/admin/archive/videos/${id}`)
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function deleteVideo(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createArchiveClient()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/videos')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true }
}

export async function getDocuments(): Promise<ArchiveDocument[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createArchiveClient()
  const { data } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
  return (data || []) as ArchiveDocument[]
}

export async function getDocumentById(id: string): Promise<ArchiveDocument | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('documents').select('*').eq('id', id).single()
  if (error) { console.error(`Error fetching document ${id}:`, error); return null }
  return data as ArchiveDocument
}

export async function createDocument(payload: Partial<ArchiveDocument>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id: "mock-doc", ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('documents').insert([payload]).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/documents')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function updateDocument(id: string, payload: Partial<ArchiveDocument>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id, ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('documents').update(payload).eq('id', id).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/documents')
  revalidatePath(`/admin/archive/documents/${id}`)
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function deleteDocument(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createArchiveClient()
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/documents')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true }
}

export async function getGalleries(): Promise<ArchiveGallery[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createArchiveClient()
  const { data } = await supabase.from('galleries').select('*').order('created_at', { ascending: false })
  return (data || []) as ArchiveGallery[]
}

export async function getGalleryById(id: string): Promise<ArchiveGallery | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('galleries').select('*').eq('id', id).single()
  if (error) { console.error(`Error fetching gallery ${id}:`, error); return null }
  return data as ArchiveGallery
}

export async function createGallery(payload: Partial<ArchiveGallery>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id: "mock-gal", ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('galleries').insert([payload]).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/galleries')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function updateGallery(id: string, payload: Partial<ArchiveGallery>) {
  if (!isSupabaseConfigured()) return { success: true, data: { id, ...payload } }
  const supabase = await createArchiveClient()
  const { data, error } = await supabase.from('galleries').update(payload).eq('id', id).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/galleries')
  revalidatePath(`/admin/archive/galleries/${id}`)
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true, data }
}

export async function deleteGallery(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createArchiveClient()
  const { error } = await supabase.from('galleries').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/archive/galleries')
  revalidatePath('/data')
  revalidatePath('/events')
  return { success: true }
}
