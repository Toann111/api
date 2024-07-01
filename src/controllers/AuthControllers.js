const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you have a User model
const { env } = require("../config/environment");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Tên người dùng hoặc mật khẩu bị trống" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Người dùng đã được đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ msg: "Lỗi máy chủ" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Tên người dùng hoặc mật khẩu bị trống" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Lỗi thông tin đăng nhập không hợp lệ" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mật khẩu không chính xác" });
    }

    if (email === "Admin@gmail.com" && password === "123456") {
      return res.status(200).json({ msg: "Xin chào admin" });
    }

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, userId: user._id, msg: "Đăng nhập thành công" });
  } catch (error) {
    res.status(500).json({ msg: "Lỗi máy chủ" });
  }
};

module.exports = { registerUser, loginUser };
