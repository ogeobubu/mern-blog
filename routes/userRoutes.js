const express = require("express");
const router = express.Router();

const {
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/user");

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/edit/:id", editUser);
router.delete("/remove/:id", deleteUser);

module.exports = router;
