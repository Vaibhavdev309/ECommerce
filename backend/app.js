const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Route Exports
const products = require("./routes/productRoute");
const users = require("./routes/userRoute");
const orders = require("./routes/orderRoute");

app.use("/api/vi", products);
app.use("/api/vi", users);
app.use("/api/vi", orders);

module.exports = app;
