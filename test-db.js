require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function run() {
  const { data: revData } = await supabase.from('review_tasks').select('*').eq('content_type', 'Story').limit(5)
  console.log('Review Tasks:', revData)

  if (revData && revData.length > 0) {
     const { data: stData } = await supabase.from('stories').select('id, title, status').eq('id', revData[0].content_id)
     console.log('Story mapped to task[0]:', stData)
  }
}

run()
