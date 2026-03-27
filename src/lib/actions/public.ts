"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Story } from "./story"
import { Answer } from "./content"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a read-only client for public visitors (No Auth enforcement, just ANON identity)
export async function createPublicClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll() {}, // Public requests usually don't set auth cookies
    },
  })
}

export type PublicStory = Story & {
  experts?: { name: string, organization: string, role: string } | null
  admin_users?: { name: string } | null
}

export type PublicAnswer = Answer & {
  topics?: { name: string, slug: string, description: string } | null
  experts?: { name: string, organization: string, role: string, profile_image_url: string } | null
  admin_users?: { name: string } | null
}

/**
 * Gets all Stories marked as 'Public'
 */
export async function getPublicStories(): Promise<PublicStory[]> {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  let { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .order('published_at', { ascending: false })
  
  if (error && error.code === 'PGRST200') {
    console.warn("Schema cache error! Falling back to raw stories query.");
    const fallback = await supabase
      .from('stories')
      .select('*')
      .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
      .order('published_at', { ascending: false })
    data = fallback.data;
    error = fallback.error;
  }

  if (error || !data) return []
  return data as PublicStory[]
}

/**
 * Gets a single Public Story by ID or Slug
 */
export async function getPublicStoryById(id: string): Promise<PublicStory | null> {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  let { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role), admin_users(name)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .eq('id', id)
    .single()
  
  if (error && error.code === 'PGRST200') {
    console.warn("Schema cache error! Falling back to raw story query.");
    const fallback = await supabase
      .from('stories')
      .select('*')
      .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
      .eq('id', id)
      .single()
    data = fallback.data;
    error = fallback.error;
  }

  if (error || !data) return null
  return data as PublicStory
}

/**
 * Gets all Answers marked as 'Public'
 */
export async function getPublicAnswers(): Promise<PublicAnswer[]> {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  let { data, error } = await supabase
    .from('answers')
    .select('*, topics(name, slug, description)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .order('published_at', { ascending: false })
  
  if (error && error.code === 'PGRST200') {
    const fallback = await supabase
      .from('answers')
      .select('*')
      .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
      .order('published_at', { ascending: false })
    data = fallback.data;
    error = fallback.error;
  }

  if (error || !data) return []
  return data as PublicAnswer[]
}

/**
 * Gets a single Public Answer by ID
 */
export async function getPublicAnswerById(id: string): Promise<PublicAnswer | null> {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  let { data, error } = await supabase
    .from('answers')
    .select('*, topics(name, slug, description), experts(name, organization, role, profile_image_url), admin_users(name)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .eq('id', id)
    .single()
  
  if (error && error.code === 'PGRST200') {
    const fallback = await supabase
      .from('answers')
      .select('*')
      .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
      .eq('id', id)
      .single()
    data = fallback.data
    error = fallback.error
  }

  if (error || !data) return null
  return data as PublicAnswer
}

export type PublicEvent = {
  id: string
  title: string
  venue: string | null
  start_date: string | null
  end_date: string | null
  thumbnail_url: string | null
  status: string
  videos?: { id: string, title: string, source_url: string, duration_seconds: number, embed_url: string | null, thumbnail_url: string | null }[]
  documents?: { id: string, title: string, file_url: string, document_type: string, summary: string | null }[]
  galleries?: { id: string, title: string, photo_count: number, caption_summary: string | null }[]
}

export async function getPublicEvents(): Promise<PublicEvent[]> {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    // Or whatever the active status is, events use 'Upcoming', 'Ongoing', 'Closed'
    // For Events, 'status' does not use Public/Scheduled mechanism directly like Stories/Answers, 
    // it uses 'Upcoming', 'Ongoing', 'Closed'. 
    // So we don't need the Scheduled fallback here.
    .in('status', ['Upcoming', 'Ongoing', 'Closed'])
    .order('start_date', { ascending: false })
  
  if (error || !data) return []
  return data as PublicEvent[]
}

export async function getPublicEventById(id: string): Promise<PublicEvent | null> {
  const supabase = await createPublicClient()
  
  // First fetch event
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
    
  if (eventError || !eventData) return null
  
  const nowIso = new Date().toISOString()
  // Then fetch related public media
  const [videosDb, docsDb, galleriesDb] = await Promise.all([
    supabase.from('videos').select('*').eq('related_event_id', id).or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`),
    supabase.from('documents').select('*').eq('related_event_id', id).or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`),
    supabase.from('galleries').select('*').eq('related_event_id', id).or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
  ])
  
  return {
    ...eventData,
    videos: videosDb.data || [],
    documents: docsDb.data || [],
    galleries: galleriesDb.data || []
  } as PublicEvent
}

export async function getPublicResources() {
  const supabase = await createPublicClient()
  const nowIso = new Date().toISOString()
  
  const [vids, docs, gals] = await Promise.all([
    supabase.from('videos').select('*').or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`).order('created_at', { ascending: false }),
    supabase.from('documents').select('*').or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`).order('created_at', { ascending: false }),
    supabase.from('galleries').select('*').or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`).order('created_at', { ascending: false })
  ])
  
  return {
    videos: vids.data || [],
    documents: docs.data || [],
    galleries: gals.data || []
  }
}
