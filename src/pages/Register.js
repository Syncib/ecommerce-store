import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="formarea">
      <form onSubmit={handleSubmit} className="myform">
        <h1>Register</h1>
        <input
          type="text"
          className="geninput"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
        <input
          type="email"
          className="geninput"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="geninput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="regbutton">
          Register
        </button>
        <button className="loginbutton">
          <Link to="/login">Login</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
