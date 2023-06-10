const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/User");

// route middleware
const auth = require("../middlewares/auth");

// Sign-up route
router.use(auth);
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = res.locals.user.id;
    const user = await User.findById(userId).select(
      "-updatedAt -createdAt -password -__v"
    );
    if (!user) {
      throw new Error("User not found");
      return;
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        step: user.step,
        face: user.face,
        answers: user.answers,
      },
    });
  })
);

module.exports = router;
