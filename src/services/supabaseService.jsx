import { supabase } from './supabaseClient'

export const getProductos = async () => {
  try {
    const { data: productos, error } = await supabase
      .from('Productos')
      .select('*')
    
    if (error) {
      console.error('Error al obtener productos:', error)
      return []
    }
    
    if (!productos || productos.length === 0) {
      return []
    }

    const { data: variantes, error: varError } = await supabase
      .from('Variantes')
      .select('*')
    
    if (varError) {
      console.error('Error al obtener variantes:', varError)
    }

    const ordenTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

    return productos.map(prod => {
      const varsProd = variantes?.filter(v => v.codigo === prod.codigo) || []
      
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
        .sort((a, b) => {
          return ordenTallas.indexOf(a.size) - ordenTallas.indexOf(b.size)
        })

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
        variantes: variantesOrdenadas  
      }
    })
    
  } catch (error) {
    console.error('Error en getProductos:', error)
    return []
  }
}

export const getProductoById = async (codigo) => {
  try {
    const { data: producto, error: prodError } = await supabase
      .from('Productos')
      .select('*')
      .eq('codigo', codigo)
      .single()
    
    if (prodError) {
      console.error('Error al obtener producto:', prodError)
      return null
    }
    
    if (!producto) return null

    const { data: variantes, error: varError } = await supabase
      .from('Variantes')
      .select('*')
      .eq('codigo', codigo)
    
    if (varError) {
      console.error('Error al obtener variantes:', varError)
    }

    const ordenTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    const tallasMap = new Map()

    variantes?.forEach(v => {
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
      producto.imagen_url_1,
      producto.imagen_url_2,
      producto.imagen_url_3
    ].filter(url => url && url.trim() !== '')

    return {
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio_venta: producto.precio_venta,
      categoria: producto.categoria,
      tipo: producto.tipo,
      imagen_url: producto.imagen_url_1,
      imagenes: imagenes,
      disponibilidad: producto.disponibilidad,
      material: producto.material,
      industria: producto.industria,
      estado: producto.estado ? 'activo' : 'inactivo',
      variantes: variantesOrdenadas  
    }
  } catch (error) {
    console.error('Error en getProductoById:', error)
    return null
  }
}