import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <header className="bg-theme text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-theme-light">
            MicroPost
          </Link>
        </h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-16 items-center">
            <li>
              <Link
                to="/"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <HomeIcon /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <LoginIcon /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/profile/1"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <AccountCircleIcon /> Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
