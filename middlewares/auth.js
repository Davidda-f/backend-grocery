const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied, token missing" });
    }

    const decoded = jwt.verify(
      token.replace("Bearer", " "),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or required token" });
  }
};
