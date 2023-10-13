require("dotenv").config();

const ENVIRONMENTS = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = ENVIRONMENTS;
