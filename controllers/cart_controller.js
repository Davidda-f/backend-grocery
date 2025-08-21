const Cart = require("../models/cart");

exports.createCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [{ productId: productId, quantity: quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId: productId, quantity: quantity });
      }
    }
    await cart.save();
    res.status(201).json({ message: "Cart created successfully", cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart removed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    if (cart.items.length === 0) {
      await Cart.findOneAndDelete({ userId });
      return res.status(200).json({ message: "Cart is empty" });
    }

    await cart.save();
    res.status(200).json({ message: "Item  removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    res
      .status(200)
      .json({ message: "Cart retrieved successfully", cart: cart });
  } catch (error) {
    res.status(500).json({ message: "Error" + error.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found." });
    }

    const existingCartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingCartItem) {
      return res.status(400).json({ message: "Product not found in cart." });
    }

    existingCartItem.quantity += quantity;
    await cart.save();

    res
      .status(200)
      .json({ message: "Cart item updated successfully", cart: cart });
  } catch (error) {
    res.status(500).json({ message: "Error" + error.message });
  }
};
