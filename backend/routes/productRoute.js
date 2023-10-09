const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const router = express.Router();
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);
router.route("/product/:id").get(getProductDetails);
module.exports = router;
