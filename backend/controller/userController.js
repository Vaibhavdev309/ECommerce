const User = require("../models/userModel");
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      avatar: { public_id: "This is sample profile", url: "ProfilePicURL" },
    });
    res.status(201).json({ success: true, user });
  });
}

module.exports = { registerUser };
