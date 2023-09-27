const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  number:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
userSchema.set("timestamps", true);

const User = mongoose.model("user", userSchema);

module.exports = User;
