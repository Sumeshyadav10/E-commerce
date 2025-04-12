import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartWishlistProvider } from "./context/CartWishlistContext.jsx";
import App from "./App";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/sendmessage_pages/ContactPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import HelpPage from "./pages/HelpPage";
import SendMessagePage from "./pages/sendmessage_pages/SendMessagePage.jsx";
import CategoryPage from "./pages/category_pages/CategoryPage.jsx"; // Import CategoryPage
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

const Main = () => {
  return (
    <ThemeProvider>
      <CartWishlistProvider>
        <AuthProvider>
          {" "}
          {/* Wrap the app with AuthProvider */}
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="send-message" element={<SendMessagePage />} />
                {/* Add route for CategoryPage */}
                <Route path="category/:category" element={<CategoryPage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </CartWishlistProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
