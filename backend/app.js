const express = require("express");
const app = express();

app.use(express.json());

// Route Exports
const products = require("./routes/productRoute");
const users = require("./routes/userRoute");

app.use("/api/vi", products);
app.use("/api/vi", users);

module.exports = app;
