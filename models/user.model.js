const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: 8, required: true },
    isAdmin: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task", default: [] }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
