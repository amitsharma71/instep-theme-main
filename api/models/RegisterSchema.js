const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationOTP: {
    type: Number,
    required: true,
  },
  number: [
    {
      type: String,
      required: true,
    },
  ],
  Profileimage: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: String,
  role: {
    type: String,
  },
});
userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);

module.exports = User;
