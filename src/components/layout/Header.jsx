import { ShoppingCart } from 'lucide-react';
const Header = ({cartCount, onCartClick}) => {
  return (
    <div className="sticky-top py-3 navbar-blur">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <div 
          style={{ 
            width: '40px',
            height: '40px',
          }}
        >
          <img 
            src="/images/preview.png" 
            alt="Daxen Store Logo" 
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <h1 className="titulo mb-0">
          Daxen Store
        </h1>
      </div>

      <button 
        onClick={onCartClick}
        className="cart-btn"
        data-testid="cart-button"
      >
        <ShoppingCart className="cart-icon" />
        {cartCount > 0 && (
          <span className="cart-count" data-testid="cart-count">
            {cartCount}
          </span>
        )}
      </button>
    </div>
      </div>
    </div>
  )
}   
export default Header;