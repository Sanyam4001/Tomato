import React, { useState } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";
import { signup, login } from "../../Context/api"; // Import signup and login API functions

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (currState === "Sign Up") {
        // Call signup API
        const response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert(response.message || "Signup successful!");
      } else {
        // Call login API
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        alert(response.message || "Login successful!");
        localStorage.setItem("token", response.token); // Save JWT token to localStorage
      }
      setShowLogin(false); // Close popup on success
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="login-popup-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : currState === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>
        <div className="login-popup-checkbox">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms and conditions and privacy
            policy
          </p>
        </div>
        <div>
          {currState === "Login" ? (
            <p>
              Create a new account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
