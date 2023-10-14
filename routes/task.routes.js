const router = require("express").Router();

const { taskControllers } = require("../controllers/task.controller");

const { getTasksByList, updateTask, createTask, deleteTask } = taskControllers;

router.get("/list/:listId", getTasksByList);

router.get("/all", getTasksByList);
router.post("/create", createTask);
router.post("/update/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
// router.get("/:listId", getSingleList);

module.exports = router;
