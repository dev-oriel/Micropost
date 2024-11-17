const express = require("express");
const Post = require("../../shared/models/Post");
const router = express.Router();

// GET /api/posts - Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }); // Sort by latest
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// POST /api/posts - Create a new post
router.post("/", async (req, res) => {
  const { content, file } = req.body;

  if (!content && !file) {
    return res.status(400).json({ error: "Content or file is required" });
  }

  try {
    const newPost = new Post({ content, file });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

// DELETE /api/posts/:id - Delete a post by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

module.exports = router;
