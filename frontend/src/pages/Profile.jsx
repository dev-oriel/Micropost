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
        setUser({
          ...data,
          bio: data.bio || "", // Default to empty string if not set
          phone: data.phone || "", // Default to empty string if not set
          profileImage: data.profilePicture || placeholderImage, // Use placeholder if no image
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [contextUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

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
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: imageUrl,
      }));

      // Uncomment this to upload the image to the server
      // const formData = new FormData();
      // formData.append("profileImage", file);
      // await fetch(`http://localhost:5000/api/user/${contextUser.id}/upload`, {
      //   method: "POST",
      //   body: formData,
      // });
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
      <div className="max-w-4xl mx-auto bg-white shadow-3xl rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <div
            className="relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <img
              src={user.profileImage || placeholderImage}
              alt={user.name}
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
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`bg-transparent ${
                  isEditing ? "border-b-2 border-theme-light" : ""
                }`}
              />
            </h1>
            <p className="text-lg text-theme-light">{user.username}</p>
            <p className="text-gray-600 mt-2">{user.followers} Followers</p>
          </div>
        </div>
        {/* Rest of the UI remains unchanged */}
      </div>
    </div>
  );
};

export default Profile;
