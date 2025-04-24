import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../api/axiosInstance";
import ProductCard from "../../components/ProductCard";
import { Loader2 } from "lucide-react";

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
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 capitalize tracking-wide">
          {category}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
