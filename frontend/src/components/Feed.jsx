import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const Feed = ({ posts, onDeletePost, onEditPost }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleSaveEdit = (postId) => {
    if (editedContent.trim()) {
      onEditPost(postId, editedContent);
      setIsEditing(null);
      setEditedContent("");
    }
  };

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-3xl text-gray-500" />
              <div>
                <p className="font-bold text-gray-800">
                  {post.username || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">{post.name}</p>
              </div>
            </div>
            <OptionsMenu
              onDelete={() => onDeletePost(index)}
              onEdit={() => {
                setIsEditing(index);
                setEditedContent(post.content);
              }}
            />
          </div>

          {isEditing === index ? (
            <div>
              <textarea
                className="w-full p-2 border rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button
                onClick={() => handleSaveEdit(index)}
                className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(null)}
                className="bg-gray-200 text-sm font-semibold py-1 px-3 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-gray-800 mb-4">
              {post.content || "No content available."}
            </p>
          )}

          {post.file && !isEditing && (
            <div className="mb-4">
              <img
                src={post.file}
                alt="Post"
                className="w-full h-auto rounded-lg border border-gray-300"
              />
            </div>
          )}

          <div className="text-xs text-gray-500 mb-4">
            {formatDate(post.timestamp)}
          </div>

          <LikeButton />

          <CommentSection postId={index} />
        </div>
      ))}
    </div>
  );
};

const OptionsMenu = ({ onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-500 hover:text-gray-700"
      >
        <FiMoreHorizontal size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={onEdit}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center space-x-2 text-sm ${
        liked ? "text-red-500" : "text-gray-600"
      } hover:text-red-500 mb-4`}
    >
      <FiHeart className="text-lg" />
      <span>{likes} Likes</span>
    </button>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="w-full">
      {comments.length > 0 && (
        <ul className="mb-2 space-y-2 text-sm text-gray-700">
          {comments.map((comment, index) => (
            <li
              key={`${postId}-${index}`}
              className="p-2 bg-gray-100 rounded-md border"
            >
              {comment}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

Feed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      file: PropTypes.string,
    })
  ).isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onEditPost: PropTypes.func.isRequired,
};

OptionsMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Feed;
