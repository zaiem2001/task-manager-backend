const router = require("express").Router();

const { listControllers } = require("../controllers/list.controller");

const { getAllLists } = listControllers;

router.get("/all", getAllLists);

module.exports = router;
