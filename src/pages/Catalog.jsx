import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { getProductos } from "../services/supabaseService";

const Catalog = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const todosLosProductos = await getProductos();
            setProductos(todosLosProductos);
            setLoading(false);
        };
        
        loadProducts();
    }, []);

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
             {productos.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                    No se encontraron productos en esta categoría.
                    </p>
                </div>
            ) : (
                <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-4 g-4">
                    {productos.map((productos) => (
                        <ProductCard key={productos.codigo} producto={productos}/>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Catalog;