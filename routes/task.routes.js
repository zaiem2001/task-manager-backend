const router = require("express").Router();

const { taskControllers } = require("../controllers/task.controller");

const { getAllTasks } = taskControllers;

router.get("/all", getAllTasks);

module.exports = router;
