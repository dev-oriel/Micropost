const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../shared/models/User.js");
const { publishUserEvent } = require("./user-service.js");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username: `user${Date.now()}`,
      bio: "",
      profilePicture: "placeholder.jpg",
      phone: "",
    });

    await newUser.save();

    publishUserEvent("user_registered", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    publishUserEvent("user_logged_in", {
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res.status(200).json({
      message: "User logged in successfully.",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
