const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected to ${conn.connection.name}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
