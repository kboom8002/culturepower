"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Define the Story type exposed to the React Admin hook forms
export type Story = {
  id: string
  title: string
  deck: string | null
  body: string
  status: string // frontend enum
  
  // Taxonomy Mapping IDs
  topic_id: string | null
  section_id: string | null
  category_id: string | null
  series_id: string | null

  published_at: string | null
  created_at: string
  updated_at: string
  
  // legacy/optional placeholders
  why_this_matters?: string | null
  og_image_url?: string | null

  // N:M Mappings
  author_expert_ids: string[]
  related_answer_ids: string[]
  tag_ids: string[]
  
  // Render payloads
  experts?: any[] | null
  content_topics?: any | null
  related_answers_meta?: any[] | null
  section_name?: string | null
  category_name?: string | null
  series_name?: string | null
  tags?: any[] | null
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => {
  return SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0
}

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
      },
    },
  })
}

// -------------------------------------------------------------
// Helper: DB Row <--> Frontend Story Object Mapping
// -------------------------------------------------------------

async function fetchStatusId(supabase: any, frontendStatus: string): Promise<string | null> {
  const slug = frontendStatus.toLowerCase()
  const { data } = await supabase.from('workflow_statuses').select('id').eq('slug', slug).maybeSingle()
  return data?.id || null
}

