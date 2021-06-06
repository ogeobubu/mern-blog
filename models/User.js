const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    number: {
      type: Number,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    invite: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserMernBlog", userModel);

module.exports = User;
