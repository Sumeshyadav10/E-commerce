import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { Star, XCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useNavigate } from "react-router-dom";


const OrdersPage = () => {
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Inside OrdersPage component
const navigate = useNavigate();

const handleCardClick = (product) => {
  navigate(`/category/${product.category}`, { state: { product } });
};


  const handleCancelOrder = async (orderId) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order cancelled.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  const OrderItemCard = ({ item, orderId }) => (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm bg-white dark:bg-[#1e1e1e] mb-4 transition">
      {/* Image */}
      <div className="w-full md:w-1/5 mb-4 md:mb-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-28 object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className="flex-1 md:ml-6 space-y-1">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <div className="flex items-center text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="ml-1">310</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          100% cotton · Light weight · Best finish
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Unique design · For men · Casual
        </p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          Quantity: {item.quantity} × ₹{item.price} = ₹{(item.quantity * item.price).toFixed(2)}
        </p>
      </div>

      {/* Right section */}
      <div className="mt-4 md:mt-0 text-right min-w-[160px]">
        <p className="text-xl font-bold text-green-600">₹{item.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 line-through">₹{(item.price + 100).toFixed(2)}</p>
        <p className="text-sm text-green-500 font-medium">Free shipping</p>

        <div className="mt-2 space-y-2">
        <button
          onClick={() => handleCardClick(item)}
          className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          DETAILS
</button>
          <button
            onClick={() => handleCancelOrder(orderId)}
            className="w-full px-3 py-2 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50 dark:hover:bg-[#2a2a2a] transition"
          >
            CANCEL ORDER
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen px-6 py-10 ${darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} height={150} borderRadius={12} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center mt-20 text-lg text-gray-500">
            <XCircle className="mx-auto mb-4 w-10 h-10 text-gray-400" />
            You haven’t placed any orders yet.
          </div>
        ) : (
          orders.map((order) =>
            order.orderItems.map((item, idx) => (
              <OrderItemCard key={idx} item={item} orderId={order._id} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
