import { useState } from "react";

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing); 
  };

  return (
    <button
      onClick={handleClick}
      className={`py-1 px-3 rounded-lg transition duration-200 ${
        isFollowing
          ? "bg-gray-500 text-white hover:bg-gray-400"
          : "bg-theme text-white hover:bg-theme-light"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
