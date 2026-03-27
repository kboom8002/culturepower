// Testing with hint
fetch("https://qomudpikpmqzsfreynpc.supabase.co/rest/v1/stories?select=*,experts!stories_author_expert_id_fkey(name,organization,role)&limit=1", {
  headers: {
    apikey: "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o",
    "Authorization": "Bearer sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"
  }
}).then(r => r.json()).then(data => {
  console.log("With explicit Hint:", data);
});

fetch("https://qomudpikpmqzsfreynpc.supabase.co/rest/v1/stories?select=*,author_expert_id(*)&limit=1", {
  headers: {
    apikey: "sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o",
    "Authorization": "Bearer sb_publishable_DPi2pu4ClGi5VXmp6xwaPw_BpFL452o"
  }
}).then(r => r.json()).then(data => {
  console.log("With column Hint:", data);
});
