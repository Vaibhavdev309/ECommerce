const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  changePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Handle both POST and GET requests for "/register"
router.route("/register").post(registerUser);
router
  .route("/login")
  .post(loginUser)
  .get(function (req, res) {
    res.json("Connected successfully");
  });
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").post(isAuthenticatedUser, changePassword);
router.route("/update").post(isAuthenticatedUser, updateProfile);
router.route("/admin/update").post(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
router.route("/admin/user/delete/:id");

module.exports = router;
