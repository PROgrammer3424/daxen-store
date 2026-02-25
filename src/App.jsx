import { useState } from 'react';
import './App.css'
import Cart from './components/Cart';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Main from './routing/Main'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    const existingIndex = cart.findIndex(
        cartItem => 
            cartItem.id === item.id && 
            cartItem.size === item.size && 
            cartItem.color === item.color
    );
    
    if (existingIndex >= 0) {
      const newQuantity = cart[existingIndex].quantity + item.quantity;
      if (newQuantity > item.maxStock) {
        alert(`No puedes agregar más ${item.maxStock} unidades disponibles`);
        return;
      }
        const newCart = [...cart];
        newCart[existingIndex].quantity += item.quantity;
        setCart(newCart);
    } else {
        setCart([...cart, { 
            ...item, 
            quantity: 1,
            maxStock: item.maxStock
        }]);
    }
    setIsCartOpen(true);
};

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  }
  
  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  }

  const handleCheckout = async () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsList = cart.map(item => `\n*${item.categoria}*\n*Tipo:* ${item.tipo} \n*Nombre:* ${item.name} \n*Talla:* ${item.size}\n*Color:* ${item.color}\n*Cantidad:* ${item.quantity}\n*Subtotal: Bs. ${(item.price * item.quantity).toFixed(2)}*`).join('\n');
    const message = `Hola, quiero hacer un pedido:\n${itemsList}\n\n*Total: ${total.toFixed(2)} Bs.*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <header className="sticky-top">
          <Header 
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
          />
        </header>
        <main className='flex-grow-1'>
          <Main 
            onAddToCart={handleAddToCart}
            cartItems={cart}
          />
        </main>
        <footer className='border-top'>
          <Footer />
        </footer>
        <button 
          onClick={() => {
            const mensaje = encodeURIComponent("Hola, tenía una consulta sobre sus productos...");
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
          }}
          className="whatsapp-float"
          aria-label="Contactar por WhatsApp"
          data-testid="whatsapp-floating-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>

        <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      </div>
    </>
  )
}
export default App