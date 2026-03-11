const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  skills: {
    type: [String],
  },
});

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "SUMIT@@DevTinder", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = function (passwordByUserInput) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = bcrypt.compare(passwordByUserInput, passwordHash);
  return isPasswordValid;
};
// const productSchema = new mongoose.Schema({
//   prodName: {
//     type: String,
//   },
//   prodCategory: {
//     type: String,
//   },
//   price: {
//     type: String,
//   },
//   stockStatus: {
//     type: String,
//   },
// });

const User = mongoose.model("User", userSchema);
// const Product = mongoose.model("Product", productSchema);

module.exports = { User };
