import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../api/axiosInstance";
import ProductCard from "../../components/ProductCard"; // ✅ Import your new component

const CategoryPage = () => {
  const { category } = useParams();
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/products/category/${category}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">{category}</h1>
      {products.length === 0 ? (
        <p className="text-center text-lg">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
