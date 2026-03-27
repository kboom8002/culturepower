fetch("https://qomudpikpmqzsfreynpc.supabase.co/rest/v1/review_tasks?select=id,content_id,content_type,status&status=eq.Approved&limit=5", {
  headers: {
    apikey: "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o",
    "Authorization": "Bearer sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"
  }
}).then(r => r.json()).then(async data => {
  console.dir(data, { depth: null });
  
  if (data.length > 0) {
    const storyId = data[0].content_id;
    console.log("Checking story with ID:", storyId);
    
    // We will attempt to fetch WITHOUT RLS policy by using the API key? No, API key enforces RLS.
    // Let's just fetch it anyway. If it's missing, it's because either RLS blocks 'Review' status for Anon, or it doesn't exist.
    const stRes = await fetch("https://qomudpikpmqzsfreynpc.supabase.co/rest/v1/stories?id=eq." + storyId, {
      headers: {
        apikey: "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"
      }
    });
    const stData = await stRes.json();
    console.log("Story Fetch Result (Anon):", stData);
  }
});
