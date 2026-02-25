import { Link } from "react-router-dom";

const ProductCard = ({ producto }) => {
    return (
        <div className="col">
            <Link className="card product-card-hover h-100 text-decoration-none text-dark border-0 overflow-hidden  transition-all duration-300 rounded-0" 
            to={`/producto/${producto.codigo}`} 
            data-testid="product-card-vestido-1" 
            data-discover="true">
            <div className="position-relative overflow-hidden ratio" style={{paddingTop: '133.33%'}}>
                <img alt = {producto.nombre}
                    className="position-absolute top-0 start-0 w-100 h-100 object-cover transition-transform duration-500 product-img" 
                    src={producto.imagen_url}/>
                    <div className="px-2 py-2">
                        {producto.disponibilidad === "oferta" && ( 
                                <span className="absolute top-4 left-4 bg-oferta text-white text-xs uppercase tracking-widest px-2 py-1" data-testid="badge-new">
                                OFERTA
                            </span>
                        )}
                        {producto.disponibilidad === "nuevo" && (
                            
                                <span className="absolute top-4 left-4 bg-nuevo text-white text-xs uppercase tracking-widest px-2 py-1" data-testid="badge-new">
                                NUEVO
                            </span>
                            
                        )}
                    </div>
            </div>
            <div className="card-body">
                <h3 className="subtitulo">{producto.nombre}</h3>
                <p className="card-text text-muted small mb-3" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                {producto.descripcion}
                </p>
                <div className="d-flex align-items-center gap-2">
                <span className="text-price" data-testid="precio">Bs. {producto.precio_venta}</span>
                </div>
            </div>
            </Link>
        </div>
    );
};
export default ProductCard;