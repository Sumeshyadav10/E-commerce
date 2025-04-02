require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();
const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Enable cookie parsing

app.use("/api/users", authRoutes); // Auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
