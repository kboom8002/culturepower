const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n');
let url, key;
env.forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].replace(/"/g, '').trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].replace(/"/g, '').trim();
});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(url, key);

async function run() {
  console.log("Starting cleanup of legacy disconnected content...");
  
  const results = await Promise.all([
    supabase.from('stories').delete().is('workflow_status_id', null),
    supabase.from('answers').delete().is('workflow_status_id', null),
    supabase.from('events').delete().is('workflow_status_id', null),
    supabase.from('briefs').delete().is('workflow_status_id', null),
    supabase.from('pages').delete().is('workflow_status_id', null)
  ]);
  
  results.forEach((res, i) => {
      if(res.error) console.error(`Error at index ${i}:`, res.error);
  });
  
  // Also clear legacy content_topics table as public.topics is the new canonical taxonomy
  await supabase.from('content_topics').delete().neq('id', 'dummy'); 
  
  console.log('Cleanup complete.');
}
run();
