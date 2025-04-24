import React, { useState } from "react";
import { useCartWishlist } from "../context/CartWishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCartWishlist();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // State to track quantities for each product
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = 1; // Default quantity is 1 for each product
      return acc;
    }, {})
  );

  // Calculate total amount based on quantities
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item._id] || 1),
    0
  );

  const handleBuyNow = () => {
    navigate("/buy-product", { state: { cartItems } }); // Pass the entire cartItems array
  };

  const handleCardClick = (product) => {
    navigate(`/category/${product.category}`, { state: { product } });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1), // Ensure quantity is at least 1
    }));
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 flex flex-col items-center justify-start ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-6 rounded-2xl shadow-xl ${
          darkMode
            ? "bg-[#1f1f1f] border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow cursor-pointer ${
                    darkMode ? "bg-[#2a2a2a]" : "bg-gray-50"
                  }`}
                  onClick={() => handleCardClick(item)} // Navigate to category page
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-400">
                        Price: ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-400">
                        Dimensions: {item.dimensions}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            decrementQuantity(item._id);
                          }}
                          className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-600"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{quantities[item._id]}</span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            incrementQuantity(item._id);
                          }}
                          className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        removeFromCart(item._id);
                      }}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        handleBuyNow();
                      }}
                      className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl font-semibold">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;