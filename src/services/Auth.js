const User = require("../models/AuthModels");
const bcrypt = require("bcryptjs");

async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  return savedUser;
}

async function loginUser(userData) {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
}

module.exports = {
  registerUser,
  loginUser,
};
