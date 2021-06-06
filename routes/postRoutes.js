const { Router } = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/post");

const router = Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
