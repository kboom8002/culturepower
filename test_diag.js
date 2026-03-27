const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const nowIso = new Date().toISOString();
  console.log("Testing getPublicStoryById...");
  // The UUID is taken from the user's previous screenshot
  const storyId = 'c8df81d6-19dc-4cfe-8b93-ec2556794a36';
  
  let storyRes = await supabase
    .from('stories')
    .select('*')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .eq('id', storyId)
    .single();
    
  console.log("Story Error:", storyRes.error);
  console.log("Story Data:", storyRes.data ? storyRes.data.title : "NULL");

  console.log("\nTesting getPublicAnswers...");
  let ansRes = await supabase
    .from('answers')
    .select('*, topics(name, slug, description)')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .order('published_at', { ascending: false });

  console.log("Answers Error:", ansRes.error);
  console.log("Answers Length:", ansRes.data ? ansRes.data.length : "NULL");
  if (ansRes.data && ansRes.data.length > 0) {
    console.log("First Answer:", ansRes.data[0].title);
  }
}
run();
