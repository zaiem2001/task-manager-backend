const bcrypt = require("bcrypt");

const { User } = require("../models");
const { checkFalseString } = require("../utils/validation.helpers");
const { signJWT } = require("../utils/auth.helpers");

const userControllers = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (checkFalseString(email) || checkFalseString(password)) {
        res.status(400);
        throw new Error("Invalid request!");
      }

      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        res.status(401);
        throw new Error("Invalid username or Password!");
      }

      const isPwdValid = await bcrypt.compare(password, currentUser.password);

      if (!isPwdValid) {
        res.status(401);
        throw new Error("Invalid username or Password!");
      }
      const { password: userPwd, ...rest } = currentUser._doc;

      res
        .status(200)
        .json({ user: rest, token: signJWT({ _id: currentUser._id }) });
    } catch (error) {
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (checkFalseString(email) || checkFalseString(password)) {
        res.status(400);
        throw new Error("Invalid request!");
      }

      const emailAlreadyExists = await User.findOne({ email });

      if (emailAlreadyExists) {
        res.status(400);
        throw new Error("User already exists!");
      }

      const hashedPwd = await bcrypt.hash(password, 10);

      const newUser = new User({ email, password: hashedPwd });
      const savedUser = await newUser.save();
      const { password: userPwd, ...rest } = savedUser._doc;

      res.status(201).json({ user: rest });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: (req, res) => {},

  getSingleUser: (req, res) => {},
};

module.exports = { userControllers };
