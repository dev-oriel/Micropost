const express = require("express");
const router = express.Router();
const User = require("../../shared/models/User"); // Ensure this path is correct

// Endpoint to fetch random users
router.get("/random-users", async (req, res) => {
  try {
    const randomUsers = await User.aggregate([{ $sample: { size: 5 } }]); // Fetch 5 random users
    res.status(200).json(randomUsers);
  } catch (error) {
    console.error("Error fetching random users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
