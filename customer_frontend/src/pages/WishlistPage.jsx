import React from "react";
import { useCartWishlist } from "../context/CartWishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useCartWishlist();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate("/buy-product", { state: { product } });
  };

  const handleCardClick = (product) => {
    navigate(`/category/${product.category}`, { state: { product } });
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
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-lg">Your wishlist is empty.</p>
        ) : (
          <ul className="space-y-4">
            {wishlistItems.map((item, index) => (
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
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      removeFromWishlist(item._id);
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleBuyNow(item);
                    }}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Buy Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;