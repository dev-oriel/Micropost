import { useState, useEffect } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import Followers from "../components/Followers";
import { FiImage, FiPaperclip } from "react-icons/fi";
import { users } from "../constants";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const maxChars = 280;

  // Fetch posts from the MongoDB database
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

  // Handle post content change
  const handleContentChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setPostContent(e.target.value);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const [currentUserId] = useState(1); // Assuming the current user's ID is 1
  const [followers, setFollowers] = useState(users);

  // Handle post deletion
  const onDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle post editing
  const onEditPost = async (postId, updatedContent) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        { content: updatedContent }
      );
      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, content: response.data.content }
            : post
        )
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  // Handle post submission
  const handlePostSubmit = async () => {
    if (postContent.trim() || file) {
      const formData = new FormData();
      formData.append("content", postContent);
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
        setPosts([response.data, ...posts]); // Add new post to the top of the feed
      } catch (error) {
        console.error("Error creating post:", error);
      }

      setPostContent("");
      setFile(null);
    }
  };

  return (
    <div className="flex justify-center pt-24 min-h-screen bg-gray-100">
      <div className="w-full lg:w-4/5 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-lg min-h-screen flex flex-col mb-6 lg:mb-0">
          <div className="mb-6">
            <button className="w-full bg-theme text-white font-semibold py-2 rounded-lg hover:bg-theme-light transition duration-200">
              + Create Post
            </button>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <ul className="space-y-4 text-lg font-medium">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">home</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">search</span>
                  <span>Explore</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">notifications</span>
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">message</span>
                  <span>Messages</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">bookmark</span>
                  <span>Bookmarks</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">account_circle</span>
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-theme flex items-center space-x-2"
                >
                  <span className="material-icons">settings</span>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
          <h1 className="text-2xl font-bold mb-6 text-theme-dark">
            Welcome to MicroPost
          </h1>

          {/* Post Section */}
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
              <div className="flex items-center space-x-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FiImage className="text-2xl text-gray-600 hover:text-theme" />
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FiPaperclip className="text-2xl text-gray-600 hover:text-theme" />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Trending Topics</h2>
            <ul className="space-y-3">
              <li className="text-sm hover:text-theme">
                <a href="#">#MicroPost</a>
              </li>
              <li className="text-sm hover:text-theme">
                <a href="#">#DistributedSystems</a>
              </li>
              <li className="text-sm hover:text-theme">
                <a href="#">#RealTimeUpdates</a>
              </li>
            </ul>
          </div>
          <div className="flex-grow">
            <Followers followers={followers} currentUserId={currentUserId} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
