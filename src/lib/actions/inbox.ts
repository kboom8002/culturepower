"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type InboxItem = {
  id: string
  type: 'Question' | 'Suggestion' | 'Correction' | 'Membership' | 'Event' | 'Partnership' | 'General'
  status: 'New' | 'Triaged' | 'Mapped' | 'In Progress' | 'Closed'
  priority: 'P0' | 'P1' | 'P2'
  subject: string
  content: string
  reporter_email: string | null
  reporter_name: string | null
  reporter_phone: string | null
  mapped_object_type: 'Answer' | 'Story' | 'FixIt' | null
  mapped_object_id: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

// Mock Data
const MOCK_INBOX_ITEMS: InboxItem[] = [
  {
    id: "INB-101",
    type: "Question",
    status: "New",
    priority: "P1",
    subject: "지역 소멸 정책에 대한 구체적인 정답카드가 필요합니다",
    content: "최근 기사들을 읽었는데, 지역 소멸에 대한 문체부의 공식 대응 기조가 명확하지 않은 것 같습니다. 관련된 정책 지식 카드를 찾을 수가 없는데, 추가해주실 수 있나요?",
    reporter_name: "이준민",
    reporter_email: "lee.jm@example.com",
    reporter_phone: null,
    mapped_object_type: null,
    mapped_object_id: null,
    admin_notes: null,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "INB-102",
    type: "Correction",
    status: "Triaged",
    priority: "P0",
    subject: "[오탈자] 스페셜 인터뷰 기사 내 오타 정정 요청",
    content: "어제 올라온 스페셜 인터뷰 기사 3번째 문단에서 '예술의 전당'이 아니라 '국립극장' 내용인데 오타가 난 것 같습니다.",
    reporter_name: "박시민",
    reporter_email: "park@citizen.com",
    reporter_phone: "010-1234-5678",
    mapped_object_type: null,
    mapped_object_id: null,
    admin_notes: "오타 확인됨. Fix-It 으로 넘길 예정",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "INB-103",
    type: "Suggestion",
    status: "Mapped",
    priority: "P2",
    subject: "웹진 UI 글씨 크기 개선 제안",
    content: "모바일에서 볼 때 글씨가 너무 작습니다. 키워주세요.",
    reporter_name: "김독자",
    reporter_email: "reader1@mail.com",
    reporter_phone: null,
    mapped_object_type: "FixIt",
    mapped_object_id: "FIX-999",
    admin_notes: "UI 개선 태스크로 Fix-It 이관 완료",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
]

export async function createInboxClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
      },
    },
  })
}

export async function getInboxItems(statusFilter?: string): Promise<InboxItem[]> {
  if (!isSupabaseConfigured()) {
    if (statusFilter === 'Closed') return MOCK_INBOX_ITEMS.filter(i => i.status === 'Closed')
    if (statusFilter === 'Processed') return MOCK_INBOX_ITEMS.filter(i => i.status === 'Mapped' || i.status === 'In Progress')
    if (statusFilter === 'Active') return MOCK_INBOX_ITEMS.filter(i => i.status === 'New' || i.status === 'Triaged')
    return MOCK_INBOX_ITEMS
  }

  const supabase = await createInboxClient()
  let query = supabase.from('inbox_items').select('*').order('created_at', { ascending: false })
  
  if (statusFilter === 'Closed') query = query.eq('status', 'Closed')
  else if (statusFilter === 'Processed') query = query.in('status', ['Mapped', 'In Progress'])
  else if (statusFilter === 'Active') query = query.in('status', ['New', 'Triaged'])

  const { data } = await query
  return (data || []) as InboxItem[]
}

export async function getInboxItemById(id: string): Promise<InboxItem | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_INBOX_ITEMS.find(i => i.id === id) || null
  }
  const supabase = await createInboxClient()
  const { data } = await supabase.from('inbox_items').select('*').eq('id', id).single()
  return data as InboxItem | null
}

export async function updateInboxItemStatus(id: string, updates: Partial<InboxItem>) {
  if (!isSupabaseConfigured()) return { success: true }
  
  const supabase = await createInboxClient()
  const { error } = await supabase.from('inbox_items').update(updates).eq('id', id)
  
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/inbox')
  revalidatePath(`/admin/inbox/${id}`)
  return { success: true }
}

export async function submitInboxItem(formData: FormData) {
  const type = formData.get('type') as InboxItem['type'] || 'Question'
  const email = formData.get('email') as string || null
  const content = formData.get('content') as string
  const subject = formData.get('subject') as string

  if (!content) return { error: "내용을 입력해주세요." }

  if (!isSupabaseConfigured()) {
    return { success: true }
  }

  const supabase = await createInboxClient()
  const payload = {
    type,
    status: 'New',
    priority: type === 'Correction' ? 'P0' : 'P2',
    subject,
    content,
    reporter_email: email,
    source_channel: 'Global Floating Form'
  }

  const { error } = await supabase.from('inbox_items').insert([payload])
  
  if (error) return { error: error.message }

  revalidatePath('/admin/inbox')
  return { success: true }
}

export async function convertInboxToAnswer(id: string, inboxBody: string, inboxSubject: string) {
  // Inbox 내용을 기반으로 새 Answer를 생성하고 Mapped 상태로 전이
  if (!isSupabaseConfigured()) {
    revalidatePath('/admin/inbox')
    return { success: true, newId: 'new' }
  }

  const supabase = await createInboxClient()
  // 1. Create Answer
  const payload = {
    title: inboxSubject,
    content_body: `<p><em>Q: ${inboxBody}</em></p><p>---</p><p>A: 답변을 수정해주세요.</p>`,
    status: 'Draft' 
  }
  const { data: newAns, error: ansError } = await supabase.from('answers').insert([payload]).select().single()
  if (ansError) return { success: false, error: ansError.message }

  // 2. Update Inbox Item
  const { error: updateError } = await supabase.from('inbox_items').update({
    status: 'Mapped',
    mapped_object_type: 'Answer',
    mapped_object_id: newAns.id,
    admin_notes: '지식 정답 카드로 자산화됨'
  }).eq('id', id)

  if (updateError) return { success: false, error: updateError.message }

  revalidatePath('/admin/inbox')
  revalidatePath(`/admin/inbox/${id}`)
  return { success: true, newId: newAns.id }
}

export async function convertInboxToFixIt(id: string, inboxBody: string) {
  if (!isSupabaseConfigured()) {
    revalidatePath('/admin/inbox')
    return { success: true }
  }

  const supabase = await createInboxClient()
  const payload = {
    object_type: 'Other', // General fixit type
    priority: 'P0', 
    issue_category: 'Other',
    description: `[Inbox 고객 제보 기반 결함]\n\n${inboxBody}`,
    is_resolved: false
  }
  const { data: newFix, error: fixError } = await supabase.from('fixit_tickets').insert([payload]).select().single()
  if (fixError) return { success: false, error: fixError.message }

  const { error: updateError } = await supabase.from('inbox_items').update({
    status: 'Mapped',
    mapped_object_type: 'FixIt',
    mapped_object_id: newFix.id,
    admin_notes: '결함 조치(Fix-It) 큐로 이관됨'
  }).eq('id', id)

  if (updateError) return { success: false, error: updateError.message }

  revalidatePath('/admin/inbox')
  revalidatePath(`/admin/inbox/${id}`)
  return { success: true }
}
