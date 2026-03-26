"use server";

import { logAudit } from "@/lib/utils/audit"

export type FixItStatus = "Open" | "In_Progress" | "Resolved" | "Rejected"

export async function resolveFixItTicket(ticketId: string, resolutionNotes: string, userId: string) {
  if (!resolutionNotes || resolutionNotes.length < 10) {
    throw new Error("처리 내역(Resolution Notes)을 최소 10자 이상 작성해야 합니다.")
  }

  // Mock DB Update: await supabase.from('fixit_tickets').update({ status: 'Resolved', resolution_notes: resolutionNotes }).eq('id', ticketId)

  // Log Audit
  await logAudit("FIX_IT_RESOLVED", "fixit_tickets", ticketId, userId, { notes: resolutionNotes })

  return { success: true, message: "Ticket marked as Resolved." }
}
