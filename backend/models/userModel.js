const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
  role: { type: String, default: "user" },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
module.exports = mongoose.model("User", userSchema);
