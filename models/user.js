const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    phone: { type: String},
    address:[{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;