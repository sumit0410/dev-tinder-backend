const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User got successfully");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Data is sent successfully");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

// app.use(
//   "/profile",
//   (req, res, next) => {
//     next();
//     // res.send("Profile 1");
//     // console.log("PRofile 1");
//   },
//   (req, res, next) => {
//     res.send("Profile 2");
//     next();
//   },
//   (req, res, next) => {
//     // next();
//     res.send("Profile 3");
//   },
//   (req, res, next) => {
//     // next();
//     res.send("Profile 4");
//   },
// );

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Sumit", lastName: "Gautam" });
});

// app.post("/user", (req, res) => {
//   res.send("Data has been saved successfully!");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data has been removed from the db");
// });

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
