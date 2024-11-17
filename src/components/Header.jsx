import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-theme text-white h-20 fixed top-0 left-0 w-full z-50 shadow-lg flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-theme-light">
            MicroPost
          </Link>
        </h1>

        {/* SearchBar */}
        <div className="hidden md:block flex-grow max-w-md">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 items-center">
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
                to="/auth"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <LoginIcon /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <AccountCircleIcon /> Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile SearchBar */}
      <div className="block md:hidden absolute bottom-2 w-full px-4">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
