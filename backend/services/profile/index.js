const express = require("express");
const User = require("../../shared/models/User");
const mongoose = require("mongoose");
const router = express.Router();

// Middleware to validate userId
const validateUserId = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;
  next();
};

// Fetch user profile
router.get("/:userId", validateUserId, async (req, res) => {
  res.status(200).json(req.user);
});

// Update user profile
router.put("/:userId", validateUserId, async (req, res) => {
  const { name, email, bio, phone } = req.body;

  try {
    Object.assign(req.user, { name, email, bio, phone });
    await req.user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
