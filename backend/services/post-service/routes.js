const express = require("express");
const Post = require("../../shared/models/Post");
const amqp = require("amqplib"); // RabbitMQ library
const router = express.Router();

let channel;

// Function to connect to RabbitMQ and create a channel
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost"); // Adjust the URL as needed
    channel = await connection.createChannel();
    await channel.assertQueue("post_events"); // Queue for post-related events
    console.log("RabbitMQ connected and queue asserted");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

// Initialize RabbitMQ connection
connectRabbitMQ();

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

    // Publish a message to RabbitMQ for the created post
    const message = JSON.stringify({
      event: "post_created",
      data: {
        id: newPost._id,
        content: newPost.content,
        file: newPost.file,
        timestamp: newPost.timestamp,
      },
    });

    if (channel) {
      channel.sendToQueue("post_events", Buffer.from(message));
      console.log("Post creation event published to RabbitMQ");
    }

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

    // Publish a message to RabbitMQ for the deleted post
    const message = JSON.stringify({
      event: "post_deleted",
      data: {
        id: post._id,
      },
    });

    if (channel) {
      channel.sendToQueue("post_events", Buffer.from(message));
      console.log("Post deletion event published to RabbitMQ");
    }

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

module.exports = router;
