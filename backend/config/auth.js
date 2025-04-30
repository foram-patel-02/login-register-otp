const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "7d",
  });
};

module.exports = { generateToken };



// This code defines a function called `generateToken` that creates a JSON Web Token (JWT) for a given user ID. It uses the `jsonwebtoken` package to generate the token. The function takes an `id` as input and embeds it into the payload of the JWT as `{ id }`. It then signs the token using a secret key stored in the environment variable `JWT_SECRET`. The token also includes an expiration time, which is taken from the environment variable `JWT_EXPIRATION`; if this variable is not set, the token defaults to expire in 7 days (`"7d"`). Finally, the `generateToken` function is exported as a module so it can be used in other parts of the application, typically for user authentication and session management.