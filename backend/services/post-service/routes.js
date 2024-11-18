const express = require("express");
const multer = require("multer");
const Post = require("../../shared/models/Post");
const amqp = require("amqplib");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let channel;

// Initialize RabbitMQ connection and channel
amqp
  .connect("amqp://localhost")
  .then((connection) => connection.createChannel())
  .then((ch) => {
    channel = ch;
  })
  .catch((err) => console.error("Error connecting to RabbitMQ:", err));

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Unique file name
  },
});

// Initialize multer upload with validation (optional: file size/type)
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
});

// POST /api/posts - Create a new post
router.post("/", upload.single("file"), async (req, res) => {
  const { content } = req.body;
  const file = req.file;

  if (!content && !file) {
    return res.status(400).json({ error: "Content or file is required" });
  }

  try {
    const newPost = new Post({
      content,
      file: file ? file.path : null,
    });

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

    res.status(201).json({
      content: newPost.content,
      file: newPost.file,
      timestamp: newPost.timestamp, // Only include necessary fields
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

module.exports = router;
