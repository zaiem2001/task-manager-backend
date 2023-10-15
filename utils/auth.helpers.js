const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../environment");

const signJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "6h",
  });
};

module.exports = { signJWT };
