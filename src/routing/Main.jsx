import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import ProductoDetail from "../pages/ProductDetail";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";

const Main = ({onAddToCart, cartItems}) => {
    return (
        <Routes>
            <Route path="/producto/:id" element={<ProductoDetail onAddToCart={onAddToCart} cartItems={cartItems} />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
        </Routes>
    )
}
export default Main;