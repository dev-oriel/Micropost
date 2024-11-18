import { useState } from "react";

const Followers = ({ followers, currentUserId }) => {
  const [following, setFollowing] = useState(
    followers.map((follower) => ({
      ...follower,
      isFollowing: false, // Default to not following
    }))
  );

  const toggleFollow = (userId) => {
    setFollowing((prev) =>
      prev.map((follower) =>
        follower.id === userId
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">People you might know</h2>
      <ul className="space-y-3">
        {following.map((follower) => (
          <li
            key={follower.id}
            className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg"
          >
            <span>{follower.name}</span>
            <button
              className={`py-1 px-3 rounded-lg text-sm ${
                follower.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-theme text-white"
              }`}
              onClick={() => toggleFollow(follower.id)}
            >
              {follower.isFollowing ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
