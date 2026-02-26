import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { getProductos } from "../services/supabaseService";

const CategoryPage = () => {
    const {category} = useParams();
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categoriaTitulo, setCategoriaTitulo] = useState("");
    const [loading, setLoading] = useState(true);

    const categoryTitles = {
        'corte-clasico': 'Corte Clásico',
        'novedades': 'Novedades',
        'ofertas': 'Ofertas',
        'oversize': 'Oversize',
        'boxy-fit': 'Boxy Fit'
    };

    useEffect(() => {
        const loadProducts = async () => {
        setLoading(true);
        const todosLosProductos = await getProductos();
        let filtrados = [];
        const categoriaMap = {
            'corte-clasico': 'Corte Clásico',
            'novedades': 'novedad',
            'ofertas': 'oferta',
            'oversize': 'Oversize',
            'boxy-fit': 'Boxy Fit',
            'destacados' : 'destacados'
        };
        setCategoriaTitulo(categoryTitles[category] || "Categoría");
        setLoading(false);

        if (category === 'novedades') {
            filtrados = todosLosProductos.filter(p => p.disponibilidad === 'nuevo');
        } else if (category === 'ofertas') {
            filtrados = todosLosProductos.filter(p => p.estado === 'oferta');
        } else {
            const categoriaMap = {
            'corte-clasico': 'Corte Clásico',
            'oversize': 'Oversize',
            'boxy-fit': 'Boxy Fit'
            };
            filtrados = todosLosProductos.filter(p => p.tipo === categoriaMap[category]);
        }

        setProductosFiltrados(filtrados);
        }
        loadProducts();
        window.scrollTo(0, 0);
    }, [category]);

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

    return (
        <div className="container py-4">
            <div className="mb-12 pb-4">
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
                <h1 className="display-5 fw-bold mb-4" 
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: 'rgb(15, 15, 15)'
                    }}>
                    {categoryTitles[category]}
                </h1>
                
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
                    <p className="text-muted mb-0" style={{color: '#888888'}}>
                        {productosFiltrados.length} productos 
                    </p>
                </div>
            </div> 
            {productosFiltrados.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                    No se encontraron productos en esta categoría.
                    </p>
                </div>
            ) : (
                <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-4 g-4">
                    {productosFiltrados.map((productos) => (
                        <ProductCard key={productos.codigo} producto={productos}/>
                    ))}
                </div>
            )}
        </div>
    )
}
export default CategoryPage;