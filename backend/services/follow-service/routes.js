const express = require("express");
const router = express.Router();
const { followUser } = require("./follow-service");

// Route to follow/unfollow a user
router.post("/follow", async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user IDs" });
  }

  const result = await followUser(followerId, followingId);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
});

module.exports = router;
