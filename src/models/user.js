const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const productSchema = new mongoose.Schema({
  prodName: {
    type: String,
  },
  prodCategory: {
    type: String,
  },
  price: {
    type: String,
  },
  stockStatus: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { User, Product };
