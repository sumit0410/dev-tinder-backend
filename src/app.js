const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the test");
});
app.use("/hello", (req, res) => {
  res.send("Hello from the Hello world");
});
app.use("/demo", (req, res) => {
  res.send("Hello from the Dashboard world");
});
app.use("/", (req, res) => {
  res.send("Hello from the Dashboard world");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
