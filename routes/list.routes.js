const router = require("express").Router();

const { listControllers } = require("../controllers/list.controller");
const { authMiddleWare } = require("../middlewares");

const { getAllLists, createList, updateList, getSingleList } = listControllers;

router.get("/all", getAllLists);
router.post("/create", createList);
router.post("/update/:listId", updateList);
router.get("/:listId", getSingleList);

module.exports = router;
