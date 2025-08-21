const ShippingAddress = require("../models/shipping_address");

exports.createShippingAddress = async (req, res) => {
  try {
    const { userId, fullName, phone, address, city, postalCode, country } =
      req.body;

    const newAddress = new ShippingAddress({
      userId,
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    await newAddress.save();
    res.status(201).json({
      message: "Shipping address created successfully",
      newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
