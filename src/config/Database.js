const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sumitnode:sumit0410@sumitnamastedev.0btbw1k.mongodb.net/DevTinder",
  );
};

module.exports = connectDB;
