const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const id = 'c8df81d6-19dc-4cfe-8b93-ec2556794a36'; // The user's exact story ID from the screenshot
  const nowIso = new Date().toISOString();
  
  console.log("Fetching exact ID:", id);
  let { data, error } = await supabase
    .from('stories')
    .select('*, experts(name, organization, role)') // Exactly matching the new public.ts query
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .eq('id', id)
    .single();

  console.log("Error:", error);
  console.log("Data:", data ? "FOUND: " + data.title : "NULL");
}
run();
