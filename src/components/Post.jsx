import PropTypes from "prop-types";

// Utility to format timestamps
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Formats as "MM/DD/YYYY, HH:MM:SS"
};

const Post = ({ username = "Anonymous", content, timestamp }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md mb-4">
      {/* Display username */}
      <h3 className="font-bold text-blue-600">{username}</h3>
      {/* Display post content */}
      <p className="text-gray-700">{content || "No content available."}</p>
      {/* Display formatted timestamp */}
      <span className="text-gray-500 text-sm">{formatDate(timestamp)}</span>
    </div>
  );
};

// PropTypes validation
Post.propTypes = {
  username: PropTypes.string, // Optional string
  content: PropTypes.string.isRequired, // Required string
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired, // Required string or number
};

export default Post;
