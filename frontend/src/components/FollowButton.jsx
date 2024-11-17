import { useState } from "react";
import axios from "axios";

const FollowButton = ({ followerId, followeeId, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    try {
      if (following) {
        // Unfollow user
        await axios.post(`http://localhost:5000/api/follow/`, {
          followerId,
          followeeId,
        });
      } else {
        // Follow user
        await axios.post(`http://localhost:5000/api/follow/`, {
          followerId,
          followeeId,
        });
      }

      setFollowing(!following); // Toggle follow state
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`py-1 px-3 rounded-lg transition duration-200 ${
        following
          ? "bg-gray-500 text-white hover:bg-gray-400"
          : "bg-theme text-white hover:bg-theme-light"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
