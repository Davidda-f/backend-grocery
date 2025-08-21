const express = require('express');
const router = express.Router();
const wishlistController = require("../controllers/wishlist_controller");

router.post("/", wishlistController.addToWishlist);

module.exports = router;