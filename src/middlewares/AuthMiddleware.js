const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Tên người dùng hoặc mật khẩu bị trống" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Tên người dùng hoặc mật khẩu bị trống" });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
