export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ambil kode adm4 dari query string
  const adm4 = req.query.adm4 || '35.07.33.2009';

  try {
    const bmkgUrl = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`;
    
    const response = await fetch(bmkgUrl, {
      headers: {
        'User-Agent': 'MaronPhos-AI/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `BMKG responded with ${response.status}`,
        fallback: true
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch from BMKG: ' + error.message,
      fallback: true
    });
  }
}
