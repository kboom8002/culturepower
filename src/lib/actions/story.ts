"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Define the Story type based on our schema
export type Story = {
  id: string
  title: string
  deck: string | null
  body: string
  why_this_matters: string | null
  status: 'Draft' | 'Review' | 'Public' | 'Hidden' | 'Archived'
  creator_id: string | null
  slug: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  section: string | null
  story_type: string | null
  author_expert_id: string | null
  reviewer_id: string | null
  featured_flag: boolean
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  canonical_slug: string | null
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0
}

// Fallback Mock Data for when DB is not connected yet
const FALLBACK_MOCK_STORIES: Story[] = [
  { 
    id: "S-109", 
    title: "[Mock] 지역 소멸을 박물관 미술관으로 막을 수 있을까",
    deck: null, body: "...", why_this_matters: null,
    section: "Policy Insight", 
    story_type: null, author_expert_id: null, reviewer_id: null, featured_flag: false,
    meta_title: null, meta_description: null, og_image_url: null, canonical_slug: null,
    status: "Public", 
    created_at: "2026-03-20T00:00:00Z", updated_at: "2026-03-20T00:00:00Z",
    creator_id: null, slug: "local-extinction", published_at: "2026-03-20T00:00:00Z"
  },
]

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )
}

export async function getStories(): Promise<Story[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Returning mock stories.")
    return FALLBACK_MOCK_STORIES
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching stories:", error)
    return []
  }

  return data as Story[]
}

export async function getStoryById(id: string): Promise<Story | null> {
  if (!isSupabaseConfigured() && id.startsWith("S-")) {
    return FALLBACK_MOCK_STORIES[0] || null
  }
  
  if (!isSupabaseConfigured()) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching story ${id}:`, error)
    return null
  }

  return data as Story
}

export async function createStory(storyData: Partial<Story>) {
  if (!isSupabaseConfigured()) {
    console.log("Mock Create Story:", storyData)
    return { success: true, data: { id: "mock-new-id", ...storyData } }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .insert([storyData])
    .select()
    .single()

  if (error) {
    console.error("Error creating story:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content/stories')
  return { success: true, data }
}

export async function updateStory(id: string, storyData: Partial<Story>) {
  if (!isSupabaseConfigured()) {
    console.log(`Mock Update Story ${id}:`, storyData)
    return { success: true, data: { id, ...storyData } }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stories')
    .update(storyData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating story ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content/stories')
  revalidatePath(`/admin/content/stories/${id}`)
  return { success: true, data }
}

export async function deleteStory(id: string) {
  if (!isSupabaseConfigured()) {
    console.log(`Mock Delete Story ${id}`)
    return { success: true }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting story ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/content/stories')
  return { success: true }
}
