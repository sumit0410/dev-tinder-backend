const express = require("express");
const connectDB = require("./config/Database");
const { User, Product } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

//Saving user into the database
app.post("/signup", async (req, res) => {
  try {
    //data validation
    validateSignUpData(req);
    //encrypt password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User Saved Successfully");
  } catch (error) {
    res.status(400).send("some error occured : " + error.message);
  }
});

//login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validating email
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    //finding user with the email entered.
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //checking if the password is same in db
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      res.send("Login successful!!!");
    }
  } catch (error) {
    res.status(400).send("some error occured : " + error.message);
  }
});

//getting all users from the db
app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send("Some error occured" + error.message);
  }
});

//get user based on emailId
app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.find({ email: email });
    if (!user.length) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//get user by an ID
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//delete user through id
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//update the user through id

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "firstName", "lastName", "age"];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowedUpdate) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 5) {
      throw new Error("Skills cannot be more than 5");
    }
    // const id = req.body.id;
    await User.findByIdAndUpdate(userId, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update failed : " + error.message);
  }
});

// //saving product into the database...
app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Product saved successfully");
  } catch (error) {
    res.status(400).send("Some error occured" + error.message);
  }
});

//getting all product from the database
app.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      res.status(404).send("No products found");
    }
    res.status(200).json({
      msg: "Product fetched successfully",
      products: products,
    });
  } catch (error) {
    res.status(400).send("Some error occured");
  }
});

connectDB()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect with DB", err);
  });
