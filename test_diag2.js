const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const nowIso = new Date().toISOString();
  console.log("\nTesting getPublicAnswers...");
  let ansRes = await supabase
    .from('answers')
    .select('*')
    .or(`status.eq.Public,and(status.eq.Scheduled,published_at.lte.${nowIso})`)
    .order('published_at', { ascending: false });

  console.log("Answers Error:", ansRes.error);
  console.log("Answers Length:", ansRes.data ? ansRes.data.length : "NULL");
  if (ansRes.data && ansRes.data.length > 0) {
    console.log("First Answer:", ansRes.data[0].title);
  }
}
run();
