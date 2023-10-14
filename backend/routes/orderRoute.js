const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  deleteOrder,
} = require("../controller/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/admin/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
router.route("/orders/myOrder").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders/getAllOrder")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrder);

module.exports = router;
