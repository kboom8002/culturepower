"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type SiteMenu = {
  id: string
  parent_id: string | null
  label: string
  href: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type MainMenuWithItems = SiteMenu & {
  items: SiteMenu[]
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createNavigationClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll() {},
    },
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'force-cache', next: { tags: ['menus'] } })
    }
  })
}

// Fallback Mock Data matching the previous hardcoded GNB
const MOCK_GNB_DATA: MainMenuWithItems[] = [
  {
    id: "m1", parent_id: null, label: "문강 RIO", href: "/webzine/stories", display_order: 10, is_active: true, created_at: "", updated_at: "",
    items: [
      { id: "m1-1", parent_id: "m1", label: "문강 RIO 소개", href: "/webzine/about", display_order: 10, is_active: true, created_at: "", updated_at: "" },
      { id: "m1-2", parent_id: "m1", label: "창간사", href: "/webzine/stories?category=editorial", display_order: 20, is_active: true, created_at: "", updated_at: "" },
      { id: "m1-3", parent_id: "m1", label: "발간 목적", href: "/webzine/about#purpose", display_order: 30, is_active: true, created_at: "", updated_at: "" },
      { id: "m1-4", parent_id: "m1", label: "스페셜 인터뷰", href: "/webzine/stories?category=interview", display_order: 40, is_active: true, created_at: "", updated_at: "" },
      { id: "m1-5", parent_id: "m1", label: "Policy Insight", href: "/webzine/stories?category=insight", display_order: 50, is_active: true, created_at: "", updated_at: "" },
    ]
  },
  {
    id: "m2", parent_id: null, label: "정답카드", href: "/answers", display_order: 20, is_active: true, created_at: "", updated_at: "",
    items: [
      { id: "m2-1", parent_id: "m2", label: "전체 정답카드", href: "/answers", display_order: 10, is_active: true, created_at: "", updated_at: "" },
    ]
  }
]

export async function getSiteMenus(): Promise<MainMenuWithItems[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning mock menus.")
    return MOCK_GNB_DATA
  }

  const supabase = await createNavigationClient()
  const { data, error } = await supabase
    .from('site_menus')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error("Error fetching site_menus from DB:", error.message)
    // Fallback gently
    return MOCK_GNB_DATA
  }

  const allMenus = data as SiteMenu[]
  
  // Build hierarchy
  const roots = allMenus.filter(m => m.parent_id === null)
  const children = allMenus.filter(m => m.parent_id !== null)

  const tree: MainMenuWithItems[] = roots.map(root => ({
    ...root,
    items: children.filter(c => c.parent_id === root.id)
  }))

  return tree
}

// ----------------------------------------------------
// Admin Actions
// ----------------------------------------------------

// Admin client without force-cache for mutations
export async function createNavigationAdminClient() {
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

import { revalidatePath } from 'next/cache'

export async function createSiteMenu(data: { label: string; href: string; parent_id: string | null; is_active: boolean; display_order?: number }) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createNavigationAdminClient()
  
  // Auto-calculate display_order if not provided
  let order = data.display_order
  if (order === undefined) {
    const { data: maxObj } = await supabase.from('site_menus').select('display_order').eq(data.parent_id ? 'parent_id' : 'parent_id', data.parent_id || 'is.null').order('display_order', { ascending: false }).limit(1).single()
    order = maxObj ? (maxObj.display_order || 0) + 10 : 10
  }

  const { error } = await supabase.from('site_menus').insert([{ ...data, display_order: order }])
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateSiteMenu(id: string, data: Partial<SiteMenu>) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createNavigationAdminClient()
  
  const { error } = await supabase.from('site_menus').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteSiteMenu(id: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createNavigationAdminClient()
  
  const { error } = await supabase.from('site_menus').delete().eq('id', id)
  if (error) {
    // 23503 is foreign_key_violation (ON DELETE RESTRICT)
    if (error.code === '23503') {
      return { success: false, error: '하위 메뉴가 존재하여 삭제할 수 없거나 제한되었습니다. 하위 메뉴를 먼저 삭제해주세요.' }
    }
    return { success: false, error: error.message }
  }
  
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateMenuOrders(orders: { id: string, display_order: number }[]) {
  if (!isSupabaseConfigured() || orders.length === 0) return { success: true }
  const supabase = await createNavigationAdminClient()
  
  await Promise.all(orders.map(o => supabase.from('site_menus').update({ display_order: o.display_order }).eq('id', o.id)))
  
  revalidatePath('/', 'layout')
  return { success: true }
}
