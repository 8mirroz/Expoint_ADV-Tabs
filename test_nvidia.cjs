const https = require('https');

const options = {
  hostname: 'integrate.api.nvidia.com',
  path: '/v1/models',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.MENGRAM_API_KEY}`,
    'Accept': 'application/json'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      const models = JSON.parse(data).data;
      console.log(`Found ${models.length} models. First 5:`, models.slice(0, 5).map(m => m.id));
    } else {
      console.log(`Response: ${data}`);
    }
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
