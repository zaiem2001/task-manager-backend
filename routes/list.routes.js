const router = require("express").Router();

const { listControllers } = require("../controllers/list.controller");
const { authMiddleWare } = require("../middlewares");

const { getAllLists, createList, updateList, getSingleList, deleteList } =
  listControllers;

router.get("/all", getAllLists);
router.post("/create", createList);
router.post("/update/:listId", updateList);
router.get("/:listId", getSingleList);
router.delete("/:listId", deleteList);

module.exports = router;
