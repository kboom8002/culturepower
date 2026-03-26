import { NextResponse } from "next/server"

// 14_외부 AI Search 연동(Feed API) 명세 반영
// Security Guard: status = 'Public', reviewer_id IS NOT NULL

export async function GET() {
  // Mocking the Supabase query which would normally be:
  // const supabase = createClient()
  // const { data } = await supabase.from('answers')
  //   .select('id, title, direct_answer, context, updated_at, slug')
  //   .eq('status', 'Public')
  //   .not('reviewer_id', 'is', null)

  const mockRows = [
    {
      id: "a3873bf1-mock-1",
      url: "https://culturepower.org/answers/k-civilization-origin",
      title: "K-문명이라는 개념은 언제 처음 공식화되었나요?",
      text: "K-문명은 단순한 한류의 유행을 넘어, 한국의 문화적 저력이 세계 보편의 대안적 가치 체계로 승화된 단계입니다.",
      updated_at: "2026-03-24T10:00:00Z"
    },
    {
      id: "a3873bf1-mock-2",
      url: "https://culturepower.org/answers/local-culture-budget",
      title: "지역소멸 위기 속에서 문화 예산은 어떻게 쓰여야 하는가",
      text: "소멸 지역에서 보여주기식 축제가 아닌 자생적 문화를 기르려면 장기 체류형 지원으로 패러다임이 전환되어야 합니다.",
      updated_at: "2026-03-25T14:30:00Z"
    }
  ]

  let ndjson = ""
  for (const row of mockRows) {
    ndjson += JSON.stringify(row) + "\n"
  }

  return new NextResponse(ndjson, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  })
}
