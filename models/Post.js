const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    username: {
      type: String,
      required: true,
    },

    categories: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("PostMernBlog", postModel);

module.exports = Post;
