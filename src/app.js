const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Sumit", lastName: "Gautam" });
});

app.post("/user", (req, res) => {
  res.send("Data has been saved successfully!");
});

app.delete("/user", (req, res) => {
  res.send("Data has been removed from the db");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
