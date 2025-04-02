const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Register user
exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user
      const user = await User.create({
        name,
        email,
        password, // Hashing is done in the User model using `pre` middleware
        role, // Ensure the role is validated in the model
      });
  
      if (user) {
        generateToken(res, user._id); // Set JWT as an HTTP-only cookie
  
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role, // Return user role
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

// @desc Login user
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      generateToken(res, user._id); // Set cookie with JWT
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  // @desc Logout User & Clear Cookie
exports.logoutUser = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
  };
  
