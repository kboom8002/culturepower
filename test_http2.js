const https = require('https');

https.get('https://culturepower.vercel.app/webzine/stories/c8df81d6-19dc-4cfe-8b93-ec2556794a36', (res) => {
  console.log('HTTP Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response body prefix:', data.substring(0, 200)));
}).on('error', (e) => {
  console.error(e);
});
