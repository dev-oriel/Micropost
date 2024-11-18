const express = require("express");
const router = express.Router();
const User = require("../../shared/models/User");

// Endpoint to fetch random users
router.get("/random-users", async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 5; // Default to 5 if not provided
    const randomUsers = await User.aggregate([
      { $sample: { size } },
      {
        $project: { username: 1, email: 1, profilePicture: 1, bio: 1, _id: 1 },
      },
    ]);
    res.status(200).json(randomUsers);
  } catch (error) {
    console.error("Error fetching random users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
