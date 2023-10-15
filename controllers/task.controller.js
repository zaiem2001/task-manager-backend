const mongoose = require("mongoose");
const { Task, List } = require("../models");

const taskControllers = {
  getTasksByList: async (req, res, next) => {
    try {
      const { listId } = req.params;

      if (!mongoose.isValidObjectId(listId)) {
        res.status(400);
        throw new Error("Invalid list ID.");
      }

      const loggedInUser = req.user;

      const taskItems = await Task.find({
        list: listId,
        user: loggedInUser._id,
        deleted: false,
      })
        .populate("user", "-password")
        .populate("list");

      res.status(200).json({ task: taskItems });
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const loggedInUser = req.user;
      const { description, listId } = req.body;

      const newTask = new Task({
        description,
        list: listId,
        user: loggedInUser._id,
      });
      const savedTask = await newTask.save();

      await List.findOneAndUpdate(
        { _id: listId },
        {
          $push: { tasks: savedTask._id },
        }
      );

      return res.status(201).json({ task: savedTask });
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const { description, completed } = req.body;

      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { $set: { description, completed } },
        { new: true }
      );

      return res.status(201).json({ task: updatedTask });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;

      const deletedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { $set: { deleted: true } },
        {
          new: true,
        }
      );

      await List.findOneAndUpdate(
        { _id: deletedTask.list },
        {
          $pull: { tasks: taskId },
        }
      );

      return res.status(201).json({ task: deletedTask });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { taskControllers };
