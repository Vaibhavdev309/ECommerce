const Product = require("../models/productModel");
async function getAllProducts(req, res) {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
}
async function createProduct(req, res, next) {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
}
async function updateProduct(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({ satus: true, product });
}
async function deleteProduct(req, res) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found, Unable to delete" });
  }
  await Product.findByIdAndDelete(req.params.id);
  res
    .status(201)
    .json({ success: true, message: "Product Deleted Successfully" });
}
async function getProductDetails(req, res) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found, Unable to delete" });
  }
  res.status(200).json({ success: true, product });
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
};
