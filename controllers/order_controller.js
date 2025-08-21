const Order = require("../models/order");
const ShippingAddress = require("../models/shipping_address");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddressId, totalAmount } = req.body;

    const shippingAddress = await ShippingAddress.findById(shippingAddressId);

    if (!ShippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    let calculatedTotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found" + product._id });
      }

      calculatedTotal += product.price * item.quantity;

      if (calculatedTotal !== totalAmount) {
        return res
          .status(400)
          .json({ message: "Total amount does not match ." });
      }
    }

    const order = new Order({
      userId,
      items,
      shippingAddressId,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "name price"
    );

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      userId: order.userId,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddressId: order.shippingAddressId,
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
