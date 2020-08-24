import React, { useContext } from "react";
import { Formik, useField, Form } from "formik";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../context/auth/AuthState";

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

const Register = () => {
  // Authentication context for registering new user function
  const authContext = useContext(AuthContext);

  const { register, error } = authContext;

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
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              password2: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(4, "Must be at least 4 characters.")
                .max(15)
                .required("A username is required"),
              email: Yup.string()
                .email("Invalid email address.")
                .required("An email is required."),
              password: Yup.string().required("A password is required."),
              password2: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
            onSubmit={(submissionData, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(true);
                register(submissionData);
              }, 3000);
            }}
          >
            {(props) => (
              <Form>
                <MyInput
                  label="Username: "
                  name="username"
                  type="text"
                  placeholder="Pick a username"
                />
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
                <MyInput
                  label="Confirm password: "
                  name="password2"
                  type="password"
                  placeholder="Make sure it's the same password"
                />
                <button className="btn" type="submit">
                  {props.isSubmitting ? (
                    <ClipLoader size={16} color={"color"} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>
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
