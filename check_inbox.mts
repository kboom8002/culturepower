import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qomudpikpmqzsfreynpc.supabase.co"
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function check() {
  console.log("Fetching inbox_items...")
  const { data, error } = await supabase.from('inbox_items').select('*')
  if (error) {
    console.error("DB Error:", error)
  } else {
    console.log(`Success! Found ${data?.length} rows.`)
  }
}

check().catch(console.error)
