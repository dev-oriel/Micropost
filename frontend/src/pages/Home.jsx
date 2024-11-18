import { useState, useEffect } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import Followers from "../components/Followers";
import { FiImage } from "react-icons/fi";
import { users } from "../constants";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(users); 
  const [currentUserId] = useState(1); // Assuming the current user's ID is 1
  const maxChars = 280;

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data); // Assuming API returns an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Fetch random users from the server
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/random-users"
        );
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, []);

  // Handle post content changes
  const handleContentChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setPostContent(e.target.value);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  // Handle post submission
  const handlePostSubmit = async () => {
    // Ensure there's either content or a file
    if (!postContent.trim() && !file) {
      alert("Please provide some content or an image.");
      return;
    }

    const formData = new FormData();
    if (postContent.trim()) formData.append("content", postContent.trim());
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPosts([response.data, ...posts]);
      setPostContent("");
      setFile(null);
    } catch {
      console.error("Error creating post");
      alert("An error occurred while creating the post. Please try again.");
    }
  };

  // Handle post deletion
  const onDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  // Handle post editing
  const onEditPost = async (postId, updatedContent) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          content: updatedContent,
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, content: response.data.content }
            : post
        )
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div className="flex justify-center pt-24 min-h-screen bg-gray-100">
      <div className="w-full lg:w-4/5 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-lg min-h-screen flex flex-col mb-6 lg:mb-0">
          <button className="w-full bg-theme text-white font-semibold py-2 rounded-lg hover:bg-theme-light transition duration-200">
            + Create Post
          </button>
          <nav className="flex-grow overflow-y-auto mt-6">
            <ul className="space-y-4 text-lg font-medium">
              {[
                { icon: "home", label: "Home" },
                { icon: "search", label: "Explore" },
                { icon: "notifications", label: "Notifications" },
                { icon: "account_circle", label: "Profile" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-theme flex items-center space-x-2"
                  >
                    <span className="material-icons">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
          <h1 className="text-2xl font-bold mb-6 text-theme-dark">
            Welcome to MicroPost
          </h1>

          {/* Post Input Section */}
          <div className="mb-6 bg-white rounded-lg shadow-lg p-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg resize-none"
              rows="4"
              placeholder="What's happening?"
              value={postContent}
              onChange={handleContentChange}
            ></textarea>
            <div className="text-right text-sm text-gray-600">
              {postContent.length}/{maxChars}
            </div>
            <div className="flex items-center justify-end mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <FiImage className="text-2xl text-gray-600 hover:text-theme" />
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <button
                onClick={handlePostSubmit}
                className="ml-4 bg-theme text-white font-semibold py-2 px-4 rounded-lg hover:bg-theme-light transition duration-200"
              >
                Post
              </button>
            </div>
            {file && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg border border-gray-300 object-cover"
                />
              </div>
            )}
          </div>

          <Feed
            posts={posts}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
          />
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-lg overflow-y-auto min-h-screen flex flex-col">
          <Followers followers={followers} currentUserId={currentUserId} />
        </aside>
      </div>
    </div>
  );
};

export default Home;
