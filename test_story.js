const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data: featured } = await supabase.from('featured_contents').select('*').eq('slot_name', 'Home Hero');
  console.log("Featured Slots:", featured);
  
  if (featured && featured.length > 0) {
    const id = featured[0].content_id;
    console.log("Fetching story ID:", id);
    const nowIso = new Date().toISOString();
    let { data, error } = await supabase
      .from('stories')
      .select('*, experts(name, organization, role), admin_users(name)')
      .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
      .eq('id', id)
      .single();
      
    console.log("First Query Error:", error ? error.message : "Success");
    
    if (error && error.code === 'PGRST200') {
        console.log("PGRST200 caught! Falling back...");
        const fallback = await supabase
          .from('stories')
          .select('*')
          .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
          .eq('id', id)
          .single();
        data = fallback.data;
        error = fallback.error;
        console.log("Fallback Error:", error ? error.message : "Success");
    }

    console.log("Story Data Title:", data ? data.title : "NO DATA");
  } else {
    console.log("No featured item found in DB. The user hasn't added it yet?");
  }
}
run();
