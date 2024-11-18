const express = require("express");
const router = express.Router();

// Example route to fetch random users
router.get("/:count", (req, res) => {
  const count = parseInt(req.params.count, 10);
  if (isNaN(count) || count <= 0) {
    return res.status(400).json({ error: "Invalid count parameter" });
  }

  const randomUsers = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  res.status(200).json(randomUsers);
});

module.exports = router;
