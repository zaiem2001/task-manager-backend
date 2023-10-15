const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../environment");
const { User } = require("../models");

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : null;

  try {
    if (!authHeader || !token) {
      res.status(401);
      throw new Error("Unauthorized.");
    } else {
      const decodedToken = jwt.verify(token, JWT_SECRET);

      const { _id } = decodedToken;
      const currentUser = await User.findById(_id);

      if (!currentUser) {
        res.status(401);
        throw new Error("Unauthorized.");
      }

      req.user = currentUser;

      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401);
    }
    next(error);
  }
};

module.exports = { authMiddleWare };
