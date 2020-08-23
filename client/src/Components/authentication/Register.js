import React, { useState } from "react";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="auth-pages">
      <div className="container">
        <div className="auth-welcome">
          <h1 className="bold-title">Expense Tracker</h1>
          <h2>First things first. Let's sign you up.</h2>
        </div>
        <div className="auth-form">
          <form>
            <label>Username: </label>
            <input type="text" placeholder="Pick a unique username"></input>
            <label>Email address: </label>
            <input type="email" placeholder="Enter your email"></input>
            <label>Password: </label>
            <input
              type="password"
              placeholder="Enter a unique password"
            ></input>
            <label>Confirm password: </label>
            <input
              type="password"
              placeholder="Make sure it's the same password"
            ></input>
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

export default Register;
