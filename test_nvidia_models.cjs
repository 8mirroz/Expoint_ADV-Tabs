const https = require('https');
const options = { hostname: 'integrate.api.nvidia.com', path: '/v1/models', method: 'GET', headers: { 'Authorization': `Bearer ${process.env.MENGRAM_API_KEY}`, 'Accept': 'application/json' } };
const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const models = JSON.parse(data).data;
    const nvidiaModels = models.filter(m => m.id.includes('llama') || m.id.includes('nemotron') || m.id.includes('mistral') || m.id.includes('deepseek')).map(m => m.id);
    console.log(nvidiaModels.join('\n'));
  });
});
req.end();
