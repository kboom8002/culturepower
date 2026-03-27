import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qomudpikpmqzsfreynpc.supabase.co"
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const experts = Array.from({ length: 20 }).map((_, i) => ({
  name: `김전문${i+1}`,
  organization: i % 2 === 0 ? `문화체육관광부 제${(i % 3) + 1}차관실` : `한국문화예술위원회 분과${i}`,
  role: i % 3 === 0 ? "연구원" : i % 2 === 0 ? "교수" : "전문위원",
  bio: `이 분야에서 10년 이상 활동해온 김전문${i+1}입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.`,
  profile_image_url: `https://api.dicebear.com/7.x/notionists/svg?seed=expert${i}`
}))

const inboxItems = Array.from({ length: 20 }).map((_, i) => {
  const types = ['Question', 'Suggestion', 'Correction', 'Membership', 'Event', 'Partnership', 'General']
  const statuses = ['New', 'Triaged', 'Mapped', 'In Progress', 'Closed']
  const prios = ['P0', 'P1', 'P2']
  return {
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    priority: prios[i % prios.length],
    subject: i % 5 === 0 
      ? `[오탈자] 어제 올라온 문화정책 ${i}번 글 오타가 있습니다` 
      : i % 3 === 0 ? `지역 소멸 대책 ${i}번에 대해 질문있습니다` 
      : `행사 참석 문의 건 ${i}`,
    content: `안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: ${i})`,
    reporter_name: `사용자${i}`,
    reporter_email: `user${i}@example.com`,
    reporter_phone: `010-1234-${i.toString().padStart(4, '0')}`
  }
})

async function seed() {
  console.log("Seeding Experts...")
  const { error: e1 } = await supabase.from('experts').insert(experts)
  if (e1) console.error("Experts Seed Error:", e1)
  else console.log("Experts Seeded Successfully!")

  console.log("Seeding Inbox Items...")
  const { error: e2 } = await supabase.from('inbox_items').insert(inboxItems)
  if (e2) console.error("Inbox Seed Error:", e2)
  else console.log("Inbox Seeded Successfully!")
}

seed().catch(console.error)
