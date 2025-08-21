const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;
const jwt_expires = process.env.JWT_EXPIRES;

const generateToken = (userId) =>{
    return jwt.sign({id: userId,},jwt_secret, {expiresIn: jwt_expires});
}
exports.register = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already registered in this email"});
        }
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({message: "User registered successfully", user: newUser, token: token});
    } catch (error) {
        res.status(500).json({ message: "Error:" + error.message });
    
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userLogin = await User.findOne({email});
        if(!userLogin) {
            return res.status(400).json({message: "Incorrect email or password"});
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if(!isMatch) {
            return res.status(400).json({message: "Incorrect email or password"});
        }

        console.log(userLogin._id);
        const token = generateToken(userLogin._id);

        res.status(200).json({message: "Login successful", user: userLogin, token: token});
    } catch (error) {
        res.status(500).json({ message: "Error:" + error.message });
        
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({_id:userId}).select("-password");

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error:" + error.message });
        console.log(error);
    }
};