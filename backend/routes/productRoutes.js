const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, isAdmin, upload.single("image"), createProduct) // Admin-only
  .get(getProducts); // Public

router.route("/:id")
  .put(protect, isAdmin, upload.single("image"), updateProduct) // Admin-only
  .delete(protect, isAdmin, deleteProduct); // Admin-only

  router.get("/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ category });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  });  
  // Get products by category for customer view

module.exports = router;
