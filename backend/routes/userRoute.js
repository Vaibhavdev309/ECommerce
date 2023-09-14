const express = require("express");
const { registerUser } = require("../controller/userController");

const router = express.Router();

// Handle both POST and GET requests for "/register"
router
  .route("/register")
  .post(registerUser)
  .get(function (req, res) {
    res.json("You've reached the page successfully");
  });

module.exports = router;
