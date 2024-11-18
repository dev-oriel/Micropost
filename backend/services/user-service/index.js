const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes");
const randomRoutes = require("./random");
require("dotenv").config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Use `/api` as the base path for user routes
app.use("/api/users", userRoutes);
app.use("/api/random", randomRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
