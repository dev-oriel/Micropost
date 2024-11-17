const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes");
require("dotenv").config();

const app = express();

// Enable CORS for all domains (you can specify domains if needed)
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware
app.use(express.json());

// Use `/api` as the base path for user routes
app.use("/api", userRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
