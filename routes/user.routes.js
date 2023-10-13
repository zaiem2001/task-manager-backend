const router = require("express").Router();

const { userControllers } = require("../controllers/user.controller");

const { login } = userControllers;

router.post("/login", login);

module.exports = router;
