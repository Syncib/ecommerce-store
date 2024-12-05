import React, { useState } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";
import "./Navbar.css";
const Navbar = () => {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1 className="navbrand">Saqib's Store</h1>
        </Link>
        <div className="navitems">
          <Link to="/" className="navitem">
            Home
          </Link>
          <Link to="/collections" className="navitem">
            Collections
          </Link>
          <a href="#" className="navitem">
            About
          </a>
          <a href="#" className="navitem">
            Contact
          </a>
        </div>
        <div className="misc">
          <div className="icons">
            <div className="welcuser">
              Welcome {user ? user.existingUser.username : "guest"}
            </div>
            <FaSearch />
            <FaShoppingCart />
            <Link to={user?"/account":"/login"}>
              <FaUser />
            </Link>
            <div
              role="button"
              onClick={() => {
                logout();
              }}
            >
              <FaGear />
            </div>
          </div>
          <div
            className="hamburger"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <FaBars />
          </div>
        </div>
      </nav>
      <div className={`menuitems ${isOpen ? "" : "closed"}`}>
        <div
          className="close-btn"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          ✖
        </div>
        <Link to="/" className="navitem">
          Home
        </Link>
        <Link to="/collections" className="navitem">
          Collections
        </Link>
        <a href="#" className="navitem">
          About
        </a>
        <a href="#" className="navitem">
          Contact
        </a>
        <button
          className="logbutton"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link to="/register">Register</Link>
        </button>
        <button
          className="logbutton"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link to="/login">Login</Link>
        </button>
      </div>
    </>
  );
};

export default Navbar;
