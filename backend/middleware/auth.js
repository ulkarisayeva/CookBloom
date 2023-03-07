const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.get("Authorization") || req.get("X-Authorization");

  if (!token) {
    return res.status(403).json({
      success: "false",
      message: "A token is required for authentication",
    });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length < 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({
      success: "false",
      message: "Invalid token type",
    });
  }

  try {
    const decoded = jwt.verify(tokenParts[1], config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: "false",
      message: "Invalid token",
    });
  }
  return next();
};

module.exports = verifyToken;
