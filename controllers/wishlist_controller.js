const Wishlist = require("../models/wishlist");

exports.addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      wishlist = new Wishlist({ userId, items: [{ productId }] });
    } else {
      const exists = wishlist.items.find(
        (item) => item.productId.toString() === productId
      );
      if (exists) {
        return res.status(400).json({ message: "Product already in wishlist"});
      } else {
        wishlist.items.push({ productId });
      }
    }

    await wishlist.save();
    res
      .status(201)
      .json({
        message: "Product added to wishlist successfully.",
        wishlist: wishlist,
      });
  } catch (error) {
    res.status(500).json({ message: "Error" + error.message });
  }
};
