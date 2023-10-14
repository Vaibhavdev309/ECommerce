const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Please Login to your account to access this resource",
    });
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decodedData.id);
    next();
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        success: false,
        message:
          "You have not enough privilege to access this part of the website",
      });
    }
    next();
  };
};
module.exports = { isAuthenticatedUser, authorizeRoles };
