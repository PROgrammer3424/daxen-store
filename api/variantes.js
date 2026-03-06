// api/variantes.js
export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { codigo } = req.query;
  let apiUrl = `${supabaseUrl}/rest/v1/Variantes?select=*`;

  if (codigo) {
    apiUrl += `&codigo=eq.${codigo}`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: { 'apikey': supabaseKey }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error de Supabase' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Error en /api/variantes:', error);
    res.status(500).json({ error: 'Error al cargar variantes' });
  }
}