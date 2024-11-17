import { useState } from "react";
import Feed from "../components/Feed";
import { FiImage, FiPaperclip } from "react-icons/fi";
import { randomPosts, users } from "../constants/";
import Followers from "../components/Followers";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState(randomPosts);
  const [editingPost, setEditingPost] = useState(null);
  const maxChars = 280;

  // Handle post content change
  const handleContentChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setPostContent(e.target.value);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(URL.createObjectURL(selectedFile));
  };

  // Handle post submission
  const handlePostSubmit = () => {
    if (postContent.trim() || file) {
      if (editingPost !== null) {
        // Update an existing post
        setPosts((prevPosts) =>
          prevPosts.map((post, index) =>
            index === editingPost
              ? { ...post, content: postContent, file }
              : post
          )
        );
        setEditingPost(null);
      } else {
        // Create a new post
        const newPost = {
          content: postContent,
          file: file ? file : null,
          timestamp: new Date(),
        };
        setPosts([newPost, ...posts]);
      }
      setPostContent("");
      setFile(null);
    }
  };

  // Handle post edit
  const handleEdit = (index) => {
    const postToEdit = posts[index];
    setPostContent(postToEdit.content);
    setFile(postToEdit.file);
    setEditingPost(index);
  };

  // Handle post delete
  const handleDelete = (index) => {
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
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
                  src={file}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg border border-gray-300 object-cover"
                />
              </div>
            )}
          </div>

          <Feed
            posts={posts}
            onDeletePost={handleDelete}
            onEditPost={handleEdit}
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
            <Followers followers={users} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
