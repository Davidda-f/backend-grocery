const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    items:[
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            addedAt: {type: Date, default: Date.now}
        }
    ]
},{timestamps: true});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;