"use server"

import { createClient } from './story' // Reuse the configured client logic
import { revalidatePath } from 'next/cache'

export type Brief = {
  id: string
  title: string
  core_question: string | null
  one_line_answer: string | null
  top_points: string[] | null
  body: string
  status: string
  topic_id: string | null
  category_id: string | null
  pdf_asset_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

async function mapDbToBrief(supabase: any, row: any): Promise<Brief> {
  const { data } = await supabase.from('workflow_statuses').select('slug').eq('id', row.workflow_status_id).maybeSingle()
  return {
    id: row.id,
    title: row.title || '',
    core_question: row.core_question || '',
    one_line_answer: row.one_line_answer || '',
    top_points: row.top_points || [],
    body: row.body_text || '',
    status: (data?.slug || 'draft').toUpperCase(),
    topic_id: row.primary_topic_id || null,
    category_id: row.category_id || null,
    pdf_asset_id: row.pdf_asset_id || null,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

async function mapBriefToDb(supabase: any, data: Partial<Brief>) {
  const payload: any = {}
  if (data.title !== undefined) payload.title = data.title
  if (data.core_question !== undefined) payload.core_question = data.core_question
  if (data.one_line_answer !== undefined) payload.one_line_answer = data.one_line_answer
  if (data.top_points !== undefined) payload.top_points = data.top_points
  if (data.body !== undefined) payload.body_text = data.body
  if (data.topic_id !== undefined) payload.primary_topic_id = data.topic_id
  if (data.category_id !== undefined) payload.category_id = data.category_id
  if (data.pdf_asset_id !== undefined) payload.pdf_asset_id = data.pdf_asset_id
  
  if (data.status) {
    const slug = data.status.toLowerCase()
    const { data: st } = await supabase.from('workflow_statuses').select('id').eq('slug', slug).maybeSingle()
    if (st) payload.workflow_status_id = st.id
  }
  
  if (!payload.workflow_status_id && !data.id) {
    const { data: st } = await supabase.from('workflow_statuses').select('id').eq('slug', 'draft').maybeSingle()
    if (st) payload.workflow_status_id = st.id
  }
  
  if (!data.id && data.title) {
    payload.slug = `brief-${Date.now()}`
  }
  
  return payload
}

export async function getBriefs(): Promise<Brief[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('briefs').select('*').order('created_at', { ascending: false })
  if (error || !data) return []
  return Promise.all(data.map((d: any) => mapDbToBrief(supabase, d)))
}

export async function getBriefById(id: string): Promise<Brief | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('briefs').select('*').eq('id', id).single()
  if (error || !data) return null
  return mapDbToBrief(supabase, data)
}

export async function createBrief(data: Partial<Brief>) {
  const supabase = await createClient()
  const payload = await mapBriefToDb(supabase, data)
  const { data: res, error } = await supabase.from('briefs').insert([payload]).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/content/briefs')
  return { success: true, data: res }
}

export async function updateBrief(id: string, data: Partial<Brief>) {
  const supabase = await createClient()
  const payload = await mapBriefToDb(supabase, data)
  const { data: res, error } = await supabase.from('briefs').update(payload).eq('id', id).select().single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/content/briefs')
  revalidatePath(`/admin/content/briefs/${id}`)
  return { success: true, data: res }
}

export async function deleteBrief(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('briefs').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/content/briefs')
  return { success: true }
}
