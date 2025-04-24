import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // Use your axios instance

const BuyProductPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || {}; // Retrieve cart items
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step tracker: 1 = Address, 2 = Order Summary, 3 = Payment
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing the address
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fetch user's existing address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data } = await axiosInstance.get("/users/profile"); // Authenticated request
        if (data.address) {
          setAddress(data.address);
        } else {
          setIsEditing(true); // If no address, allow editing
        }
      } catch (error) {
        console.error("Error fetching user address:", error.response?.data?.message || error.message);
      }
    };

    fetchAddress();
  }, []);

  const handleNextStep = async () => {
    if (step === 1) {
      if (isEditing) {
        // Update address in the database
        try {
          await axiosInstance.put("/users/address", address); // Authenticated request
            setAddress(address); // Update local state with new address
            console.log("Address updated successfully:", address); // Debugging line
          setIsEditing(false); // Stop editing after saving
          setStep(step + 1);
        } catch (error) {
          console.error("Error updating address:", error.response?.data?.message || error.message);
        }
      } else {
        setStep(step + 1);
      }
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    // Add logic to save order details and navigate to confirmation page
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 flex flex-col items-center ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Workflow Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`px-4 py-2 rounded-full ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Address
          </div>
          <div
            className={`w-8 h-1 ${
              step >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`px-4 py-2 rounded-full ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Order Summary
          </div>
          <div
            className={`w-8 h-1 ${
              step >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`px-4 py-2 rounded-full ${
              step === 3 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Payment
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div
        className={`w-full max-w-3xl p-6 rounded-2xl shadow-xl ${
          darkMode
            ? "bg-[#1f1f1f] border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Address</h2>
            {isEditing ? (
              <form>
                <input
                  type="text"
                  value={address.address}
                  onChange={(e) =>
                    setAddress({ ...address, address: e.target.value })
                  }
                  placeholder="Address"
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  placeholder="City"
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  placeholder="Postal Code"
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  placeholder="Country"
                  className="w-full p-2 mb-4 border rounded"
                />
              </form>
            ) : (
              <div>
                <p>
                  <strong>Address:</strong> {address.address}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Postal Code:</strong> {address.postalCode}
                </p>
                <p>
                  <strong>Country:</strong> {address.country}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Address
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleNextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {isEditing ? "Save & Next" : "Next"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems && cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg shadow ${
                      darkMode ? "bg-[#2a2a2a]" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-400">
                          Price: ₹{item.price}
                        </p>
                        <p className="text-sm text-gray-400">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart.</p>
            )}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePreviousStep}
                className="text-sm text-blue-600 hover:underline"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="creditCard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="debitCard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cashOnDelivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePreviousStep}
                className="text-sm text-blue-600 hover:underline"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyProductPage;