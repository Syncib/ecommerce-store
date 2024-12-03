import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <h1 className="navbrand">Saqib's Store</h1>
        <div className="navitems">
          <Link to="/" className="navitem">
            Home
          </Link>
          <a href="#" className="navitem">
            Collections
          </a>
          <a href="#" className="navitem">
            About
          </a>
          <a href="#" className="navitem">
            Contact
          </a>
        </div>
        <div className="misc">
          <div className="icons">
            <div>
              Welcome User
            </div>
            <FaSearch />
            <Link to={"/login"}>
              <FaUser />
            </Link>
            <FaShoppingCart />
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
        <a href="#" className="navitem">
          Collections
        </a>
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
