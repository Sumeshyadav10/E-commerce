const asyncHandler = require("../utils/asynchandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/apiResponse");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const generateOrderID = () => {
    return "ORD-" + Date.now().toString().slice(-6) + Math.floor(1000 + Math.random() * 9000);
};

// 🔹 Create a New Order
const createOrder = asyncHandler(async (req, res, next) => {
    // Automatically get the logged-in user
    const customerId = req.user._id; 

    const { products } = req.body; // Products should have product ID & quantity

    if (!products || products.length === 0) {
        throw new apiError(400, "Order must contain at least one product");
    }

    // Fetch product details from the database
    const productIds = products.map(p => p.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== products.length) {
        throw new apiError(400, "Some products were not found");
    }

    // Calculate total cost
    let totalAmount = 0;
    const updatedProducts = products.map(p => {
        const productData = dbProducts.find(dbP => dbP._id.toString() === p.product);
        if (!productData) {
            throw new apiError(400, `Product with ID ${p.product} not found`);
        }
        const cost = productData.price * p.quantity;
        totalAmount += cost;
        return { product: p.product, quantity: p.quantity, price: productData.price };
    });

    const orderID = generateOrderID();

    // Create order with logged-in user
    const order = await Order.create({
        orderID,  // Storing the generated Order ID
        customer: customerId,
        products: updatedProducts,
        totalAmount,
        status: "Pending",
        createdAt: new Date()
    });

    res.status(201).json(new ApiResponse(201, "Order placed successfully", order));
});


// 🔹 Get All Orders (Admin Access)
const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find()
        .populate("customer", "name email")
        .populate("products.product", "name price")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, "All orders fetched successfully", orders));
});

// get order(customer)
  const getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ customer: req.user._id })
        .populate("products.product", "name price")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, "Orders fetched successfully", orders));
});



// 🔹 Get a Single Order by ID
const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("customer", "name email")
        .populate("products.product", "name price");

    if (!order) {
        return next(new ApiError(404, "Order not found"));
    }

    res.status(200).json(new ApiResponse(200, "Order details", order));
});

// 🔹 Update Order Status (Admin Access)
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ApiError(404, "Order not found"));
    }

    order.status = status;
    await order.save();

    res.status(200).json(new ApiResponse(200, "Order status updated", order));
});

// 🔹 Delete Order (Admin Access)
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ApiError(404, "Order not found"));
    }

    res.status(200).json(new ApiResponse(200, "Order deleted successfully"));
});

// cancel order (customer)
const cancelOrder = asyncHandler(async (req, res, next) => {
    const { orderID } = req.params; // Get order ID from URL
    const customerId = req.user._id; // Get logged-in user

    // Find order & ensure it belongs to the customer
    const order = await Order.findOne({ orderID, customer: customerId });

    if (!order) {
        throw new apiError(404, "Order not found or you do not have permission to cancel it.");
    }

    if (order.status === "Cancelled") {
        throw new apiError(400, "Order is already cancelled.");
    }

    // Update status to "Cancelled"
    order.status = "Cancelled";
    await order.save();

    res.status(200).json(new ApiResponse(200, "Order cancelled successfully", order));
});


module.exports = {createOrder, getOrders,getAllOrders, getOrderById, updateOrderStatus, deleteOrder, cancelOrder};