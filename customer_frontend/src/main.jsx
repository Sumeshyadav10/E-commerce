import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartWishlistProvider } from './context/CartWishlistContext.jsx';
import App from './App';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import './index.css';

const Main = () => {
  return (
    <ThemeProvider>
      <CartWishlistProvider> {/* ✅ Wrap inside here */}
        <Router>
          <Routes>
            {/* Parent Route */}
            <Route path="/" element={<App />}>
              {/* Child Routes */}
              <Route index element={<HomePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </Router>
      </CartWishlistProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
