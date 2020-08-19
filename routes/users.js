const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// @route   POST /users
// @ desc   Register a user
// @ access PUBLIC
router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Email is required.").isEmail(),
    check(
      "password",
      "Password of six or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { name, email, password } = request.body;

    try {
      let user = await User.findOne({ email });

      // Deny request if user exists
      if (user)
        return response.status(400).json({ msg: "User already exists." });

      // Create new user
      user = new User({
        name,
        email,
        password,
      });

      // Create a hash for the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Responding with a json web token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
