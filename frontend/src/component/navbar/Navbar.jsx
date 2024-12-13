import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { assets } from "../../assets/assets.js";
import "./Navbar.css";

const Navbar = ({ setShowLogin, user, setUser }) => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-profile")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />

        {/* Cart Icon Logic */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Dynamic User Auth UI */}
        {!user ? (
          <button className="navbar-button" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div
            className="user-profile"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={assets.user_icon} alt="user icon" />
            {showDropdown && (
              <div className="dropdown-menu">
                <p>Hello, {user.name}</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
