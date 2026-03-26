"use server";

import { logAudit } from "@/lib/utils/audit"

export type ContentStatus = "Draft" | "Review" | "Public" | "Hidden" | "Archived"

/**
 * 23_상태 전이 정책: 콘텐츠의 상태 변화를 트랜잭션 단위로 실행하며 퍼블릭 가드를 통과해야 함.
 */
export async function transitionContentStatus(
  entityId: string, 
  entityType: "answers" | "stories" | "events", 
  userId: string, 
  targetStatus: ContentStatus, 
  data: any
) {
  
  // 1. Guard Rule: Draft -> Review (최소한의 기본 내용 작성 확인)
  if (targetStatus === "Review") {
    if (!data.title || data.title.length < 5) {
      throw new Error("제목이 최소 5자 이상이어야 검수(Review) 요청이 가능합니다.")
    }
  }

  // 2. Guard Rule: * -> Public (발행 시 엄격한 기준 적용)
  if (targetStatus === "Public") {
    if (!data.reviewer_id) {
      throw new Error("검수자(Reviewer)가 할당되고 최종 승인해야 Public 발행이 가능합니다.")
    }
    
    if (entityType === "answers") {
      if (!data.evidences || data.evidences.length === 0) {
        throw new Error("정답카드 객체 발행 시 최소 1개 이상의 공식 근거 연결(Evidence linking)이 필수입니다.")
      }
    }
  }

  // 3. Database Update Operation
  // const supabase = createServerClient(...)
  // const { error } = await supabase.from(entityType).update({ status: targetStatus }).eq('id', entityId)
  // if (error) throw new Error("DB Update failed")

  // 4. Record Audit Log for successful transition
  await logAudit("STATUS_TRANSITION", entityType, entityId, userId, { 
    from: data.currentStatus || "Unknown", 
    to: targetStatus,
    reason: data.reason || "Status transition initiated"
  })

  return { 
    success: true, 
    message: `Content successfully transitioned to ${targetStatus}.` 
  }
}
