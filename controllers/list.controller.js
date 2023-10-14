const { List } = require("../models");

const listControllers = {
  getAllLists: async (req, res, next) => {
    try {
      const loggedInUser = req.user;

      const listItems = await List.find({
        user: loggedInUser._id,
        deleted: false,
      })
        .populate("user", "-password")
        .populate("tasks");

      res.status(200).json({ list: listItems });
    } catch (error) {
      next(error);
    }
  },

  getSingleList: async (req, res, next) => {
    try {
      const { listId } = req.params;

      const listItem = await List.findOne({ _id: listId, deleted: false })
        .populate("user", "-password")
        .populate("tasks");

      res.status(200).json({ list: listItem });
    } catch (error) {
      next(error);
    }
  },

  createList: async (req, res, next) => {
    try {
      const loggedInUser = req.user;

      const { title } = req.body;

      const newList = new List({ title, user: loggedInUser._id });
      const savedList = await newList.save();

      return res.status(201).json({ list: savedList });
    } catch (error) {
      next(error);
    }
  },

  updateList: async (req, res, next) => {
    try {
      const { listId } = req.params;
      const { title } = req.body;

      const updatedList = await List.findOneAndUpdate(
        { _id: listId },
        { $set: { title } }
      );

      return res.status(201).json({ list: updatedList });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { listControllers };
