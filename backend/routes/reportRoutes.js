const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const auth = require("../middlewares/auth");

// Apply the auth middleware to all routes in this router
router.use(auth);

// Handle the POST request for the specified ID
router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { result, type } = req.body;
    const userData = res.locals.user;
    console.log(userData, "userData");
    const dbResponse = await User.findByIdAndUpdate(
      id,
      { [type]: result, step: userData.step + 1 },
      { new: true }
    );

    if (!dbResponse) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User udpated successfully",
      user: {
        email: dbResponse.email,
        fullName: dbResponse.fullName,
        id: dbResponse._id,
        step: dbResponse.step,
        face: dbResponse.face,
        answers: dbResponse.answers,
      },
    });
  })
);

module.exports = router;
