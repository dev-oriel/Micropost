const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./services/profile/index");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User Routes
const userRoutes = require("./services/user-service/routes");
app.use("/api/users", userRoutes);

// Post Routes
const postRoutes = require("./services/post-service/routes");
app.use("/api/posts", postRoutes);

app.use("/api/user", profileRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Micropost Backend is Running");
});

// Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
