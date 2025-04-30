const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;



// This code defines a function `connectDB` that establishes a connection to a MongoDB database using the `mongoose` library. It is written as an asynchronous function to handle the asynchronous nature of database operations. Inside a `try` block, it attempts to connect to the database using the connection string stored in the environment variable `MONGO_URI`. It also includes two options: `useNewUrlParser` and `useUnifiedTopology`, which are recommended settings to avoid deprecation warnings and ensure a more stable connection. If the connection is successful, it logs a success message including the host name of the connected database. If there’s an error during connection, it logs an error message and then exits the process with a status code of 1 to indicate a failure. Finally, the `connectDB` function is exported so it can be used elsewhere in the application, typically at the start of the server to ensure the database is connected before handling requests.