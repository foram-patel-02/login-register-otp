const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};




// It attempts to extract a token from the Authorization header in the format:

// Authorization: Bearer <token>
// It uses .split(" ")[1] to grab the token part after "Bearer".

// Missing Token:
// If no token is found, it returns a 401 Unauthorized response with the message "Access denied, token missing".

// Token Validation:
// If a token is provided, it uses jwt.verify() to decode and validate the token using the secret key from environment variables (JWT_SECRET).

// Valid Token:
// If valid, the decoded user data (typically containing the user ID or other claims) is attached to req.user, making it accessible in downstream routes.

// Invalid Token:
// If verification fails (e.g., expired or malformed token), it returns a 401 Unauthorized error with the message "Invalid token".

