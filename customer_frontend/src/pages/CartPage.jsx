import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useTheme } from '../context/ThemeContext';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useCartWishlist();
    const { darkMode } = useTheme();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`min-h-screen px-4 py-10 flex flex-col items-center justify-start 
      ${darkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-3xl p-6 rounded-2xl shadow-xl
        ${darkMode ? 'bg-[#1f1f1f] border border-gray-700' : 'bg-white border border-gray-200'}`}>
        
        <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <li key={index} className={`p-4 rounded-lg shadow
                  ${darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">Price: ${item.price}</p>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
