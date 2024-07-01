const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Lỗi máy chủ" });
};

module.exports = { errorHandlingMiddleware };
