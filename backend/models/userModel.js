const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly Enter your name"],
    maxLength: [30, "Name cannot exceed more than 30 characters"],
    minLength: [2, "Name must be more than 2 characters  "],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter an valid emial id"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [8, "Password must be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  role: { type: String, required: [true, "Please enter the role"] },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
console.log(process.env.JWT_SECRET);
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
};
userSchema.methods.comparePassword = function (enteredPass) {
  return bcrypt.compare(enteredPass, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .hash("hex");
  console.log(tokenCrytpo);
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
