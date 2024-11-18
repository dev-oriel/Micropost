const express = require("express");
const User = require("../../shared/models/User");
const router = express.Router();

// Get user data
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

// Update user data
router.put("/:userId", async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Publish the update event (RabbitMQ)
    const { publishUserEvent } = require("../user-service/user-service");
    publishUserEvent("updated", updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

module.exports = router;
