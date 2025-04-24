import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance'

// Create the context
const CartWishlistContext = createContext();

// Provider component
export const CartWishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchCartAndWishlist = async () => {
    try {
      const { data } = await axiosInstance.get("/users/me");
  
      // Map cart items with all product details
      setCartItems(
        (data.cart || []).map((item) => ({
          productId: item.product._id,
          name: item.name,
          price: item.price,
          image: item.image,
          dimensions: item.dimensions,
          quantity: item.quantity,
        }))
      );
  
      setWishlistItems(data.wishlist || []);
    } catch (error) {
      console.error("Error fetching cart and wishlist:", error.response?.data?.message || error.message);
    }
  };
  const syncCartWithBackend = async (cart) => {
    try {
      await axiosInstance.put("/users/cart", { cart });
    } catch (error) {
      console.error("Error syncing cart:", error.response?.data?.message || error.message);
    }
  };
  
  const syncWishlistWithBackend = async (wishlist) => {
    try {
      await axiosInstance.put("/users/wishlist", { wishlist });
    } catch (error) {
      console.error("Error syncing wishlist:", error.response?.data?.message || error.message);
    }
  };
  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product === product._id);
      if (existingItem) {
        return prevItems;
      }
      const updatedCart = [...prevItems, { product: product._id, quantity: 1 }];
      syncCartWithBackend(updatedCart);
      return updatedCart;
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.product !== productId);
      syncCartWithBackend(updatedCart);
      return updatedCart;
    });
  };
  
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.includes(product._id)) {
        return prevItems;
      }
      const updatedWishlist = [...prevItems, product._id];
      syncWishlistWithBackend(updatedWishlist);
      return updatedWishlist;
    });
  };
  
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const updatedWishlist = prevItems.filter((id) => id !== productId);
      syncWishlistWithBackend(updatedWishlist);
      return updatedWishlist;
    });
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
        fetchCartAndWishlist,
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