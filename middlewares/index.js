const { notFound, errorMiddleware } = require("./error.middleware");
const { authMiddleWare } = require("./auth.middlware");

module.exports = {
  notFound,
  errorMiddleware,
  authMiddleWare,
};
