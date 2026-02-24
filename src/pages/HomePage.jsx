import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section position-relative overflow-hidden" data-testid="hero-section">
      <img 
        src="https://iili.io/qFAWMQV.jpg"
        alt="Man in formal tennis wear"
        className="w-100 h-100 object-fit-cover"
      />
      <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
           style={{ 
             background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
           }}>
        <div className="container px-4 px-md-5 px-lg-6">
          <div className="row">
            <div className="col-lg-8 col-xl-6">
              <h1 className="hero-title display-2 fw-bold text-white mb-4" data-testid="hero-title">
                Eleva tu estilo urbano
              </h1>
              <p className="hero-subtitle fs-4 text-white-50 mb-5" data-testid="hero-subtitle">
                Descubre remeras de algodón A1, oversize y corte clásico para destacar todos los días.
              </p>
              <Link 
                to="/catalogo"
                className="btn btn-hero btn-lg rounded-pill px-5 py-3 fw-medium"
                data-testid="hero-cta-button"
              >
                Ver catálogo
              </Link>
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
      description: "Remeras técnicas para alto rendimiento",
      imageUrl: "https://iili.io/qHnjGnf.png",
      category: "oversize"
    },
    {
      title: "Boxy Fit",
      description: "Descuentos especiales",
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
      <CategoriesGrid />
    </div>
  );
};
export default HomePage;