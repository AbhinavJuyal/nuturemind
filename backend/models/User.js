const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "You need to set a password."],
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name."],
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
    face: {
      type: Schema.Types.Mixed,
      required: false,
      default: "",
    },
    answers: {
      type: [Number],
      required: false,
      validate: [(val) => val.length <= 21, "{PATH} exceeds the limit of 21"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  // hash password if it's new or modified.
  if (!user.isModified()) return next();

  // generate salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) throw new Error(err);
    // hash the password with new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) throw new Error(err);
      // saving hash as the password
      user.password = hash;
      next();
    });
  });
});

//compare password
userSchema.statics.comparePassword = function (
  candidatePassword,
  dbPassword,
  cb
) {
  // console.log(this);
  console.log("checking password...");
  bcrypt.compare(candidatePassword, dbPassword, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
