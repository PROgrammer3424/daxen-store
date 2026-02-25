import { X, Plus, Minus, Trash2 } from "lucide-react";

export const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="cart-overlay" data-testid="cart-modal">
      <div className="cart-backdrop" onClick={onClose}></div>
      <div className="cart-container">

        <div className="cart-header">
          <div>
            <h2 className="cart-title" data-testid="cart-title">Mi Carrito</h2>
            <p className="cart-subtitle" data-testid="cart-item-count">{cart.length} productos</p>
          </div>
          <button 
            onClick={onClose} 
            className="cart-close-btn"
            data-testid="cart-close-button"
          >
            <X className="cart-icon" />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="cart-empty" data-testid="cart-empty-message">
              Tu carrito está vacío
            </p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="cart-item" data-testid={`cart-item-${idx}`}>
                <img 
                  src={item.imagen_url} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                
                <div className="cart-item-details">
                  <h6 className="cart-item-name" data-testid={`cart-item-name-${idx}`}>
                    {item.name}
                  </h6>
                  <p className="cart-item-size">{item.color} <b>{item.size}</b></p>
                  <p className="cart-item-price" data-testid={`cart-item-price-${idx}`}>
                    Bs. {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    className="cart-remove-btn"
                    data-testid={`cart-item-remove-${idx}`}
                  >
                    <Trash2 className="cart-icon-sm" />
                  </button>
                  
                  <div className="cart-quantity-control">
                    <button 
                      onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                      className="cart-quantity-btn"
                      disabled={item.quantity == 1 }
                      data-testid={`cart-item-decrease-${idx}`}
                    >
                      <Minus className="cart-icon-sm" />
                    </button>
                    <span 
                      className="cart-quantity"
                      data-testid={`cart-item-quantity-${idx}`}
                    >
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      className="cart-quantity-btn"
                      disabled={item.quantity >= item.maxStock}
                      data-testid={`cart-item-increase-${idx}`}
                    >
                      <Plus className="cart-icon-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span data-testid="cart-total">Bs. {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="cart-checkout-btn"
              data-testid="cart-checkout-button"
            >
              Pedir por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;