const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);
module.exports = { List };
