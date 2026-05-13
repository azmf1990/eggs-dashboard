export default function handler(req, res) {
  const { endpoint } = req.query;
  const token = req.headers['x-foodics-token'];
  
  if (!token) return res.status(401).json({ error: 'No token' });
  
  const url = `https://api.foodics.com/v5/${endpoint}?${new URLSearchParams(req.query)}`;
  
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
  .then(r => r.json())
  .then(data => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  })
  .catch(e => res.status(500).json({ error: e.message }));
}
