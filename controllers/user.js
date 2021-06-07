const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist!",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(200).json({
        message: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: "This account does not belong to you!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: "This user has been deleted...",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "This user is not found!",
      });
    }
  } else {
    res.status(401).json({
      message: "This account does not belong to you",
    });
  }
};
