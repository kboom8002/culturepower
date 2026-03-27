"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type ReviewTask = {
  id: string
  content_type: 'Story' | 'Answer'
  content_id: string
  reviewer_id: string | null
  status: 'Pending' | 'In Review' | 'Returned' | 'Approved'
  comment: string | null
  created_at: string
  updated_at: string
  admin_users?: { name: string, email: string } | null
  // Augmented client-side fields:
  content_title?: string
  content_author?: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = () => SUPABASE_URL && SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 0

export async function createReviewClient() {
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

import { SupabaseClient } from '@supabase/supabase-js'

// Helper to pull generic titles from stories or answers
async function enrichReviewTasks(supabase: SupabaseClient, tasks: ReviewTask[]): Promise<ReviewTask[]> {
  if (tasks.length === 0) return []
  const enriched = [...tasks]
  
  const storyIds = enriched.filter(t => t.content_type === 'Story').map(t => t.content_id)
  const answerIds = enriched.filter(t => t.content_type === 'Answer').map(t => t.content_id)

  const [storiesRes, answersRes] = await Promise.all([
     storyIds.length > 0 ? supabase.from('stories').select('id, title').in('id', storyIds) : { data: [] },
     answerIds.length > 0 ? supabase.from('answers').select('id, title').in('id', answerIds) : { data: [] }
  ])

  const storyMap = new Map((storiesRes.data || []).map((s: { id: string, title: string }) => [s.id, s.title]))
  const answerMap = new Map((answersRes.data || []).map((a: { id: string, title: string }) => [a.id, a.title]))

  return enriched.map(t => ({
      ...t,
      content_title: t.content_type === 'Story' ? storyMap.get(t.content_id) || 'Unknown Story' : answerMap.get(t.content_id) || 'Unknown Answer'
  }))
}

// ----------------------------------------------------
// Review Actions
// ----------------------------------------------------
export async function getReviewTasks(filterStatus: string, reviewerId?: string): Promise<ReviewTask[]> {
  if (!isSupabaseConfigured()) {
     const mockTasks: ReviewTask[] = [
        { id: 'REV-1', content_type: 'Story', content_id: 'S-1', reviewer_id: null, status: 'Pending', comment: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), content_title: '[MOCK] 최신 문화 정책 요약' },
        { id: 'REV-2', content_type: 'Answer', content_id: 'A-1', reviewer_id: 'USR-01', status: 'In Review', comment: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), content_title: '[MOCK] 정답카드: 저작권법 개정 사항', admin_users: { name: 'System Admin', email: 'admin@culture.net' } }
     ]
     return mockTasks.filter(t => t.status === filterStatus)
  }

  const supabase = await createReviewClient()
  let query = supabase.from('review_tasks').select('*, admin_users(name, email)').eq('status', filterStatus).order('created_at', { ascending: false })
  
  if (reviewerId) {
     query = query.eq('reviewer_id', reviewerId)
  }

  const { data } = await query
  if (!data || data.length === 0) return []
  
  return enrichReviewTasks(supabase, data)
}

export async function assignReviewTask(taskId: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createReviewClient()
  
  const { data: { user }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !user) return { success: false, error: "Authentication required" }

  const { error } = await supabase.from('review_tasks')
    .update({ reviewer_id: user.id, status: 'In Review' })
    .eq('id', taskId)

  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/review/needs')
  revalidatePath('/admin/review/mine')
  return { success: true }
}

export async function submitToReview(contentType: 'Story' | 'Answer', contentId: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createReviewClient()

  // 중복 큐 등록 방지 (이미 Pending 이나 In Review 인 항목이 있는지 확인)
  const { data: existing } = await supabase
    .from('review_tasks')
    .select('id')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .in('status', ['Pending', 'In Review'])
    .maybeSingle()

  if (existing) return { success: true }

  const { error } = await supabase.from('review_tasks').insert([{
    content_type: contentType,
    content_id: contentId,
    status: 'Pending'
  }])

  if (error) return { success: false, error: error.message }
  
  revalidatePath('/admin/review/needs')
  return { success: true }
}

export async function processReviewTask(taskId: string, action: 'Approve' | 'Return', comment: string) {
  if (!isSupabaseConfigured()) return { success: true }
  const supabase = await createReviewClient()
  
  const { data: task, error: fetchErr } = await supabase.from('review_tasks').select('*').eq('id', taskId).single()
  if (fetchErr || !task) return { success: false, error: fetchErr?.message || 'Task not found' }

  const newStatus = action === 'Approve' ? 'Approved' : 'Returned'
  
  // Update the review task
  const { error: revErr } = await supabase.from('review_tasks').update({ status: newStatus, comment }).eq('id', taskId)
  if (revErr) return { success: false, error: revErr.message }

  // Sync with original content table
  const targetTable = task.content_type === 'Story' ? 'stories' : 'answers'
  const contentStatus = action === 'Approve' ? 'Scheduled' : 'Draft' // Return back to draft if rejected, or schedule it directly (which pushes to Publishing Queue)
  
  const { error: syncErr } = await supabase.from(targetTable).update({ status: contentStatus }).eq('id', task.content_id)
  
  revalidatePath('/admin/review/mine')
  revalidatePath('/admin/review/returned')
  revalidatePath('/admin/review/approved')
  return { success: !syncErr, error: syncErr?.message }
}
