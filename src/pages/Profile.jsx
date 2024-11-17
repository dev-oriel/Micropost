import { useState, useEffect } from "react";
import profile1 from "../assets/images/profile1.jpg";

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "john_doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profileImage: profile1,
    followers: 350,
    posts: [
      { id: 1, content: "My first post!", timestamp: "2024-11-17T12:00:00Z" },
      {
        id: 2,
        content: "Loving the MicroPost platform!",
        timestamp: "2024-11-18T14:30:00Z",
      },
    ],
  },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    // Fetching user data (for simplicity, we use a static user)
    const currentUser = users.find((user) => user.id === 1);
    setUser(currentUser);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 2000); // Hide success message after 2 seconds
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-16">
      <div className="max-w-4xl mx-auto bg-white shadow-3xl rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-theme-light"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-semibold text-theme">{user.name}</h1>
            <p className="text-lg text-theme-light">@{user.username}</p>
            <p className="text-gray-600 mt-2">{user.followers} Followers</p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-theme mb-4">Contact Info</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border-2 ${
                  isEditing ? "border-theme-light" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border-2 ${
                  isEditing ? "border-theme-light" : "border-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-theme mb-2">About Me</h2>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full p-4 rounded-lg border-2 ${
              isEditing ? "border-theme-light" : "border-gray-300"
            } text-gray-600`}
            rows="4"
          />
        </div>

        {/* Success Feedback Section */}
        {isUpdated && (
          <div className="text-center text-green-600 font-semibold mb-4">
            Profile updated successfully!
          </div>
        )}

        {/* Edit Profile Button */}
        <div className="text-center">
          <button
            onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
            className="bg-theme text-white py-2 px-6 rounded-lg hover:bg-theme-light focus:outline-none focus:ring-2 focus:ring-theme mt-4"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
