"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type FixitTicket = {
  id: string
  object_type: 'Story' | 'Answer' | 'Event'
  object_id: string
  priority: 'P0' | 'P1' | 'P2'
  issue_category: string
  description: string | null
  is_resolved: boolean
  resolved_by: string | null
  resolved_at: string | null
  created_at: string
  updated_at: string
  // Virtual
  object_title?: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createFixitClient() {
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
// Fix-It Actions
// ----------------------------------------------------
export async function getFixitTickets(priorityFilter?: 'P0' | 'P1' | 'P2', isResolved = false): Promise<FixitTicket[]> {
  if (!isSupabaseConfigured()) {
     const mocks: FixitTicket[] = [
        { id: 'FIX-1', object_type: 'Story', object_id: 'S-1', priority: 'P0', issue_category: 'No Related Answer', description: 'This Story has no SSoT connection', is_resolved: false, resolved_by: null, resolved_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), object_title: '문화정책 패러다임 전환' },
        { id: 'FIX-2', object_type: 'Answer', object_id: 'A-1', priority: 'P1', issue_category: 'Missing Evidence', description: 'Required evidence link is missing', is_resolved: false, resolved_by: null, resolved_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), object_title: '청년 문화예술 패스' },
        { id: 'FIX-3', object_type: 'Event', object_id: 'E-1', priority: 'P0', issue_category: 'Archive Missing', description: 'Closed event lacks document upload', is_resolved: true, resolved_by: 'USR-1', resolved_at: new Date().toISOString(), created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString(), object_title: '2026 문화포럼' }
     ]
     let filtered = mocks.filter(t => t.is_resolved === isResolved)
     if (priorityFilter) filtered = filtered.filter(t => t.priority === priorityFilter)
     return filtered
  }

  const supabase = await createFixitClient()
  let query = supabase.from('fixit_tickets').select('*').eq('is_resolved', isResolved).order('created_at', { ascending: false })
  
  if (priorityFilter) {
     query = query.eq('priority', priorityFilter)
  }

  const { data } = await query
  return (data || []) as FixitTicket[]
}

export async function resolveFixitTicket(id: string, adminId: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createFixitClient()
  const payload = {
     is_resolved: true,
     resolved_by: adminId,
     resolved_at: new Date().toISOString()
  }
  const { error } = await supabase.from('fixit_tickets').update(payload).eq('id', id)
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/fixit')
  revalidatePath('/admin/observatory')
  return { success: true }
}

// ----------------------------------------------------
// Observatory KPI Aggregations (Mocked for dashboard vibes)
// ----------------------------------------------------
export async function getObservatoryStats() {
   // In a real scenario, this would execute complex RPCs or aggregations on answers, stories, events.
   return {
      coverage: 82, // %
      ssotCitation: 65, // %
      claimCapture: 90, // %
      evidenceAlign: 78, // %
      contradiction: 2, // %
      tti: 4.5, // days (Time To Insight)
      orphanAnswers: 12,
      orphanEvents: 4,
      missingReviewers: 3,
      conversionRate: 4.2 // %
   }
}
