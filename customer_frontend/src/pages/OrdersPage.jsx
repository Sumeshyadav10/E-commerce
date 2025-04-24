import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axiosInstance from "../api/axiosInstance";

const OrdersPage = () => {
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, []);



  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-[#1e1e1e] text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg">You haven't placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className={`p-4 rounded-lg shadow ${
                darkMode ? "bg-[#2a2a2a]" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>

              {/* Order Items */}
              <h3 className="text-lg font-semibold mt-4">Order Items:</h3>
              <ul className="list-disc pl-6">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div>
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>
                          Quantity: {item.quantity} x ₹{item.price} = ₹
                          {(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Other Details */}
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;