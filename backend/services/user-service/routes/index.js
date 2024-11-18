const express = require("express");
const randomUsers = require("./randomUsers");

const router = express.Router();

// Random Users Route
router.use("/random-users", randomUsers);

module.exports = router;
