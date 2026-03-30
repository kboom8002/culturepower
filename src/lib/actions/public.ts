"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function createPublicClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll() {},
    },
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' })
    }
  })
}

// ----------------------------------------------------------------------
// Types Mapping (Backward Compatible)
// ----------------------------------------------------------------------

export type PublicStory = {
  id: string
  slug: string
  title: string
  deck: string | null
  why_this_matters: string | null
  body: string | null
  meta_description: string | null
  section: string | null
  story_type: string | null
  related_answers_meta: any | null
  updated_at: string
  published_at: string | null
  created_at: string
  topic_id: string | null
  topics?: { name: string, slug: string, description: string } | null
  experts?: { name: string, organization: string, role: string } | null
  admin_users?: { name: string } | null
  featured_image?: { url: string, alt: string | null } | null
}

export type PublicAnswer = {
  id: string
  slug: string
  title: string
  summary: string | null
  content_body: string | null
  updated_at: string
  published_at: string | null
  created_at: string
  topic_id: string | null
  topics?: { name: string, slug: string, description: string } | null
  experts?: { name: string, organization: string, role: string, profile_image_url: string } | null
  admin_users?: { name: string } | null
}

export type PublicEvent = {
  id: string
  title: string
  venue: string | null
  start_date: string | null
  end_date: string | null
  thumbnail_url: string | null
  status: string 
  videos?: any[]
  documents?: any[]
  galleries?: any[]
}

// ----------------------------------------------------------------------
// Status Helper
// ----------------------------------------------------------------------

async function getPublishedStatusId(supabase: any) {
  const { data } = await supabase.from('workflow_statuses').select('id').eq('slug', 'published').maybeSingle()
  return data?.id
}

const mapStory = (s: any): PublicStory => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  deck: s.standfirst || s.subtitle || null,
  why_this_matters: s.summary || null,
  body: s.body_text || null,
  meta_description: s.meta_description || s.summary || null,
  section: null,
  story_type: null,
  related_answers_meta: null,
  updated_at: s.updated_at,
  published_at: s.published_at,
  created_at: s.created_at,
  topic_id: s.primary_topic_id,
  topics: s.topics ? { name: s.topics.name_ko, slug: s.topics.slug, description: s.topics.description } : null,
  featured_image: s.featured_image ? { url: s.featured_image.public_url, alt: s.featured_image.alt_text } : null,
  experts: null,
  admin_users: null
})

const mapAnswer = (a: any): PublicAnswer => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  summary: a.summary,
  content_body: a.body_text || a.answer_long || null,
  updated_at: a.updated_at,
  published_at: a.published_at,
  created_at: a.created_at,
  topic_id: a.primary_topic_id,
  topics: a.topics ? { name: a.topics.name_ko, slug: a.topics.slug, description: a.topics.description } : null,
  experts: null,
  admin_users: null
})

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export async function getPublicStories(): Promise<PublicStory[]> {
  const supabase = await createPublicClient()
  const pubId = await getPublishedStatusId(supabase)
  
  let query = supabase.from('stories').select('*, topics!primary_topic_id(name_ko, slug, description), featured_image:media_assets!featured_image_asset_id(public_url, alt_text)').order('published_at', { ascending: false })
  if (pubId) query = query.eq('workflow_status_id', pubId)

  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapStory)
}

export async function getPublicStoryById(slug: string): Promise<PublicStory | null> {
  const supabase = await createPublicClient()
  
  let query = supabase.from('stories').select('*, topics!primary_topic_id(name_ko, slug, description), featured_image:media_assets!featured_image_asset_id(public_url, alt_text)').eq('slug', slug).maybeSingle()
  const { data, error } = await query
  
  if (error || !data) return null
  return mapStory(data)
}

// ----------------------------------------------------------------------
// Answers
// ----------------------------------------------------------------------

export async function getPublicAnswers(): Promise<PublicAnswer[]> {
  const supabase = await createPublicClient()
  const pubId = await getPublishedStatusId(supabase)
  
  let query = supabase.from('answers').select('*, topics!primary_topic_id(name_ko, slug, description)').order('published_at', { ascending: false })
  if (pubId) query = query.eq('workflow_status_id', pubId)

  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapAnswer)
}

export async function getPublicAnswerById(slug: string): Promise<PublicAnswer | null> {
  const supabase = await createPublicClient()
  
  let query = supabase.from('answers').select('*, topics!primary_topic_id(name_ko, slug, description)').eq('slug', slug).maybeSingle()
  const { data, error } = await query
  
  if (error || !data) return null
  return mapAnswer(data)
}

// ----------------------------------------------------------------------
// Events
// ----------------------------------------------------------------------

export async function getPublicEvents(): Promise<PublicEvent[]> {
  const supabase = await createPublicClient()
  const pubId = await getPublishedStatusId(supabase)
  
  let query = supabase.from('events').select('*, topics!primary_topic_id(name_ko, slug, description)').order('start_at', { ascending: false })
  if (pubId) query = query.eq('workflow_status_id', pubId)

  const { data, error } = await query
  if (error || !data) return []
  
  // Map back to expected interface
  const nowTime = new Date().getTime()
  return data.map((e: any) => {
    let evtStatus = 'Upcoming'
    const evTime = new Date(e.start_at || 0).getTime()
    if (evTime < nowTime) evtStatus = 'Closed'
    if (evTime === nowTime) evtStatus = 'Ongoing' // simplified
    
    return {
      id: e.id,
      title: e.title,
      venue: e.location_name || null,
      start_date: e.start_at || null,
      end_date: e.end_at || null,
      thumbnail_url: null, // Should fetch from media_assets in real impl
      status: evtStatus
    }
  })
}

export async function getPublicEventById(id: string): Promise<PublicEvent | null> {
  const events = await getPublicEvents()
  return events.find(e => e.id === id) || null
}

export async function getPublicResources() {
  const supabase = await createPublicClient()
  // 1차적으로는 기존 videos, documents 테이블 에러가 안나도록 빈배열이나 안전한 fetch 수행
  // (임시 호환성 유지 목적)
  const fetchSafe = async (builder: any) => {
    try { const res = await builder; return res.data || [] } catch { return [] }
  }
  const [vids, docs, gals] = await Promise.all([
    fetchSafe(supabase.from('videos').select('*').limit(10)),
    fetchSafe(supabase.from('documents').select('*').limit(10)),
    fetchSafe(supabase.from('galleries').select('*').limit(10))
  ])
  return { videos: vids, documents: docs, galleries: gals }
}

export type PublicExpert = { id: string, name: string, organization: string | null, role: string | null, bio: string | null, profile_image_url: string | null }
export async function getPublicExperts(): Promise<PublicExpert[]> {
  const supabase = await createPublicClient()
  const { data, error } = await supabase
    .from('people')
    .select('*, media_assets!people_profile_image_asset_fk(public_url)')
    .eq('status', 'active')
    .order('created_at', { ascending: true })
  
  if (error || !data) return []
  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    organization: null,
    role: p.headline,
    bio: p.bio_short,
    profile_image_url: p.media_assets ? p.media_assets.public_url : null
  }))
}
