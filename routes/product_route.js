const express = require("express");
const Product = require("../models/product");
const productController = require("../controllers/product_controller");
const router = express.Router();

// Get all products
router.get("/", productController.getProducts);

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({ message: "Product saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product: " + error.message });
  }
});

module.exports = router;
