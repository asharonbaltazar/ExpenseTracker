import React from "react";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="auth-pages">
      <div className="container">
        <div className="auth-welcome">
          <h1 className="bold-title">Expense Tracker</h1>
          <h2>Welcome back. Let's get you signed in.</h2>
        </div>
        <div className="auth-form">
          <form>
            <label>Email address: </label>
            <input type="email" placeholder="Enter your email"></input>
            <label>Password: </label>
            <input type="password" placeholder="Enter your password"></input>
            <motion.button
              className="btn"
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
