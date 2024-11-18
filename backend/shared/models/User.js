const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "placeholder.jpg" },
    phone: { type: String, default: "" },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, default: () => `name_${Date.now()}` }, // Dynamic default
  },
  { timestamps: true }
);

// Middleware to ensure updatedAt is set
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
