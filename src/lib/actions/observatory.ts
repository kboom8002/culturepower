"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type SystemAlert = {
  id: string
  severity: 'Critical' | 'Warning' | 'Info'
  module: string
  message: string
  error_code: string | null
  is_resolved: boolean
  resolved_by: string | null
  resolved_at: string | null
  created_at: string
  updated_at: string
}

export type JobRun = {
  id: string
  job_name: string
  status: 'Running' | 'Success' | 'Failed'
  duration_ms: number | null
  log_output: string | null
  created_at: string
  updated_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createObservatoryClient() {
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
// Alert Actions
// ----------------------------------------------------
export async function getSystemAlerts(includeResolved = false): Promise<SystemAlert[]> {
  if (!isSupabaseConfigured()) return [
     { id: 'ALT-1', severity: 'Critical', module: 'Database', message: 'Connection pool exhausted on replica-1', error_code: '53300', is_resolved: false, resolved_by: null, resolved_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
     { id: 'ALT-2', severity: 'Warning', module: 'API', message: 'High latency detected on GET /api/v1/stories', error_code: null, is_resolved: false, resolved_by: null, resolved_at: null, created_at: new Date(Date.now() - 3600000).toISOString(), updated_at: new Date(Date.now() - 3600000).toISOString() }
  ].filter(a => includeResolved || !a.is_resolved)

  const supabase = await createObservatoryClient()
  let query = supabase.from('system_alerts').select('*').order('created_at', { ascending: false })
  
  if (!includeResolved) {
     query = query.eq('is_resolved', false)
  }

  const { data } = await query
  return (data || []) as SystemAlert[]
}

export async function resolveAlert(id: string, adminId: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createObservatoryClient()
  const payload = {
     is_resolved: true,
     resolved_by: adminId,
     resolved_at: new Date().toISOString()
  }
  const { error } = await supabase.from('system_alerts').update(payload).eq('id', id)
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/fixit/alerts')
  return { success: true }
}

// ----------------------------------------------------
// Job Actions
// ----------------------------------------------------
export async function getJobRuns(): Promise<JobRun[]> {
  if (!isSupabaseConfigured()) return [
     { id: 'JOB-1', job_name: 'Daily Sitemap Generator', status: 'Success', duration_ms: 12500, log_output: 'Generated 4,321 URLs', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
     { id: 'JOB-2', job_name: 'RSS Feed Sync', status: 'Failed', duration_ms: 4500, log_output: 'Timeout error connecting to external proxy', created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date(Date.now() - 86400000).toISOString() }
  ]

  const supabase = await createObservatoryClient()
  const { data } = await supabase.from('job_runs').select('*').order('created_at', { ascending: false }).limit(50)
  return (data || []) as JobRun[]
}
