import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductosDestacados from "../components/ProductosDestacados";

const Hero = () => {
  return (
<section className="hero-section position-relative overflow-hidden vh-90" data-testid="hero-section">
  <img 
    src="https://iili.io/qFAWMQV.jpg"
    alt="Background"
    className="w-100 h-100 object-fit-cover"
  />
  
  <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
       style={{ 
         background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 100%)'
       }}>
    
    <div className="container px-4 px-md-5 px-lg-6 position-relative">
      <div className="d-lg-none position-absolute d-flex align-items-center justify-content-center hero-image-mobile"
           style={{
             top: '50%',
             left: '30%',
             transform: 'translateY(-50%)',
             width: '100%',
             height: '100%',
             animation: 'slideInFromRight 1s ease-out forwards'
           }}>
        <img 
          src="https://iili.io/qoyvBiQ.png" 
          alt="Remera destacada"
          className="img-fluid"
          style={{
            maxWidth: '120%', 
            maxHeight: '100vh',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 80px rgba(0,0,0,1))',
          }}
        />
      </div>

      <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
        <div className="col-lg-6">
          <h1 className="hero-title display-2 fw-bold text-white mb-4" 
              data-testid="hero-title">
            Remeras que definen tu estilo
          </h1>
          
          <p className="hero-subtitle fs-4 mb-3" 
             data-testid="hero-subtitle"
             style={{
               color: 'rgba(255,255,255,0.9)',
               backdropFilter: '2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)',
               fontWeight: 500
             }}>
            Descubre remeras de algodón A1, oversize y corte clásico.
          </p>
          
          <div className="d-flex flex-wrap gap-4 mb-5">
            <div className="d-flex align-items-center text-white"
                 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
              <i className="bi bi-truck fs-4 me-2"></i>
              <span>Envío a domicilio</span>
            </div>
            <div className="d-flex align-items-center text-white"
                 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
              <i className="bi bi-shield-check fs-4 me-2"></i>
              <span>Calidad garantizada</span>
            </div>
          </div>
          
          <Link 
            to="/catalogo"
            className="btn btn-hero btn-lg rounded-pill px-5 py-3 fw-medium"
            data-testid="hero-cta-button"
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            Ver catálogo
          </Link>
        </div>

        <div className="col-lg-6 d-none d-lg-block position-relative" 
             style={{ minHeight: '500px' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
               style={{ animation: 'slideInFromRight 1s ease-out forwards' }}>
            <img 
              src="https://iili.io/qoyvBiQ.png" 
              alt="Remera destacada"
              className="img-fluid"
              style={{
                maxWidth: '100%', 
                maxHeight: '75vh',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 80px rgba(0,0,0,1))',
                transform: 'scale(1.2)' 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

const CategoryCard = ({ title, description, imageUrl, category }) => {
  const navigate = useNavigate();
  
  return (
    <div 
    onClick={() => navigate(`/categoria/${category}`)}
    className="category-card position-relative overflow-hidden h-100 cursor-pointer"
    data-testid={`category-card-${category.toLowerCase()}`}
>
    <img 
        src={imageUrl}
        alt={title}
        className="w-100 h-100 object-fit-cover transition-transform duration-500"
    />
    <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4">
        <div className="text-white text-center">
            <h3 className="category-title mb-3" data-testid={`category-title-${category.toLowerCase()}`}>
                {title}
            </h3>
            <p className="category-description text-white-50 mb-0" data-testid={`category-desc-${category.toLowerCase()}`}>
                {description}
            </p>
        </div>
    </div>
</div>
  );
};

const CategoriesGrid = () => {
  const categories = [
    {
      title: "Novedades",
      description: "Los últimos diseños de la temporada",
      imageUrl: "https://iili.io/qHCbH3N.png",
      category: "novedades"
    },
    {
      title: "Corte Clásico",
      description: "Estilo cómodo para el día a día",
      imageUrl: "https://iili.io/qHCwi4p.png",
      category: "corte-clasico"
    },
    {
      title: "Oversize",
      description: "Remeras con estilo relajado y moderno",
      imageUrl: "https://iili.io/qHnjGnf.png",
      category: "oversize"
    },
    {
      title: "Boxy Fit",
      description: "Remeras con un corte moderno",
      imageUrl: "https://iili.io/qHCrwDN.png",
      category: "boxy-fit"
    }
  ];

  return (
    <section className="categories-section py-5 py-md-6" data-testid="categories-section">
      <div className="container px-4 px-md-5 px-lg-6">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3" data-testid="categories-title">
            Explora por Categoría
          </h2>
          <p className="fs-4 text-secondary" data-testid="categories-subtitle">
            Encuentra el estilo perfecto para ti
          </p>
        </div>
        
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.category} className="col-6 col-md-6 col-lg-3">
              <CategoryCard 
                title={cat.title}
                description={cat.description}
                imageUrl={cat.imageUrl}
                category={cat.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <div data-testid="home-page">
      <Hero />
      <ProductosDestacados />
      <CategoriesGrid />
    </div>
  );
};
export default HomePage;