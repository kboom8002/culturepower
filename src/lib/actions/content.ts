"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type Expert = {
  id: string
  name: string
  organization: string | null
  role: string | null
  bio: string | null
  profile_image_url: string | null
  is_active: boolean
  contact_email?: string | null
  social_links?: any | null
  created_at: string
}

export type ContentTopic = {
  id: string
  name: string
  name_ko?: string
  slug: string
  description: string | null
  is_active?: boolean
  created_at: string
}

export type TaxonomyItem = {
  id: string
  name: string
  slug: string
}

export type Answer = {
  id: string
  title: string
  summary: string | null
  content_body: string | null
  expert_ids: string[]
  topic_id: string | null
  category_id: string | null
  tag_ids: string[]
  status: 'Draft' | 'Review' | 'Scheduled' | 'Public' | 'Archived'
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  experts?: Expert[] | null
  content_topics?: ContentTopic | null
  category?: TaxonomyItem | null
  tags?: TaxonomyItem[] | null
}

export type Partner = {
  id: string
  name: string
  type: string | null
  logo_url: string | null
  website_url: string | null
  is_active: boolean
  created_at: string
}

export type MediaAsset = {
  id: string
  public_url: string
  title: string | null
  alt_text: string | null
  bytes: number | null
  width: number | null
  height: number | null
  created_at: string
  asset_type?: {
    slug: string
    name: string
  } | null
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createContentClient() {
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
// Answers
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

async function syncPersonEdge(supabase: any, contentType: 'story'|'answer'|'event', contentId: string, personIds: string[]) {
  const { data: roleData } = await supabase.from('people_roles').select('id').eq('slug', 'author').maybeSingle()
  if (!roleData) return

  await supabase.from('content_people').delete().match({ content_type: contentType, content_id: contentId, role_id: roleData.id })
  if (personIds && personIds.length > 0) {
    const payload = personIds.map((pid, idx) => ({
      content_type: contentType,
      content_id: contentId,
      person_id: pid,
      role_id: roleData.id,
      display_order: idx
    }))
    await supabase.from('content_people').insert(payload)
  }
}

async function syncAnswerTags(supabase: any, answerId: string, tagIds: string[]) {
  await supabase.from('answer_tags').delete().match({ answer_id: answerId })
  if (tagIds && tagIds.length > 0) {
    const payload = tagIds.map((tid) => ({
      answer_id: answerId,
      tag_id: tid
    }))
    await supabase.from('answer_tags').insert(payload)
  }
}

async function mapDbToAnswer(supabase: any, row: any): Promise<Answer> {
  const { data: edgeData } = await supabase.from('content_people')
      .select('person_id, display_order, people_roles!inner(slug), people(name, name_en, headline)')
      .eq('content_type', 'answer')
      .eq('content_id', row.id)
      .eq('people_roles.slug', 'author')
      .order('display_order', { ascending: true })

  const { data: tagsData } = await supabase.from('answer_tags')
      .select('tag_id, tags(name_ko, slug)')
      .eq('answer_id', row.id)

  return {
    id: row.id,
    title: row.title || '',
    summary: row.summary || null,
    content_body: row.body_text || row.answer_long || null,
    expert_ids: edgeData ? edgeData.map((e: any) => e.person_id) : [],
    topic_id: row.primary_topic_id || null,
    category_id: row.category_id || null,
    tag_ids: tagsData ? tagsData.map((t: any) => t.tag_id) : [],
    status: (await fetchStatusSlug(supabase, row.workflow_status_id)) as any,
    author_id: null,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    experts: edgeData ? edgeData.map((e: any) => ({
       id: e.person_id, 
       name: e.people?.name,
       organization: e.people?.name_en,
       role: e.people?.headline
    })) : [],
    content_topics: row.topics ? { name: row.topics.name_ko } as any : null,
    category: row.categories ? { id: row.category_id, name: row.categories.name_ko, slug: row.categories.slug } : null,
    tags: tagsData ? tagsData.map((t: any) => ({ id: t.tag_id, name: t.tags?.name_ko, slug: t.tags?.slug })) : []
  }
}

async function mapAnswerToDb(supabase: any, data: Partial<Answer>) {
  const payload: any = {}
  if (data.title !== undefined) payload.title = data.title
  if (data.summary !== undefined) payload.summary = data.summary
  if (data.content_body !== undefined) payload.body_text = data.content_body
  if (data.topic_id !== undefined) payload.primary_topic_id = data.topic_id || null
  if (data.category_id !== undefined) payload.category_id = data.category_id || null

  if (data.status) {
    const stId = await fetchStatusId(supabase, data.status)
    if (stId) payload.workflow_status_id = stId
  }

  // To cleanly insert, if workflow_status_id is missing (e.g. creating brand new), default to 'draft'
  if (!payload.workflow_status_id && !data.id) {
     const draftId = await fetchStatusId(supabase, 'draft')
     payload.workflow_status_id = draftId
  }

  // Generate random slug for MVP testing if new
  if (!data.id && data.title) {
    payload.slug = `answer-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  return payload
}

export async function getAnswers(): Promise<Answer[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('answers').select('*, topics!primary_topic_id(name_ko), categories!category_id(name_ko, slug)').order('created_at', { ascending: false })
  if (!data) return []
  const results = await Promise.all(data.map(d => mapDbToAnswer(supabase, d)))
  return results
}

export async function getAnswerById(id: string): Promise<Answer | null> {
  if (!isSupabaseConfigured() || id === 'new') return null
  const supabase = await createContentClient()
  const { data } = await supabase.from('answers').select('*, topics!primary_topic_id(name_ko), categories!category_id(name_ko, slug)').eq('id', id).single()
  if (!data) return null
  return mapDbToAnswer(supabase, data)
}

export async function upsertAnswer(id: string, partialPayload: Partial<Answer>) {
  if (!isSupabaseConfigured()) return { success: true, id: id === 'new' ? 'mock-id' : id }
  const supabase = await createContentClient()
  const payload = await mapAnswerToDb(supabase, partialPayload)
  
  if (id === 'new') {
    const { data, error } = await supabase.from('answers').insert([payload]).select().single()
    if (error) return { success: false, error: error.message }
    if (partialPayload.expert_ids !== undefined) {
      await syncPersonEdge(supabase, 'answer', data.id, partialPayload.expert_ids)
    }
    if (partialPayload.tag_ids !== undefined) {
      await syncAnswerTags(supabase, data.id, partialPayload.tag_ids)
    }
    return { success: true, id: data.id }
  } else {
    const { error } = await supabase.from('answers').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    if (partialPayload.expert_ids !== undefined) {
      await syncPersonEdge(supabase, 'answer', id, partialPayload.expert_ids)
    }
    if (partialPayload.tag_ids !== undefined) {
      await syncAnswerTags(supabase, id, partialPayload.tag_ids)
    }
    return { success: true, id }
  }
}

// ----------------------------------------------------
// Experts (Mapped to content_people)
// ----------------------------------------------------

async function mapDbToExpert(row: any): Promise<Expert> {
  const profile_image_url = row.media_assets ? row.media_assets.public_url : null;
  return {
    id: row.id,
    name: row.name,
    organization: row.name_en || null,
    role: row.headline || null,
    bio: row.bio_short || null,
    profile_image_url,
    is_active: row.status === 'active',
    created_at: row.created_at,
    contact_email: null,
    social_links: null
  }
}

async function mapExpertToDb(supabase: any, data: Partial<Expert & {contact_email?: string, social_links?: any}>) {
  const payload: any = {}
  if (data.name !== undefined) payload.name = data.name
  if (data.organization !== undefined) payload.name_en = data.organization
  if (data.role !== undefined) payload.headline = data.role
  if (data.bio !== undefined) payload.bio_short = data.bio
  if (data.is_active !== undefined) payload.status = data.is_active ? 'active' : 'inactive'
  
  if (!payload.name && !data.id) return null // Need a name at least
  
  // auto-generated slug
  if (!data.id && payload.name) {
    payload.slug = `person-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
  
  // Handle profile image
  if (data.profile_image_url !== undefined) {
    if (data.profile_image_url) {
      // Find portrait asset type
      const { data: assetType } = await supabase.from('media_asset_types').select('id').eq('slug', 'portrait').maybeSingle()
      if (assetType) {
         const { data: asset } = await supabase.from('media_assets').insert({
             public_url: data.profile_image_url,
             asset_type_id: assetType.id,
             title: `${payload.name || 'Expert'} Profile Image`
         }).select('id').single()
         if (asset) payload.profile_image_asset_id = asset.id
      }
    } else {
      payload.profile_image_asset_id = null
    }
  }
  
  return payload
}

export async function getExperts(): Promise<Expert[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('people').select('*, media_assets!profile_image_asset_id(public_url)').order('name', { ascending: true })
  if (!data) return []
  return Promise.all(data.map(mapDbToExpert))
}

export async function getExpertById(id: string): Promise<Expert | null> {
  if (!isSupabaseConfigured() || id === 'new') return null
  const supabase = await createContentClient()
  const { data, error } = await supabase.from('people').select('*, media_assets!profile_image_asset_id(public_url)').eq('id', id).single()
  if (error || !data) return null
  return mapDbToExpert(data)
}

export async function upsertExpert(id: string, partialPayload: Partial<Expert & {contact_email?: string, social_links?: any}>) {
  if (!isSupabaseConfigured()) return { success: true, id: id === 'new' ? 'mock-id' : id }
  const supabase = await createContentClient()
  const payload = await mapExpertToDb(supabase, partialPayload)
  if (!payload) return { success: false, error: "Invalid payload (Name required)" }
  
  if (id === 'new') {
    const { data, error } = await supabase.from('people').insert([payload]).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, id: data.id }
  } else {
    const { error } = await supabase.from('people').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true, id }
  }
}

export async function deleteExpert(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createContentClient()
  const { error } = await supabase.from('people').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ----------------------------------------------------
// Topics, Partners, Resources
// ----------------------------------------------------
export async function getTopics(): Promise<ContentTopic[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('topics').select('id, name_ko, slug, description, status').order('sort_order', { ascending: true })
  return (data || []).map((t: any) => ({
    id: t.id,
    name: t.name_ko,
    slug: t.slug,
    description: t.description,
    is_active: t.status === 'active',
    created_at: new Date().toISOString()
  }))
}

export async function createTopic(payload: { name: string, slug: string, description?: string }) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createContentClient()
  // Mapping to public.topics
  const insertPayload = {
    name_ko: payload.name,
    name_en: payload.name,
    slug: payload.slug,
    description: payload.description || '',
    status: 'active',
    level: 1,
    sort_order: 99
  }
  const { error } = await supabase.from('topics').insert([insertPayload])
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('partners').select('*').order('name', { ascending: true })
  return (data || []) as Partner[]
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('media_assets')
    .select('id, public_url, title, alt_text, bytes, width, height, created_at, media_asset_types(slug, name)')
    .order('created_at', { ascending: false })
  
  return (data || []).map((m: any) => ({
    ...m,
    asset_type: m.media_asset_types
  })) as MediaAsset[]
}

export async function uploadMediaAssetDb(payload: Partial<MediaAsset> & { asset_type_slug?: string }) {
  if (!isSupabaseConfigured()) return { success: false, error: 'DB Connect Error' }
  const supabase = await createContentClient()
  
  // Find asset type
  let typeId = null
  if (payload.asset_type_slug) {
     const { data: t } = await supabase.from('media_asset_types').select('id').eq('slug', payload.asset_type_slug).maybeSingle()
     if (t) typeId = t.id
  }
  
  const insertPayload = {
    public_url: payload.public_url,
    title: payload.title,
    alt_text: payload.alt_text,
    bytes: payload.bytes,
    width: payload.width,
    height: payload.height,
    asset_type_id: typeId
  }
  
  const { data, error } = await supabase.from('media_assets').insert([insertPayload]).select().single()
  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function deleteMediaAssetDb(id: string) {
  if (!isSupabaseConfigured()) return { success: false, error: 'DB Connect Error' }
  const supabase = await createContentClient()
  const { error } = await supabase.from('media_assets').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getSections(): Promise<TaxonomyItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('sections').select('id, name_ko, slug').eq('status', 'active').order('sort_order', { ascending: true })
  return (data || []).map((s: any) => ({ ...s, name: s.name_ko }))
}

export async function getCategories(): Promise<TaxonomyItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('categories').select('id, name_ko, slug').eq('status', 'active').order('created_at', { ascending: true })
  return (data || []).map((s: any) => ({ ...s, name: s.name_ko }))
}

export async function getSeries(): Promise<TaxonomyItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('series').select('id, name_ko, slug').eq('status', 'active').order('sort_order', { ascending: true })
  return (data || []).map((s: any) => ({ ...s, name: s.name_ko }))
}

export async function getTags(): Promise<TaxonomyItem[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('tags').select('id, name_ko, slug').eq('status', 'active').order('created_at', { ascending: false })
  return (data || []).map((s: any) => ({ ...s, name: s.name_ko }))
}
