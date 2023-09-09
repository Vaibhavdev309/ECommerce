const express = require("express");
const app = express();

app.use(express.json());

// Route Exports
const products = require("./routes/productRoute");

app.use("/api/vi", products);

module.exports = app;
