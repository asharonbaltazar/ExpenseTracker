import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthState";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  // Authentication context for logging in  user function
  const authContext = useContext(AuthContext);

  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  // On change handler
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // On submit handler
  const onSubmit = () => {};

  return (
    <div className="auth-pages">
      <div className="container">
        <div className="upper-titles">
          <h1 className="bold-title">Expense Tracker</h1>
          <h5>Keep tabs on your expenses from the web.</h5>
        </div>
        <div className="auth-welcome">
          <h2>Welcome back. Let's get you signed in.</h2>
        </div>
        <div className="auth-form">
          <form onSubmit={onSubmit}>
            <label>Email address: </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small>{}</small>
            <label>Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="email"
              value={password}
              onChange={onChange}
            />
            <motion.button
              className="btn"
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </form>
          <div className="bottom-text">
            <h5>Don't have an account?</h5>
            <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
