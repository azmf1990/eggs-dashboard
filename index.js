export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const token = req.headers['x-foodics-token'];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  const { endpoint, ...params } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'No endpoint' });
  
  const qs = new URLSearchParams(params).toString();
  const url = `https://api.foodics.com/v5/${endpoint}${qs ? '?' + qs : ''}`;
  
  try {
    const r = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
