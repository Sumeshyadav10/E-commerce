import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartWishlistContext = createContext();

// Provider component
export const CartWishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add to Cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Remove from Cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Add to Wishlist
  const addToWishlist = (item) => {
    setWishlistItems((prev) => [...prev, item]);
  };

  // Remove from Wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

// Custom hook to use the CartWishlistContext
export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};