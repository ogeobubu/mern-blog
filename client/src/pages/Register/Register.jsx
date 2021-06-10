import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Error from "../Validation/Error/Error";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/create", {
        username,
        email,
        number,
        password,
        invite,
      });
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
      return setError(
        "Something went wrong! Try again later or check if your details are correct."
      );
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        {error && Error(error)}
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email address..."
          onChange={(e) => {
            return setEmail(e.target.value);
          }}
        />
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => {
            return setUsername(e.target.value);
          }}
        />
        <label>Phone Number</label>
        <input
          className="registerInput"
          type="number"
          placeholder="Enter your phone number..."
          onChange={(e) => {
            return setNumber(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            return setPassword(e.target.value);
          }}
        />
        <label>How did you get to know about MERN Blog? (Optional)</label>
        <input
          className="registerInput"
          type="text"
          onChange={(e) => {
            return setInvite(e.target.value);
          }}
        />
        <button className="registerButton" type="submit">
          Submit
        </button>
      </form>
      <p>Already have an account?</p>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
