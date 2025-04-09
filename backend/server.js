require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Import order routes
const messageRoutes = require("./routes/messageRoutes");



connectDB();
const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      credentials: true, // Allow cookies to be sent with requests
    })
  );

app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Enable cookie parsing

app.use("/api/users", authRoutes); // Auth 
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
