const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route   GET /auth
// @desc   Get logged in user
// @access PRIVATE
router.get("/", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select("-password");
    response.json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ msg: "Server Error" });
  }
});

// @route   POST /auth
// @desc   Authenticate a user
// @access PUBLIC
router.post(
  "/",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { email, password } = request.body;

    try {
      // Attempt to find user
      let user = await User.findOne({ email });

      if (!user) return response.status(400).json({ msg: "Invalid email" });

      // Attempt to match passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return response.status(400).json({ msg: "Invalid password" });

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
      response.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
