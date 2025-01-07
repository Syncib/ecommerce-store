import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaBars } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useCollectionContext } from "../hooks/useCollectionsContext";
import { useLogout } from "../hooks/useLogout";
import "./Navbar.css";
const Navbar = () => {
  const { user, isLoading } = useUserContext();
  const { cart } = useCollectionContext();

  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  if (isLoading) {
    return <nav>Loading...</nav>;
  }

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
              Welcome {user ? user.username : "guest"}
            </div>
            <FaSearch />
            <div className="itemsincart">
              <Link to={"/cart"}>
                <FaShoppingCart />
                <div className={cart.length == 0 && "nocart"}>{cart.length}</div>
              </Link>
            </div>
            <Link to={user ? "/account" : "/login"}>
              <FaUser />
            </Link>
            {user?.role === "admin" && (
              <Link to={"/dashboard"}>
                <AiOutlineDashboard size={"18px"} />
              </Link>
            )}

            {user && (
              <div
                role="button"
                onClick={() => {
                  logout();
                }}
              >
                <TbLogout size={"18px"} />
              </div>
            )}
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
        {!user && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
