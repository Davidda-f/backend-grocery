const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cart_controller");

router.post("/", cartController.createCart);
router.delete("/:userId", cartController.removeCart);
router.delete("/items/:userId/:productId", cartController.removeCartItem);
router.put("/items/:userId/:productId", cartController.updateCartItemQuantity);
router.get("/", cartController.getCart);

module.exports = router;