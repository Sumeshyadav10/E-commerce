import React, { useState } from "react";
import { useCartWishlist } from "../context/CartWishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, darkMode }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCartWishlist();
  const [showReview, setShowReview] = useState(false);
  const [showNotification, setShowNotification] = useState({ message: "", type: "" });

  // Check if the product is already in the wishlist
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id); // Remove from wishlist
      setShowNotification({ message: "Removed from Favourites", type: "error" });
    } else {
      addToWishlist(product); // Add to wishlist
      setShowNotification({ message: "Added to Favourites", type: "success" });
    }
    setTimeout(() => setShowNotification({ message: "", type: "" }), 2000); // Hide notification after 2 seconds
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification({ message: "Added to Cart", type: "cart" });
    setTimeout(() => setShowNotification({ message: "", type: "" }), 2000); // Hide notification after 2 seconds
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-[1.02] ${
        darkMode ? "bg-[#1f1f1f]" : "bg-white"
      }`}
    >
      {/* Notification Pop-Up */}
      {showNotification.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
            showNotification.type === "success"
              ? "bg-green-500"
              : showNotification.type === "error"
              ? "bg-red-500"
              : "bg-blue-600"
          }`}
        >
          {showNotification.message}
        </div>
      )}

      <div>
        <img
          src={product.image[0]}
          alt={product.name}
          className="h-36 w-full object-cover rounded-md mb-3"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        {/* Heart Icon for Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="text-red-500 text-xl"
        >
          {isInWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-1">{product.description}</p>
      <p className="text-sm mb-1">Dimensions: {product.dimensions}</p>
      <p className="text-sm font-medium">₹{product.price}</p>
      <p className="text-sm text-gray-400">Stock: {product.stock}</p>
      <p className="text-sm mb-2">
        Rating:{" "}
        <span className="text-yellow-500">
          {product.averageRating ? product.averageRating.toFixed(1) : "N/A"}
        </span>
      </p>

      <button
        onClick={handleAddToCart}
        className="w-full py-1.5 text-sm mb-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      <button
        onClick={() => setShowReview(!showReview)}
        className="w-full py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {showReview ? "Cancel Review" : "Add Review"}
      </button>

      {showReview && (
        <div className="mt-3">
          <div className="mb-2">
            <label className="block text-xs mb-1">Rating (1–10)</label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs mb-1">Your Review</label>
            <textarea
              rows="2"
              className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
              placeholder="Write something..."
            ></textarea>
          </div>
          <button className="w-full py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;