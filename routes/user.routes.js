const router = require("express").Router();

const { userControllers } = require("../controllers/user.controller");

const { login, signup } = userControllers;

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
