import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductoById, getProductos } from '../services/supabaseService'; 
import ProductCard from '../components/ProductCard';
import ProductImages from '../components/ProductImages';
import { ShoppingCart } from 'lucide-react';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const ProductoDetail = ({ onAddToCart, cartItems, cartCount }) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [coloresDisponibles, setColoresDisponibles] = useState([]);
    const [selectedTalla, setSelectedTalla] = useState(''); 

    const [productosRelacionados, setProductosRelacionados] = useState([]); 

    const getCantidadEnCarrito = () => {
        if (!cartItems || !selectedTalla || !selectedColor) return 0;
        
        const itemEnCarrito = cartItems.find(
            item => item.id === producto?.codigo && 
                    item.size === selectedTalla && 
                    item.color === selectedColor
        );
        return itemEnCarrito?.quantity || 0;
    };

    const cantidadEnCarrito = getCantidadEnCarrito();
    

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const productoEncontrado = await getProductoById(id);
            setProducto(productoEncontrado);
            window.scrollTo(0, 0);
            if (productoEncontrado?.variantes?.length > 0) {
                const primeraTalla = productoEncontrado.variantes[0].size;
                setSelectedTalla(primeraTalla);
                const primeraVariante = productoEncontrado.variantes[0];
                const primerColorConStock = primeraVariante.colors?.find(c => c.stock > 0);
                
                if (primerColorConStock) {
                    setSelectedColor(primerColorConStock.color);
                } 
                setTimeout(() => {
                const seccionPedido = document.getElementById('seccion-pedido');
                if (seccionPedido) {
                    const headerHeight = 80;
                    const elementPosition = seccionPedido.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    }
                }, 900);
            }

            if (productoEncontrado) {
                const todosLosProductos = await getProductos();
                const relacionados = todosLosProductos
                    .filter(p => 
                        p.codigo !== productoEncontrado.codigo && 
                        p.tipo === productoEncontrado.tipo
                    )
                    .slice(0, 4);
                setProductosRelacionados(relacionados);
                }
            setLoading(false);
        };
        loadProduct();
    }, [id]);

    useEffect(() => {
        if (producto && selectedTalla) {
            const variante = producto.variantes?.find(v => v.size === selectedTalla);
            if (variante) {
                setColoresDisponibles(variante.colors);
                const hayColoresConStock = variante.colors?.some(c => c.stock > 0);
                
                if (!hayColoresConStock) {
                    setSelectedColor('');
                } else {
                    const colorSigueValido = variante.colors?.some(
                        c => c.color === selectedColor && c.stock > 0
                    );
                    
                    if (!colorSigueValido && selectedColor) {
                        const primerColorValido = variante.colors?.find(c => c.stock > 0);
                        if (primerColorValido) {
                            setSelectedColor(primerColorValido.color);
                        }
                    } else if (!selectedColor) {
                        const primerColorValido = variante.colors?.find(c => c.stock > 0);
                        if (primerColorValido) {
                            setSelectedColor(primerColorValido.color);
                        }
                    }
                }
            }
        }
    }, [selectedTalla, producto]);


    const getStockForCombination = () => {
        if (!producto || !selectedTalla || !selectedColor) return 0;    
        const variante = producto.variantes?.find(v => v.size === selectedTalla);
        const colorInfo = variante?.colors?.find(c => c.color === selectedColor);
        return colorInfo?.stock || 0;
    };

    const stockEspecifico = getStockForCombination();
    const stockRestante = stockEspecifico - cantidadEnCarrito;
    const noHayStockDisponible = stockRestante <= 0;

    const getColorHex = (colorName) => {
        const colores = {
            'Azul marino': '#242461',
            'Negro': '#000000',
            'Blanco': '#FFFFFF',
            'Beige': '#ececcc',
            'Gris': '#808080',
            'Rojo': '#FF0000',
            'Verde oscuro': '#0e500e',
            'Azul': '#3333c4',
            'Amarillo': '#FFFF00',
            'Marrón': '#8B4513',
        };
        return colores[colorName] || '#000000';
    };

    const handleAddToCart = () => {
        const variante = producto.variantes?.find(v => v.size === selectedTalla);
        const colorInfo = variante?.colors?.find(c => c.color === selectedColor);
        
        if (onAddToCart) { 
            onAddToCart({
                id: producto.codigo,
                name: producto.nombre,
                size: selectedTalla,
                color: selectedColor,
                price: producto.precio_venta,
                categoria: producto.categoria,
                tipo: producto.tipo,
                maxStock: colorInfo.stock,
                quantity: 1,
                imagen_url: producto.imagen_url
            });
        }
    };
    const handleWhatsAppIndividual = () => {
        const mensaje = encodeURIComponent(
            `¡Hola! Quiero este producto:\n\n` +
            `*Tipo:* ${producto.tipo}\n` +
            `*Nombre:* ${producto.nombre}\n` +
            `*Talla:* ${selectedTalla}\n` +
            `*Color:* ${selectedColor}\n` +
            `*Cantidad:* 1\n` +
            `*Precio:* Bs. ${producto.precio_venta}\n\n` +
            `¿Está disponible?`
        );
        
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border font-rose" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <h3>Producto no encontrado</h3>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-primary mt-3"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="" >
            <div className="container px-4 px-md-5 px-lg-6 py-4">
                <Link
                    to="/"
                    className="d-inline-flex align-items-center text-decoration-none mb-4"
                    style={{
                        color: '#888888',
                        transition: 'color 0.3s'
                    }}
                    data-testid="back-to-catalog-button">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al catálogo
                </Link>
                <div className="row g-5">
                    <div className="col-lg-6">
                        <ProductImages imagenes={producto.imagenes} />
                    </div>
                        <div className="col-lg-6">
                            <div>
                                <div className="mb-4" id='seccion-pedido'>
                                    <h1 className="display-4 fw-bold" 
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            color: 'var(--color-primary)'
                                        }}>
                                        {producto.nombre}
                                    </h1>
                                    
                                    <div className="d-flex align-items-center">
                                        <span className="fw-bold" 
                                                style={{
                                                    fontSize: '1.7rem',
                                                    fontFamily: "'Manrope', serif",
                                                    color: 'var(--color-primary)'
                                                }}
                                                data-testid="detail-precio">
                                            Bs. {producto.precio_venta.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div style={{borderColor: '#E2E2E2'}}>
                                    <h3 className="fw-bold small" 
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            color: 'var(--color-primary)',
                                            fontSize: '1rem'
                                        }}>
                                        Descripción
                                    </h3>
                                    <p className="small" style={{color: 'var(--color-secondary)'}}>
                                        {producto.descripcion}
                                    </p>
                                </div>

                            <div id="seleccion-tallas" className="mb-4" style={{borderColor: '#E2E2E2'}}>
                                <label className="fw-bold mb-3 d-block" 
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        color: 'var(--color-primary)',
                                        fontSize: '1rem'
                                    }}>
                                    Selecciona tu talla
                                </label>

                                <div className="d-flex gap-2 flex-wrap">
                                    {producto.variantes.map(({size}) => (
                                        <button
                                            key={`size-${size}`}
                                            onClick={() => setSelectedTalla(size)}   
                                            className="btn-size-custom"
                                            data-active={selectedTalla === size}
                                            data-testid={`size-option-${size}`}
                                            >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <label className="fw-bold mb-3 d-block" 
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                color: 'var(--color-primary)',
                                                fontSize: '1rem'
                                            }}>
                                            Selecciona el color
                                        </label>
                                    <div className="d-flex gap-2 flex-wrap">
                                        {coloresDisponibles.flat().map(({ color, stock }) => (
                                            <button
                                                key={`color-${color}`}
                                                onClick={() => setSelectedColor(color)}
                                                className="btn-size-custom d-flex align-items-center gap-2"
                                                data-active={selectedColor === color}
                                                disabled={stock === 0}
                                                style={{
                                                    opacity: stock === 0 ? 0.5 : 1,
                                                    cursor: stock === 0 ? 'not-allowed' : 'pointer',
                                                }}
                                                data-testid={`color-option-${color}`}
                                            >
                                                <span 
                                                    className="d-inline-block rounded-circle" 
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        backgroundColor: getColorHex(color),
                                                        border: '2px solid #ddd',
                                                        display: 'inline-block',
                                                        flexShrink: 0
                                                    }}
                                                />
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>      
                            <div className="mb-4">
                                <p className="text-muted small" style={{color: '#888888'}}>
                                    Stock disponible: 
                                    <span className="fw-bold ms-1" style={{color: '#4A4A4A'}}>
                                    {stockEspecifico === 1 ? '1 unidad' : 
                                    stockEspecifico === 0 ? 'Agotado' : 
                                    `${stockEspecifico} unidades`}
                                    </span>
                                </p>
                                </div>

                               <div className="d-flex flex-column gap-3 mb-4">
                                <button
                                    onClick={handleWhatsAppIndividual}
                                    className="btn w-100 py-3 fs-5 fw-medium border-0"
                                    style={{
                                    backgroundColor: (stockEspecifico === 0) 
                                        ? '#CCCCCC' 
                                        : '#25D366',
                                    color: '#FFFFFF',
                                    borderRadius: '50px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 25px rgba(37, 211, 102, 0.2)',
                                    cursor: (stockEspecifico === 0) 
                                        ? 'not-allowed' 
                                        : 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                    if (selectedTalla && selectedColor && stockEspecifico > 0 && !noHayStockDisponible) {
                                        e.target.style.transform = 'scale(1.02)';
                                        e.target.style.backgroundColor = '#128C7E';
                                    }
                                    }}
                                    onMouseLeave={(e) => {
                                    if (selectedTalla && selectedColor && stockEspecifico > 0) {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.backgroundColor = '#25D366';
                                    }
                                    }}
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    Pedir por WhatsApp
                                </button>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedTalla || !selectedColor || stockEspecifico === 0 || noHayStockDisponible}
                                    className="btn w-100 py-3 fs-5 fw-medium border-0 d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                    backgroundColor: (!selectedTalla || !selectedColor || stockEspecifico === 0 || noHayStockDisponible) 
                                        ? '#CCCCCC' 
                                        : 'var(--color-primary)',
                                    color: '#FFFFFF',
                                    borderRadius: '50px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 25px rgba(216, 161, 161, 0.2)',
                                    cursor: (!selectedTalla || !selectedColor || stockEspecifico === 0 || noHayStockDisponible) 
                                        ? 'not-allowed' 
                                        : 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                    if (selectedTalla && selectedColor && stockEspecifico > 0 && !noHayStockDisponible) {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.backgroundColor = 'var(--color-primary)';
                                    }
                                    }}
                                    onMouseLeave={(e) => {
                                    if (selectedTalla && selectedColor && stockEspecifico > 0) {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.backgroundColor = 'var(--color-primary)';
                                    }
                                    }}
                                >
                                    <ShoppingCart size={20} />
                                    Agregar al carrito
                                </button>

                                </div>
                        </div>
                        <div className="product-info-card p-4 rounded-3">
                            <h4 className="product-info-title fw-semibold mb-3">
                                Información del producto
                            </h4>
                            <p className="product-info-text d-flex align-items-center mb-0">
                                <i className="bi bi-tags me-3" style={{ color: 'rgb(var(--accent))' }}></i>
                                <span className="text-muted">
                                    {producto.tipo}
                                </span>
                            </p>
                            <p className="product-info-text d-flex align-items-center mb-0">
                                <i className="bi bi-camera me-3" style={{ color: 'rgb(var(--accent))' }}></i>
                                <span className="text-muted">
                                Las imágenes son referenciales
                                </span>
                            </p>
                            <p className="product-info-text d-flex align-items-center mb-0">
                                <i className="bi bi-truck me-3" style={{ color: 'rgb(var(--accent))' }}></i>
                                <span className="text-muted">
                                Se entrega a domicilio
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {productosRelacionados.length > 0 && (
                    <div className="mt-5 pt-5">
                        <h3 className="display-6 fw-bold mb-4" 
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: 'var(--color-primary)'
                            }}>
                            Productos similares
                        </h3>
                        
                        <div className="row g-4">
                            {productosRelacionados.map((productoRel) => (
                               <div 
                                    key={productoRel.codigo} 
                                    className="col-6 col-sm-6 col-md-4 col-lg-3"
                                >
                                    <ProductCard 
                                        producto={productoRel}
                                        onAddToCart={onAddToCart}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductoDetail;