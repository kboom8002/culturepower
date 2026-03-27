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
  const { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role)')
    .eq('status', 'Public')
    .order('published_at', { ascending: false })
  
  if (error || !data) return []
  return data as PublicStory[]
}

/**
 * Gets a single Public Story by ID or Slug
 */
export async function getPublicStoryById(id: string): Promise<PublicStory | null> {
  const supabase = await createPublicClient()
  const { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role), admin_users(name)')
    .eq('status', 'Public')
    .eq('id', id)
    .single()
  
  if (error || !data) return null
  return data as PublicStory
}

/**
 * Gets all Answers marked as 'Public'
 */
export async function getPublicAnswers(): Promise<PublicAnswer[]> {
  const supabase = await createPublicClient()
  const { data, error } = await supabase
    .from('answers')
    .select('*, topics(name, slug, description)')
    .eq('status', 'Public')
    .order('published_at', { ascending: false })
  
  if (error || !data) return []
  return data as PublicAnswer[]
}

/**
 * Gets a single Public Answer by ID
 */
export async function getPublicAnswerById(id: string): Promise<PublicAnswer | null> {
  const supabase = await createPublicClient()
  const { data, error } = await supabase
    .from('answers')
    .select('*, topics(name, slug, description), experts(name, organization, role, profile_image_url), admin_users(name)')
    .eq('status', 'Public')
    .eq('id', id)
    .single()
  
  if (error || !data) return null
  return data as PublicAnswer
}
