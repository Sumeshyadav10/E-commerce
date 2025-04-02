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

module.exports = router;
