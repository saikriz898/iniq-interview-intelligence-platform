const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/iniq", {
      serverSelectionTimeoutMS: 3000
    });
    console.log("✅ INIQ DB is connected");
    return true;
  } catch (e) {
    console.log("❌ MongoDB connection failed:", e.message);
    console.log("💡 Install MongoDB: https://www.mongodb.com/try/download/community");
    throw e;
  }
};
