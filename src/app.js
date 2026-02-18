const express = require("express");

const app = express();

app.use(
  "/profile",
  (req, res, next) => {
    next();
    // res.send("Profile 1");
    // console.log("PRofile 1");
  },
  (req, res, next) => {
    res.send("Profile 2");
    next();
  },
  (req, res, next) => {
    // next();
    res.send("Profile 3");
  },
  (req, res, next) => {
    // next();
    res.send("Profile 4");
  },
);

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
