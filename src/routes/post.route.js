const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  getAllPost,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.get("/", verifyToken, getAllPost);
router.get("/:postId", verifyToken, getOnePost);
router.post("/create", verifyToken, createPost);
router.put("/edit/:postId", verifyToken, updatePost);
router.delete("/delete/:postId", verifyToken, deletePost);

module.exports = router;
