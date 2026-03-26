"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type MemberApplication = {
  id: string
  name: string
  email: string
  organization: string | null
  motivation: string | null
  status: 'Screening' | 'Approved' | 'Rejected' | 'Hold'
  source_channel: string | null
  created_at: string
  updated_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  name: string | null
  status: 'Active' | 'Unsubscribed' | 'Bounced'
  segment_id: string | null
  source_cta: string | null
  audience_segments?: { name: string } | null
  created_at: string
  updated_at: string
}

export type AudienceSegment = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export type EventRegistration = {
  id: string
  event_id: string
  name: string
  email: string
  organization: string | null
  status: 'Registered' | 'Confirmed' | 'Cancelled' | 'Waitlist'
  attendance_type: string | null
  is_attended: boolean
  source_page: string | null
  created_at: string
  updated_at: string
}

export type PartnershipInquiry = {
  id: string
  organization: string
  contact_name: string
  email: string
  phone: string | null
  inquiry_type: string | null
  message: string
  status: 'New' | 'In Progress' | 'Replied' | 'Qualified' | 'Closed'
  created_at: string
  updated_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createParticipationClient() {
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
// Member Applications
// ----------------------------------------------------
export async function getMemberApps(): Promise<MemberApplication[]> {
  if (!isSupabaseConfigured()) return [
    { id: "APP-001", name: "홍길동", email: "hong@example.com", organization: "문화예술단체", motivation: "네트워크 참여 희망", status: "Screening", source_channel: "Homepage", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]
  const supabase = await createParticipationClient()
  const { data } = await supabase.from('member_applications').select('*').order('created_at', { ascending: false })
  return (data || []) as MemberApplication[]
}

export async function getMemberAppById(id: string): Promise<MemberApplication | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createParticipationClient()
  const { data } = await supabase.from('member_applications').select('*').eq('id', id).single()
  return data as MemberApplication | null
}

export async function updateMemberAppStatus(id: string, status: MemberApplication['status']) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createParticipationClient()
  const { error } = await supabase.from('member_applications').update({ status }).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/participation/members')
  revalidatePath(`/admin/participation/members/${id}`)
  return { success: true }
}

// ----------------------------------------------------
// Event Registrations
// ----------------------------------------------------
export async function getEventRegistrations(eventId?: string): Promise<EventRegistration[]> {
  if (!isSupabaseConfigured()) return [
    { id: "REG-001", event_id: "EVT-001", name: "김참여", email: "kim@example.com", organization: null, status: "Registered", attendance_type: "Offline", is_attended: false, source_page: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]
  const supabase = await createParticipationClient()
  let query = supabase.from('event_registrations').select('*').order('created_at', { ascending: false })
  if (eventId) query = query.eq('event_id', eventId)
  const { data } = await query
  return (data || []) as EventRegistration[]
}

export async function updateRegistrationStatus(id: string, updates: Partial<EventRegistration>) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createParticipationClient()
  const { error } = await supabase.from('event_registrations').update(updates).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/participation/events')
  return { success: true }
}

// ----------------------------------------------------
// Newsletters & Segments
// ----------------------------------------------------
export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createParticipationClient()
  const { data } = await supabase.from('newsletter_subscribers').select('*, audience_segments(name)').order('created_at', { ascending: false })
  return (data || []) as NewsletterSubscriber[]
}

export async function getAudienceSegments(): Promise<AudienceSegment[]> {
  if (!isSupabaseConfigured()) return [{ id: "SEG-001", name: "일반 구독자", description: "Default segment", created_at: "" }]
  const supabase = await createParticipationClient()
  const { data } = await supabase.from('audience_segments').select('*')
  return (data || []) as AudienceSegment[]
}

// ----------------------------------------------------
// Partnership Inquiries
// ----------------------------------------------------
export async function getPartnershipInquiries(): Promise<PartnershipInquiry[]> {
  if (!isSupabaseConfigured()) return [
    { id: "REQ-001", organization: "ABC기관", contact_name: "이담당", email: "lee@abc.com", phone: "010-0000-0000", inquiry_type: "MOU", message: "연구 제휴 문의드립니다.", status: "New", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]
  const supabase = await createParticipationClient()
  const { data } = await supabase.from('partnership_inquiries').select('*').order('created_at', { ascending: false })
  return (data || []) as PartnershipInquiry[]
}

export async function updatePartnershipInquiry(id: string, updates: Partial<PartnershipInquiry>) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createParticipationClient()
  const { error } = await supabase.from('partnership_inquiries').update(updates).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/participation/partnerships')
  return { success: true }
}
