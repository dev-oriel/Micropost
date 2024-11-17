import { useParams } from "react-router-dom";
import { users } from "../constants"; 
import FollowButton from "./FollowButton";

const ProfileCard = () => {
  const { userId } = useParams();
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) {
    return <p>User not found</p>; 
  }

  return (
    <div className="min-h-screen mt-16 flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Profile Image */}
        <div
          className="w-full h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.profileImage})` }}
        >
          <div className="absolute bottom-4 right-4">
            <FollowButton />
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-lg text-gray-700 mb-6">{user.bio}</p>

          {/* Contact Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 2.5A.5.5 0 012.5 2h15a.5.5 0 01.5.5v15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V2.5zM3 3v14h14V3H3z" />
              </svg>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 2a7 7 0 1114 0 7 7 0 01-14 0z" />
              </svg>
              <span>{user.phone}</span>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            <p className="text-sm text-gray-600">{user.address}</p>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex space-x-6">
            <a
              href={user.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3.7C23 3.3 22.7 3 22.3 3h-3.6c-.2 0-.4.1-.4.3v3.6h-2.5c-.2 0-.3.2-.3.4v2.6c0 .2.1.4.3.4h2.6v6.8c0 .2.1.3.3.3h2.6c.2 0 .4-.1.4-.3V9.7h3.6c.2 0 .3-.2.3-.4V7.1c0-.2-.1-.4-.3-.4h-3.6V3.7zM12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 18.6c4.8 0 8.7-3.9 8.7-8.7S16.8 3.1 12 3.1 3.3 7 3.3 12s3.9 8.6 8.7 8.6z" />
              </svg>
            </a>
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.6 10.6 0 01-3.1.9A4.5 4.5 0 0022.4.9a9.5 9.5 0 01-3.1 1.2A4.5 4.5 0 0016.8 1c-2.5 0-4.5 2-4.5 4.5 0 .4.1.7.2 1-3.7-.2-7-2-9.2-4.7-.4.7-.7 1.5-.7 2.4 0 1.7.9 3.2 2.3 4.1-1-.1-2-.3-2.9-.7 0 0 0 0 0 0 .3 1 1 1.9 2.2 2.4-1.3.2-2.7.3-4 .1 1.2 3 4.5 5.2 8.4 5.2a9.5 9.5 0 0010-10v-.4c.7-.5 1.3-1.1 1.7-1.8A9.3 9.3 0 0023 3z" />
              </svg>
            </a>
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.7 16.2h-2v-6h2v6zM8.7 9.5c-.7 0-1.2-.6-1.2-1.2s.5-1.2 1.2-1.2c.7 0 1.2.6 1.2 1.2s-.5 1.2-1.2 1.2zm7.4 6.7h-2v-3.3c0-.8-.3-1.4-.8-1.8-.4-.4-.9-.6-1.4-.6-.9 0-1.5.4-1.9 1.1-.4.7-.6 1.6-.6 2.5v3.3h-2v-6h2v.8h.1c.3-.4.9-.7 1.4-.7 1.2 0 2.1.9 2.1 2.3v3.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
