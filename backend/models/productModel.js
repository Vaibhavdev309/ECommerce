const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Enter the name of product"] },
  description: {
    type: String,
    required: [true, "Enter the description of product"],
  },
  price: {
    type: Number,
    required: [true, "Enter the price of product"],
    maxLength: [6, "Price should not be greater than 999999"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: { type: String, required: [true, "Enter the category of product"] },
  stock: {
    type: Number,
    default: 0,
    maxLength: [4, "Stock cannot be exceeded 9999"],
    required: [true, "Enter the stocks of product"],
  },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: String, default: 0 },
      comment: { type: String, required: [true] },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
