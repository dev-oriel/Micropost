import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../context/UserContext"; // Correctly importing the custom hook

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser(); // Use the context hook to access user and logout function
  const navigate = useNavigate();
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenuOnOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", closeMenuOnOutsideClick);
    } else {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/auth"); // Redirect to login page after logout
  };

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

        {/* Navigation (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link
                to="/"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <HomeIcon /> Home
              </Link>
            </li>
            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                >
                  <LogoutIcon /> Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                >
                  <LoginIcon /> Login
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/profile"
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
              >
                <AccountCircleIcon />
                {user ? `${user.name || user.username || "User"}` : "Profile"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <MenuIcon className="text-white text-3xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hamburger) */}
      {isMenuOpen && (
        <div
          className="absolute top-0 left-0 w-full bg-theme text-white z-40 shadow-lg md:hidden"
          ref={menuRef}
        >
          <div className="container mx-auto flex justify-between items-center p-6">
            <h1 className="text-xl font-extrabold tracking-wide">
              <Link to="/" className="hover:text-theme-light">
                MicroPost
              </Link>
            </h1>
            <button onClick={toggleMenu}>
              <CloseIcon className="text-white text-3xl" />
            </button>
          </div>

          <nav className="px-6 py-4">
            <ul className="space-y-4 text-center">
              <li>
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                >
                  <HomeIcon /> Home
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                  >
                    <LogoutIcon /> Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/auth"
                    onClick={toggleMenu}
                    className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                  >
                    <LoginIcon /> Login
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-theme-light transition-colors duration-200"
                >
                  <AccountCircleIcon />
                  {user ? `${user.name || user.username || "User"}` : "Profile"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile SearchBar */}
      <div className="block md:hidden absolute w-full px-4">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
