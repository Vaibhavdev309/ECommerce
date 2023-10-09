const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: { public_id: "This is sample profile", url: "ProfilePicURL" },
    role: req.body.role,
  });
  sendToken(user, 201, res);
}

async function loginUser(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json("Please Enter both email and password");
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Your Account is not Registered" });
  }

  const isPasswordMatched = user.comparePassword(user.password);
  if (!isPasswordMatched) {
    res.status(401).json({
      success: false,
      message: "You have entered the invalid email id or password",
    });
  }
  sendToken(user, 200, res);
}

//Logout User

async function logout(req, res, next) {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

// Forgot password

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  }
  // Get Reset Password Token
  const resetToken = User.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resePasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/vi/password/reset/${resetToken}`;
  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you not requested this email then please ignore it`;
};

// Get the details of Users

const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
};

// Change the Password

const changePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log("Data fetched by changePassword \n", user);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    res
      .status(401)
      .json({ success: false, message: "Old Password is incorrect" });
  } else if (req.body.newPassword !== req.body.confirmPassword) {
    res
      .status(401)
      .json({ success: false, message: "Your new password does not match" });
  } else {
    user.password = req.body.newPassword;
    await user.save();
    console.log("Password Changed successfully");
    sendToken(user, 200, res);
  }
};

const updateProfile = async (req, res, next) => {
  const updatedData = { name: req.body.name, email: req.body.email };
  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, message: "Updated Successfully", user });
};

const getAllUser = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({ success: "true", user });
};
const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: "true", user });
};

const updateUserRole = async (req, res, next) => {
  const updatedData = { role: "admin" };
  const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, message: "Updated Successfully", user });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }
  await User.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ success: false, message: "User Remvoved Successfully" });
};

module.exports = {
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
};
