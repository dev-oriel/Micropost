import React from "react";
import Feed from "../components/Feed";

const Profile = () => {
  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold">User Name</h2>
        <p className="text-gray-600">Email: user@example.com</p>
        <p className="text-gray-600">Followers: 100 | Following: 50</p>
      </div>
      <h3 className="text-xl font-bold mb-4">Posts</h3>
      <Feed />
    </div>
  );
};

export default Profile;
