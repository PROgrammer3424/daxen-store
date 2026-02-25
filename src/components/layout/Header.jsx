import { Link, ShoppingBag } from 'lucide-react';
const Header = ({cartCount, onCartClick}) => {
  return (
    <div className="sticky-top py-3 navbar-blur">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
            <h1 className="titulo">
              Daxen Store
            </h1>
          <button 
            onClick={onCartClick}
            className="cart-btn"
            data-testid="cart-button"
            >
            <ShoppingBag className="cart-icon" />
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