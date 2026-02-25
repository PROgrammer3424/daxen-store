import { useState } from 'react';

const ProductImages = ({ imagenes }) => {
  const [imagenActual, setImagenActual] = useState(0);
  
  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="bg-light d-flex align-items-center justify-content-center rounded-4" 
           style={{ aspectRatio: '3/4' }}>
        <p className="text-muted">Sin imagen</p>
      </div>
    );
  }
  
  return (
<div className="position-relative rounded-4"
     style={{ 
       aspectRatio: '3/4',
       backgroundImage: `url(${imagenes[imagenActual]})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundColor: '#f8f9fa'
     }}>
  
  {/* Botones y dots sobre el div */}
  {imagenes.length > 1 && (
    <>
      <button className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle p-2"
              style={{ width: '40px', height: '40px', opacity: 0.8, zIndex: 10 }}
              onClick={() => setImagenActual(prev => prev === 0 ? imagenes.length - 1 : prev - 1)}>
        <i className="bi bi-chevron-left"></i>
      </button>
      
      <button className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle p-2"
              style={{ width: '40px', height: '40px', opacity: 0.8, zIndex: 10 }}
              onClick={() => setImagenActual(prev => prev === imagenes.length - 1 ? 0 : prev + 1)}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </>
  )}
  
  {imagenes.length > 1 && (
    <div className="position-absolute bottom-0 start-0 w-100 p-3 d-flex gap-2 justify-content-center">
      {imagenes.map((_, idx) => (
        <button key={idx}
                onClick={() => setImagenActual(idx)}
                className={`border-0 rounded-circle p-0 ${idx === imagenActual ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                style={{ width: '10px', height: '10px' }} />
      ))}
    </div>
  )}
</div>
  );
};

export default ProductImages;