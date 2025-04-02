const asyncHandler = require("../utils/asynchandler");
const ApiResponse = require("../utils/apiResponse");
const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");

// @desc Create a new product
const createProduct = asyncHandler(async (req, res, next) => {
    const { name, category, price, stock, status } = req.body;

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can add products" });
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }

    // Create product with admin ID
    const product = await Product.create({
        name,
        category,
        price,
        stock,
        status,
        image: imageUrl,
        createdBy: req.user._id, // Associate admin ID
    });

    res.status(201).json(new ApiResponse(201, "Product Created Successfully", product));
});

// @desc Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");
    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Update product
const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, status } = req.body;
    const image = req.file ? req.file.path : null;

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (image) {
      await cloudinary.uploader.destroy(product.image); // Delete old image
      product.image = image;
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.status = status || product.status;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await cloudinary.uploader.destroy(product.image); // Delete image from Cloudinary
    await product.deleteOne();
    
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  };