async function fetchStatusSlug(supabase: any, dbStatusId: string): Promise<string> {
  const { data } = await supabase.from('workflow_statuses').select('slug').eq('id', dbStatusId).maybeSingle()
  return data?.slug || 'draft'
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

async function syncRelatedLinks(supabase: any, sourceContentType: 'story'|'answer'|'event', contentId: string, targetType: 'answer', targetIds: string[]) {
  const relMap: any = { 'answer': 'related-answer' }
  const rType = relMap[targetType]
  await supabase.from('content_related_links').delete().match({ source_content_type: sourceContentType, source_content_id: contentId, relation_type: rType })
  
  if (targetIds && targetIds.length > 0) {
     const payload = targetIds.map((tid, idx) => ({
        source_content_type: sourceContentType,
        source_content_id: contentId,
        target_content_type: targetType,
        target_content_id: tid,
        relation_type: rType,
        display_order: idx
     }))
     await supabase.from('content_related_links').insert(payload)
  }
}

async function syncStoryTags(supabase: any, storyId: string, tagIds: string[]) {
  await supabase.from('story_tags').delete().match({ story_id: storyId })
  if (tagIds && tagIds.length > 0) {
    const payload = tagIds.map((tid) => ({
      story_id: storyId,
      tag_id: tid
    }))
    await supabase.from('story_tags').insert(payload)
  }
}

async function mapDbToStory(supabase: any, row: any): Promise<Story> {
  const { data: edgeData } = await supabase.from('content_people')
      .select('person_id, display_order, people_roles!inner(slug), people(name)')
      .eq('content_type', 'story')
      .eq('content_id', row.id)
      .eq('people_roles.slug', 'author')
      .order('display_order', { ascending: true })

  const { data: linkData } = await supabase.from('content_related_links')
      .select('target_content_id, answers(title)')
      .eq('source_content_type', 'story')
      .eq('source_content_id', row.id)
      .eq('relation_type', 'related-answer')
      .order('display_order', { ascending: true })

  const { data: tagsData } = await supabase.from('story_tags')
      .select('tag_id, tags(name_ko, slug)')
      .eq('story_id', row.id)

  return {
    id: row.id,
    title: row.title || '',
    deck: row.standfirst || row.subtitle || null,
    body: row.body_text || '',
    status: (await fetchStatusSlug(supabase, row.workflow_status_id)).toUpperCase(),
    topic_id: row.primary_topic_id || null,
    section_id: row.section_id || null,
    category_id: row.category_id || null,
    series_id: row.primary_series_id || null,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    why_this_matters: row.summary,
    author_expert_ids: edgeData ? edgeData.map((e: any) => e.person_id) : [],
    related_answer_ids: linkData ? linkData.map((l: any) => l.target_content_id) : [],
    tag_ids: tagsData ? tagsData.map((t: any) => t.tag_id) : [],
    experts: edgeData ? edgeData.map((e: any) => ({ name: e.people?.name, id: e.person_id })) : [],
    related_answers_meta: linkData ? linkData.map((l: any) => ({ title: l.answers?.title, id: l.target_content_id })) : [],
    og_image_url: (row as any).media_assets?.public_url || null,
    content_topics: row.topics ? { name: row.topics.name_ko } as any : null,
    section_name: row.sections?.name_ko || null,
    category_name: row.categories?.name_ko || null,
    series_name: row.series?.name_ko || null,
    tags: tagsData ? tagsData.map((t: any) => ({ id: t.tag_id, name: t.tags?.name_ko, slug: t.tags?.slug })) : []
  }
}

async function mapStoryToDb(supabase: any, data: Partial<Story>) {
  const payload: any = {}
  if (data.title !== undefined) payload.title = data.title
  if (data.deck !== undefined) payload.standfirst = data.deck
  if (data.body !== undefined) payload.body_text = data.body
  if (data.topic_id !== undefined) payload.primary_topic_id = data.topic_id || null
  if (data.section_id !== undefined) payload.section_id = data.section_id || null
  if (data.category_id !== undefined) payload.category_id = data.category_id || null
  if (data.series_id !== undefined) payload.primary_series_id = data.series_id || null
  if (data.why_this_matters !== undefined) payload.summary = data.why_this_matters

  if (data.og_image_url !== undefined) {
    if (!data.og_image_url) {
      payload.featured_image_asset_id = null
    } else {
      const { data: existingAsset, error: existingErr } = await supabase.from('media_assets').select('id').eq('public_url', data.og_image_url).maybeSingle()
      if (existingErr) console.error("DEBUG existingAsset err:", existingErr)
      if (existingAsset) {
        payload.featured_image_asset_id = existingAsset.id
      } else {
        const { data: assetType, error: typeErr } = await supabase.from('media_asset_types').select('id').eq('slug', 'featured-image').maybeSingle()
        if (typeErr) console.error("DEBUG typeErr:", typeErr)
        if (assetType) {
          const { data: newAsset, error: insertErr } = await supabase.from('media_assets')
            .insert([{ public_url: data.og_image_url, asset_type_id: assetType.id, title: 'Story Cover' }])
            .select().single()
          if (insertErr) console.error("DEBUG insertErr media_assets:", insertErr)
          if (newAsset) payload.featured_image_asset_id = newAsset.id
        }
      }
    }
  }

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
    payload.slug = `story-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  return payload
}

// -------------------------------------------------------------
// Database Logic
// -------------------------------------------------------------

export async function getStories(): Promise<Story[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createClient()
  const { data, error } = await supabase.from('stories').select('*, topics!primary_topic_id(name_ko), sections!section_id(name_ko), categories!category_id(name_ko), series!primary_series_id(name_ko), media_assets!featured_image_asset_id(public_url)').order('created_at', { ascending: false })
  if (error || !data) return []
  
  const results = await Promise.all(data.map((d: any) => mapDbToStory(supabase, d)))
  return results
}

export async function getStoryById(id: string): Promise<Story | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data, error } = await supabase.from('stories').select('*, topics!primary_topic_id(name_ko), sections!section_id(name_ko), categories!category_id(name_ko), series!primary_series_id(name_ko), media_assets!featured_image_asset_id(public_url)').eq('id', id).single()
  if (error || !data) return null
  return mapDbToStory(supabase, data)
}

export async function createStory(storyData: Partial<Story>) {
  if (!isSupabaseConfigured()) return { success: false, error: 'DB Connect Error' }
  const supabase = await createClient()
  const payload = await mapStoryToDb(supabase, storyData)

  const { data, error } = await supabase.from('stories').insert([payload]).select().single()
  if (error) {
    console.error("Error creating story:", error)
    return { success: false, error: error.message }
  }
  
  if (storyData.author_expert_ids !== undefined) {
    await syncPersonEdge(supabase, 'story', data.id, storyData.author_expert_ids)
  }
  if (storyData.related_answer_ids !== undefined) {
    await syncRelatedLinks(supabase, 'story', data.id, 'answer', storyData.related_answer_ids)
  }
  if (storyData.tag_ids !== undefined) {
    await syncStoryTags(supabase, data.id, storyData.tag_ids)
  }

  revalidatePath('/admin/content/stories')
  return { success: true, data }
}

export async function updateStory(id: string, storyData: Partial<Story>) {
  if (!isSupabaseConfigured()) return { success: false, error: 'DB Connect Error' }
  const supabase = await createClient()
  const payload = await mapStoryToDb(supabase, storyData)

  const { data, error } = await supabase.from('stories').update(payload).eq('id', id).select().single()
  if (error) {
    console.error(`Error updating story ${id}:`, error)
    return { success: false, error: error.message }
  }

  if (storyData.author_expert_ids !== undefined) {
    await syncPersonEdge(supabase, 'story', id, storyData.author_expert_ids)
  }
  if (storyData.related_answer_ids !== undefined) {
    await syncRelatedLinks(supabase, 'story', id, 'answer', storyData.related_answer_ids)
  }
  if (storyData.tag_ids !== undefined) {
    await syncStoryTags(supabase, id, storyData.tag_ids)
  }

  revalidatePath('/admin/content/stories')
  revalidatePath(`/admin/content/stories/${id}`)
  return { success: true, data }
}

export async function deleteStory(id: string) {
  if (!isSupabaseConfigured()) return { success: false, error: 'DB Connect Error' }
  const supabase = await createClient()
  const { error } = await supabase.from('stories').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/content/stories')
  return { success: true }
}
