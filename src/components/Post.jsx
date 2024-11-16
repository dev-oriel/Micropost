import React from "react";

const Post = ({ username, content, timestamp }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md mb-4">
      <h3 className="font-bold text-blue-600">{username}</h3>
      <p className="text-gray-700">{content}</p>
      <span className="text-gray-500 text-sm">{timestamp}</span>
    </div>
  );
};

export default Post;
