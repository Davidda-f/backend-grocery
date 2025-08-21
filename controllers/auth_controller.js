const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const client = new OAuth2Client(
  "1029275408888-ctb1gbapg8n32hnuri1gv8k94saafs57.apps.googleusercontent.com"
);

const generateToken = (userId) =>{
    return jwt.sign({id: userId,},jwt_secret, {expiresIn: jwt_expires});
}


exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const tokenInfo = client.verifyIdToken({
      idToken,
      audience:
        "1029275408888-ctb1gbapg8n32hnuri1gv8k94saafs57.apps.googleusercontent.com",
    });

    const { sub, email, name, picture } = tokenInfo.getPayload();
    const googleId = sub;
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        googleId,
        email,
        fullName: name,
        picture,
      });
      await user.save();
    }

    const token = generateToken(user._id);
    res.status(201).json({
      message: "Google login successful",
      token: token,
    });

  } catch (error) {
    res.status(401).json({ error: "Invalid google token" + error.message });
  }
};
