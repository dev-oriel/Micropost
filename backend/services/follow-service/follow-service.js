const User = require("../../shared/models/User");
const amqp = require("amqplib");

// RabbitMQ setup
let channel, connection;
const queueName = "followQueue";

// Connect to RabbitMQ
async function connectRabbitMQ() {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log("Connected to RabbitMQ and Queue is ready.");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    setTimeout(connectRabbitMQ, 5000); // Try reconnecting after 5 seconds if failed
  }
}

// Initial connection to RabbitMQ
connectRabbitMQ();

// Follow a user
const followUser = async (followerId, followingId) => {
  try {
    // Find the follower and the user being followed
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      throw new Error("User not found");
    }

    let action;
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

      action = "unfollow";
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

      action = "follow";
    }

    // Save both users after updates
    await follower.save();
    await following.save();

    // Publish the follow/unfollow event to RabbitMQ
    const followEvent = {
      action,
      followerId,
      followingId,
      timestamp: new Date(),
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(followEvent)), {
      persistent: true,
    });

    return { success: true, message: "Follow status updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

// Export the function to be used in routes
module.exports = { followUser };
