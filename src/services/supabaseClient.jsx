import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const fetchWithProxy = async (endpoint) => {
  try {
    let fullUrl;

    if (endpoint === '/productos') {
      fullUrl = `${supabaseUrl}/rest/v1/Productos?select=*`;
    }
    else if (endpoint === '/variantes') {
      fullUrl = `${supabaseUrl}/rest/v1/Variantes?select=*`;
    }
    else if (endpoint.startsWith('/variantes?codigo=')) {
      const codigo = endpoint.split('=')[1];
      fullUrl = `${supabaseUrl}/rest/v1/Variantes?select=*&codigo=eq.${codigo}`;
    }
    else if (endpoint.startsWith('/producto/')) {
      const codigo = endpoint.split('/').pop();
      fullUrl = `${supabaseUrl}/rest/v1/Productos?codigo=eq.${codigo}&select=*`;
    }
    else if (endpoint.startsWith('/productos/')) {
      const codigo = endpoint.split('/').pop();
      fullUrl = `${supabaseUrl}/rest/v1/Productos?codigo=eq.${codigo}&select=*`;
    }
    else {
      throw new Error(`Endpoint no reconocido: ${endpoint}`);
    }

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(fullUrl)}`;
    
    const response = await fetch(proxyUrl, {
      headers: { 'apikey': supabaseAnonKey }
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    
    const data = await response.json();
    
    if (endpoint.startsWith('/producto/') || endpoint.startsWith('/productos/')) {
      return data[0] || null;
    }
    
    return data;
    
  } catch (error) {
    console.error(`Error en fetchWithProxy (${endpoint}):`, error);
    throw error;
  }
};