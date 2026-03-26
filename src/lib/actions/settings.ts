"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type AdminUser = {
  id: string
  email: string
  name: string
  role: 'Super Admin' | 'Editor' | 'Reviewer' | 'View-Only'
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

export type Taxonomy = {
  id: string
  type: 'Category' | 'Tag' | 'Series'
  name: string
  slug: string
  description: string | null
  created_at: string
}

export type AuditLog = {
  id: string
  user_id: string | null
  action: string
  target_table: string | null
  target_id: string | null
  changes: any
  ip_address: string | null
  created_at: string
  admin_users?: { name: string, email: string } | null
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createSettingsClient() {
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
// Admin Users
// ----------------------------------------------------
export async function getAdminUsers(): Promise<AdminUser[]> {
  if (!isSupabaseConfigured()) return [
    { id: "USR-01", email: "admin@culture.net", name: "System Admin", role: "Super Admin", is_active: true, last_login_at: new Date().toISOString(), created_at: new Date().toISOString() },
    { id: "USR-02", email: "editor@culture.net", name: "Content Editor", role: "Editor", is_active: true, last_login_at: null, created_at: new Date().toISOString() }
  ]
  const supabase = await createSettingsClient()
  const { data } = await supabase.from('admin_users').select('*').order('created_at', { ascending: true })
  return (data || []) as AdminUser[]
}

export async function updateAdminRole(id: string, role: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createSettingsClient()
  const { error } = await supabase.from('admin_users').update({ role }).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/settings/users')
  return { success: true }
}

// ----------------------------------------------------
// Taxonomies
// ----------------------------------------------------
export async function getTaxonomies(typeFilter?: string): Promise<Taxonomy[]> {
  if (!isSupabaseConfigured()) return [
    { id: "TAX-1", type: "Category", name: "정책동향", slug: "policy", description: "문화 정책 관련 기사", created_at: new Date().toISOString() },
    { id: "TAX-2", type: "Tag", name: "AI혁신", slug: "ai-innovation", description: null, created_at: new Date().toISOString() }
  ]
  const supabase = await createSettingsClient()
  let query = supabase.from('taxonomies').select('*').order('type', { ascending: true }).order('name', { ascending: true })
  if (typeFilter) query = query.eq('type', typeFilter)
  const { data } = await query
  return (data || []) as Taxonomy[]
}

// ----------------------------------------------------
// Audit Logs
// ----------------------------------------------------
export async function getAuditLogs(): Promise<AuditLog[]> {
  if (!isSupabaseConfigured()) return [
    { id: "AUD-1", user_id: "USR-01", action: "LOGIN", target_table: null, target_id: null, changes: {}, ip_address: "192.168.1.1", created_at: new Date().toISOString(), admin_users: { name: "System Admin", email: "admin@culture.net" } },
    { id: "AUD-2", user_id: "USR-02", action: "UPDATE", target_table: "stories", target_id: "STY-123", changes: { status: "Review" }, ip_address: "10.0.0.5", created_at: new Date(Date.now() - 3600000).toISOString(), admin_users: { name: "Content Editor", email: "editor@culture.net" } }
  ]
  const supabase = await createSettingsClient()
  const { data } = await supabase.from('audit_logs').select('*, admin_users(name, email)').order('created_at', { ascending: false }).limit(100)
  return (data || []) as AuditLog[]
}
