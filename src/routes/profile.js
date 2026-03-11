const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("some error occured : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("invalid edit request");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    console.log(loggedInUser);
    await loggedInUser.save();
    res.send("profile updated");
  } catch (error) {
    res.status(400).send("some error occured : " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!req.body["password"]) {
      throw new Error("only password reset allowed");
    }
    const user = req.user;
    const { password } = req.body;
    if (!validator.isStrongPassword(password)) {
      throw new Error("please enter a strong password");
    }
    const isSamePassword = await user.validatePassword(password);
    if (isSamePassword) {
      throw new Error("password can't be same as previous");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.send({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).send("some error occured : " + error.message);
  }
});

module.exports = profileRouter;
