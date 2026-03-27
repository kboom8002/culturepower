const https = require('https');

https.get('https://culturepower.vercel.app/webzine/stories/c8df81d6-19dc-4cfe-8b93-ec2556794a36', (res) => {
  console.log('HTTP Status Code:', res.statusCode);
}).on('error', (e) => {
  console.error(e);
});
