const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodeMsg = await jwt.verify(token, "SUMIT@@DevTinder");

    const { _id } = decodeMsg;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.send("Error : " + error.message);
  }
};

module.exports = {
  userAuth,
};
