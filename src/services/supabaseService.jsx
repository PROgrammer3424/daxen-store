import { supabase, fetchWithProxy } from './supabaseClient'

const ordenTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const transformarProducto = (prod, variantes = []) => {
  const varsProd = variantes.filter(v => v.codigo === prod.codigo) || []
  
  const tallasMap = new Map()
  
  varsProd.forEach(v => {
    if (!tallasMap.has(v.size)) {
      tallasMap.set(v.size, { size: v.size, colors: [] })
    }
    tallasMap.get(v.size).colors.push({
      color: v.color,
      stock: v.stock
    })
  })

  const variantesOrdenadas = Array.from(tallasMap.values())
    .sort((a, b) => ordenTallas.indexOf(a.size) - ordenTallas.indexOf(b.size))

  const imagenes = [
    prod.imagen_url_1,
    prod.imagen_url_2,
    prod.imagen_url_3
  ].filter(url => url && url.trim() !== '')
  
  return {
    codigo: prod.codigo,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    precio_venta: prod.precio_venta,
    categoria: prod.categoria,
    tipo: prod.tipo,
    imagen_url: prod.imagen_url_1,
    imagenes: imagenes,
    disponibilidad: prod.disponibilidad,
    material: prod.material,
    industria: prod.industria,
    estado: prod.estado ? 'activo' : 'inactivo',
    destacado: prod.destacado,
    variantes: variantesOrdenadas  
  }
}

export const getProductos = async () => {
  try {
    // ✅ CORREGIDO: Usa la ruta correcta
    const productos = await fetchWithProxy('/productos')
    
    if (!productos || productos.length === 0) {
      return []
    }

    const variantes = await fetchWithProxy('/variantes') || []

    return productos.map(prod => transformarProducto(prod, variantes))
    
  } catch (error) {
    console.error('Error en getProductos:', error)
    return []
  }
}

export const getProductoById = async (codigo) => {
  try {
    const producto = await fetchWithProxy(`/producto/${codigo}`)
    
    if (!producto) return null

    const variantes = await fetchWithProxy(`/variantes?codigo=${codigo}`) || []

    return transformarProducto(producto, variantes)
    
  } catch (error) {
    return null
  }
}