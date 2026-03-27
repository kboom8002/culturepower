export const ADMIN_ROLES = [
  'Super Admin',
  '운영 총괄',
  '콘텐츠 기획·편집 담당',
  '근거·리서치 담당',
  '검수자',
  '아카이브·이벤트 운영 담당',
  '회원·참여 운영 담당',
  '기술 운영 담당'
] as const

export type AdminRole = typeof ADMIN_ROLES[number]
