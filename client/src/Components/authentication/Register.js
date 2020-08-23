import React, { useState, useContext } from "react";
import formValidator from "../../utils/formValidator";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthState";

const Register = () => {
  // Authentication context for registering new user function
  const authContext = useContext(AuthContext);

  // Form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = form;
  // Form errors state and styles
  const [formErrors, setFormErrors] = useState({});
  const inputBorder = { border: "1px red solid" };

  // On change handler
  const onChange = (e) => {
    console.log(e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          <h2>First things first. Let's sign you up.</h2>
        </div>
        <div className="auth-form">
          <form onSubmit={onSubmit}>
            <label>Username: </label>
            <input
              type="text"
              placeholder="Pick a unique username"
              name="username"
              value={username}
              onChange={onChange}
            />
            <small>{formErrors["username"]}</small>
            <label>Email address: </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small>{formErrors["email"]}</small>
            <label>Password: </label>
            <input
              type="password"
              placeholder="Enter a unique password"
              value={password}
              onChange={onChange}
            />
            <small>{formErrors["password"]}</small>
            <label>Confirm password: </label>
            <input
              type="password"
              placeholder="Make sure it's the same password"
              value={password2}
              onChange={onChange}
            />
            <small>{formErrors["password2"]}</small>
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
            <h5>Already registered?</h5>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
