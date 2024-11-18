import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import placeholderImage from "../assets/images/placeholder.jpg";
import { useUser } from "../context/UserContext"; // Import the user context

const Profile = () => {
  const { user: contextUser, login } = useUser(); // Access user data and login function
  const [user, setUser] = useState(null); // Local state for user
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch user data from the API
  useEffect(() => {
    if (!contextUser || !contextUser.id) {
      console.error("User context is missing or invalid");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${contextUser.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("User data is null");
        }
        setUser({
          ...data,
          bio: data.bio || "",
          phone: data.phone || "",
          profileImage: data.profilePicture || placeholderImage,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Unable to load profile data. Please try again.");
      }
    };

    fetchUserData();
  }, [contextUser]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Save changes to the database
  const handleSaveChanges = async () => {
    if (!contextUser?.id) return;

    setIsEditing(false);
    setIsUpdated(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${contextUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Update the context with the new user data
      login(user);

      setTimeout(() => setIsUpdated(false), 2000);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    try {
      const action = isFollowing ? "unfollow" : "follow";
      const response = await fetch(
        `http://localhost:5000/api/user/${contextUser.id}/${action}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update follow status");
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
      setError("Failed to update follow status. Please try again.");
    }
  };

  // Handle profile image change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: imageUrl,
      }));

      const formData = new FormData();
      formData.append("profileImage", file);
      try {
        await fetch(`http://localhost:5000/api/user/${contextUser.id}/upload`, {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to update profile picture. Please try again.");
      }
    }
  };

  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  if (!contextUser) {
    return (
      <div className="text-center">Please log in to view your profile.</div>
    );
  }

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-16">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <div
            className="relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <img
              src={user.profileImage || placeholderImage}
              className="w-32 h-32 object-cover rounded-full border-4 border-theme-light"
            />
            {isHovered && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full">
                <label className="cursor-pointer">
                  <FaCamera className="text-white text-2xl mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-white">Change Image</span>
              </div>
            )}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-semibold text-theme">
              <input
                type="text"
                name="username"
                value={user.username || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`bg-transparent ${
                  isEditing ? "border-b-2 border-theme-light" : ""
                }`}
              />
            </h1>
            <p className="text-lg text-theme-light">{user.email}</p>
            <p className="text-gray-600 mt-2">
              {user.followersCount} Followers | {user.followingCount} Following
            </p>
            <button
              onClick={handleFollowToggle}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        {/* Editable Details */}
        <div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={user.bio || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-theme text-white py-2 px-4 rounded-lg hover:bg-theme-light transition"
            >
              Edit Profile
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="bg-theme text-white py-2 px-4 rounded-lg hover:bg-theme-light transition"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Update Message */}
        {isUpdated && (
          <div className="text-green-600 mt-4 text-center">
            Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Profile;
