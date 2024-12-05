import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="formarealog">
      <form onSubmit={handleSubmit} className="myform">
        <h1>Login</h1>
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
        <button type="submit" className="regbutton" disabled={isLoading}>
          Login
        </button>
        {error && <div>Error Logging in</div>}
      </form>
      <div className="newcus">
        <h1 className="newreg">New Customer?</h1>
        <p className="alreadyreg">
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out, click unsubscribe in our emails.
        </p>
        <button className="regbutton">
          <Link to={"/register"}>Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
