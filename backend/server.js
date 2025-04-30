const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Connect Database and Start Server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
       console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});




// Environment Configuration (dotenv.config()):

// Loads environment variables from a .env file into process.env, allowing you to store sensitive data (like database URI, email credentials, etc.) outside your codebase.

// Express Application Setup:

// express(): Creates an Express application instance (app).

// app.use(cors()): Enables Cross-Origin Resource Sharing (CORS), allowing your API to be accessed from different domains. This is useful if your front-end and back-end are hosted on different domains.

// app.use(express.json()): Parses incoming JSON payloads in the request body, so you can access req.body in your route handlers.

// Routes:

// app.use("/api", authRoutes): All routes defined in the authRoutes module are prefixed with /api. This means that routes like POST /register will be available at http://localhost:PORT/api/register.

// Database Connection:

// connectDB(): This imports and executes the function to connect to your MongoDB database. The connection settings are stored in the .env file, and the connection is established using Mongoose.

// Server Start:

// The server starts on the port specified in the .env file (process.env.PORT). Once the connection to the database is successful, it logs "Server running on port [PORT]".