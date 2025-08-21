const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json()); 
const connectDb = require('./config/database');

// Connect to MongoDB
connectDb();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use("/api/products", require("./routes/product_route"));
app.use("/api/categories", require("./routes/category_route"));
app.use("/api/brands", require("./routes/brand_route"));
app.use("/api/users", require("./routes/user_route"));
app.use("/api/carts", require("./routes/cart_route"));
app.use("/api/wishlists", require("./routes/wishlist_route"));
app.use("/api/orders", require("./routes/order_route"));
app.use("/api/shippingaddresses", require("./routes/shipping_address_route"));
app.use("/api/auths", require("./routes/auth_route"));

// Start server
const PORT = 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
