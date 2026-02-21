const express = require("express");
const connectDB = require("./config/Database");
const { User, Product } = require("./models/user");

const app = express();
app.use(express.json());
//Saving user into the database
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Saved Successfully");
  } catch (error) {
    res.status(400).send("Some error occured", error.message);
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
    res.status(400).send("Some error occured", error.message);
  }
});

// //saving product into the database...
app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Product saved successfully");
  } catch (error) {
    res.status(400).send("Some error occured", error.message);
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
