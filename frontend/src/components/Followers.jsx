import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Followers = ({ followers, currentUserId }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Suggestions for You</h2>
      <ul className="space-y-4">
        {followers.map((follower, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Profile Picture */}
              <Link to={`/profile/${follower.id}`}>
                <img
                  src={follower.profileImage}
                  alt={follower.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
              </Link>
              <a href="#" className="text-sm hover:text-theme">
                {follower.name}
              </a>
            </div>
            {/* Add FollowButton here */}
            <FollowButton
              followerId={currentUserId}
              followeeId={follower.id}
              isFollowing={follower.isFollowing}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop types validation
Followers.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      isFollowing: PropTypes.bool, // Track if the user is following this profile
    })
  ).isRequired,
  currentUserId: PropTypes.number.isRequired, // Add current user id
};

export default Followers;
