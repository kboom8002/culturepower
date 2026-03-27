import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function testQuery() {
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .order('published_at', { ascending: false })

  if (error) {
    console.error("SUPABASE ERROR:", error)
  } else {
    console.log("SUCCESS. Data count:", data?.length)
    console.log("First item:", data?.[0])
  }
}

testQuery()
