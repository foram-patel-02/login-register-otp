const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };




// hashPassword:

// Purpose: Hashes a plain-text password before storing it in the database.

// How It Works:

// It first generates a salt with bcrypt.genSalt(10), which determines the number of rounds used to hash the password. In this case, 10 rounds are used, which is a good balance between security and performance.

// Then, it hashes the password using bcrypt.hash(password, salt), which combines the password with the salt to produce a secure hashed password.

// The function returns the hashed password.

// comparePassword:

// Purpose: Compares a plain-text password with a hashed password (e.g., during login).

// How It Works:

// It takes the plain-text password and the hashed password from the database and uses bcrypt.compare(password, hashedPassword) to check if the plain-text password matches the hashed one.

// The function returns true if the passwords match, and false if they don’t.

