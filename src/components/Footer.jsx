import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-grid">
      <div>
        <h1>Saqib's Store</h1>
        <div className="footer-icons">
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
      <div>
        <h3>Information</h3>
        <p>Over a Century of Distinctive Legacy</p>
        <p>Our Team</p>
        <p>Products Upkeep</p>
        <p>Sustainable Business</p>
        <p>Custome Testimonials</p>
        <p>Blog</p>
        <p>Careers</p>
      </div>
      <div>
        <h3>Location</h3>
        <p>Karachi</p>
        <p>Lahore</p>
        <p>Islamabad</p>
        <p>Faisalabad</p>
        <p>Peshawar</p>
        <p>Multan</p>
        <p>Sialkot</p>
        <p>UAE</p>
      </div>
      <div>
        <h3>Customer Support</h3>
        <p>My Account</p>
        <p>FAQs</p>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
        <p>Write To Us</p>
      </div>
    </div>
  );
};

export default Footer;
