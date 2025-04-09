import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {category}
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-lg">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className={`p-4 rounded-lg shadow ${
                darkMode ? "bg-[#1f1f1f]" : "bg-white"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">Price: ${product.price}</p>
              <p
                className={`text-sm ${
                  product.status === "available"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {product.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;