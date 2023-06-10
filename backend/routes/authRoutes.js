const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { generateJWT } = require("../utils/jwt");
const User = require("../models/User");

// Sign-up route
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password, fullName });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  })
);

// Sign-in route
router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check the password
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (!isMatch || err) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const jwtPayload = {
        email: user.email,
        fullName: user.fullName,
        id: user._id,
        step: user.step,
        face: user.face,
        answers: user.answers,
      };

      const token = generateJWT(jwtPayload);

      res.cookie("jwt", token, {
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login Successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          step: user.step,
          face: user.face,
          answers: user.answers,
        },
      });
    });
  })
);

// Sign Out Route
router.get(
  "/signout",
  asyncHandler(async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Signout successful" });
  })
);

module.exports = router;
