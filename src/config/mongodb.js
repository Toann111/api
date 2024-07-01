const mongoose = require("mongoose");
const { env } = require("./environment");

const CONNECT_DB = async () => {
  await mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const CLOSE_DB = () => {
  mongoose.connection.close();
};

module.exports = { CONNECT_DB, CLOSE_DB };
