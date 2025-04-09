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
    console.log("Token from cookies:", req.cookies.jwt); // Debugging line
    try {
      res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }); // Clear the cookie
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
 

  // @desc Get all users
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude password field
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // @desc Get user by ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password"); // Exclude password field
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // @desc Update user
  exports.updateUser = async (req, res) => {
    try {
      const { name, email, role } = req.body;
  
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
  
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // @desc Delete user
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await user.remove();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };