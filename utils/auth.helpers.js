const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../environment");

const signJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

module.exports = { signJWT };
