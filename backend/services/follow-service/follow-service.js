const User = require("../../shared/models/User"); // Assuming you have a User model to handle the user data
const mongoose = require("mongoose");

// Follow a user
const followUser = async (followerId, followingId) => {
  try {
    // Find the follower and the user being followed
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      throw new Error("User not found");
    }

    // Check if the follower is already following the user
    if (follower.following.includes(followingId)) {
      // If already following, unfollow them
      await User.findByIdAndUpdate(followerId, {
        $pull: { following: followingId },
      });
      await User.findByIdAndUpdate(followingId, {
        $pull: { followers: followerId },
      });

      // Decrease follower count
      following.followersCount -= 1;
      follower.followingCount -= 1;
    } else {
      // If not following, add them to the following list
      await User.findByIdAndUpdate(followerId, {
        $push: { following: followingId },
      });
      await User.findByIdAndUpdate(followingId, {
        $push: { followers: followerId },
      });

      // Increase follower count
      following.followersCount += 1;
      follower.followingCount += 1;
    }

    // Save both users after updates
    await follower.save();
    await following.save();

    return { success: true, message: "Follow status updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

// Export the function to be used in your routes
module.exports = { followUser };
