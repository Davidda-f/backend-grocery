const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  totalAmount: { type: Number, required: true },
  shippingAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
