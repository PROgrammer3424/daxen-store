import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/supabaseService';
import ProductCard from './ProductCard';

const ProductosDestacados = ({ limite = 4 }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestacados = async () => {
      setLoading(true);
      const todosLosProductos = await getProductos();
      const destacados = todosLosProductos
        .filter(p => p.destacado === true)
        .slice(0, limite); 
      
      setProductos(destacados);
      setLoading(false);
    };

    loadDestacados();
  }, [limite]);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando destacados...</span>
          </div>
        </div>
      </section>
    );
  }

  if (productos.length === 0) {
    return null; 
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Productos Destacados</h2>
        </div>

        <div className="row g-4">
          {productos.map((producto) => (
            <div key={producto.codigo} className="col-6 col-md-4 col-lg-3">
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
{/* 
        <div className="text-center mt-5">
          <Link to="/catalogo" className="btn btn-outline-secondary btn-lg rounded-pill px-5">
            Ver más
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default ProductosDestacados;