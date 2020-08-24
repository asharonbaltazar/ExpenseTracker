import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthState";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Custom input
const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <small>{meta.error}</small> : null}
    </>
  );
};

const Login = () => {
  // Authentication context for logging in  user function
  const authContext = useContext(AuthContext);

  const { login, error } = authContext;

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
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              password2: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address.")
                .required("An email is required."),
              password: Yup.string().required("A password is required."),
            })}
            onSubmit={(submissionData, { setSubmitting }) => {
              login(submissionData);
            }}
          >
            {(props) => (
              <Form>
                <MyInput
                  label="Email: "
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                />
                <MyInput
                  label="Password: "
                  name="password"
                  type="password"
                  placeholder="Enter a unique password"
                />
                <button className="btn">Submit</button>
              </Form>
            )}
          </Formik>
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
