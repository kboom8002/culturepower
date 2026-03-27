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
  created_at: string
}

export type ContentTopic = {
  id: string
  name: string
  slug: string
  description: string | null
  is_active: boolean
  created_at: string
}

export type Answer = {
  id: string
  title: string
  summary: string | null
  content_body: string | null
  expert_id: string | null
  topic_id: string | null
  status: 'Draft' | 'Review' | 'Scheduled' | 'Public' | 'Archived'
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  experts?: Expert | null
  content_topics?: ContentTopic | null
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

export type ContentResource = {
  id: string
  title: string
  file_type: string | null
  file_url: string
  file_size_bytes: number | null
  description: string | null
  created_at: string
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
export async function getAnswers(): Promise<Answer[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('answers').select('*, experts(name), content_topics(name)').order('created_at', { ascending: false })
  return (data || []) as Answer[]
}

export async function getAnswerById(id: string): Promise<Answer | null> {
  if (!isSupabaseConfigured() || id === 'new') return null
  const supabase = await createContentClient()
  const { data } = await supabase.from('answers').select('*').eq('id', id).single()
  return data as Answer | null
}

export async function upsertAnswer(id: string, payload: Partial<Answer>) {
  if (!isSupabaseConfigured()) return { success: true, id: id === 'new' ? 'mock-id' : id }
  const supabase = await createContentClient()
  
  if (id === 'new') {
    const { data, error } = await supabase.from('answers').insert([payload]).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, id: data.id }
  } else {
    const { error } = await supabase.from('answers').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true, id }
  }
}

// ----------------------------------------------------
// Experts
// ----------------------------------------------------
export async function getExperts(): Promise<Expert[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('experts').select('*').order('name', { ascending: true })
  return (data || []) as Expert[]
}

// ----------------------------------------------------
// Topics, Partners, Resources
// ----------------------------------------------------
export async function getTopics(): Promise<ContentTopic[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('content_topics').select('*').order('name', { ascending: true })
  return (data || []) as ContentTopic[]
}

export async function createTopic(payload: { name: string, slug: string, description?: string }) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createContentClient()
  const { error } = await supabase.from('content_topics').insert([payload])
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('partners').select('*').order('name', { ascending: true })
  return (data || []) as Partner[]
}

export async function getResources(): Promise<ContentResource[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createContentClient()
  const { data } = await supabase.from('content_resources').select('*').order('created_at', { ascending: false })
  return (data || []) as ContentResource[]
}
