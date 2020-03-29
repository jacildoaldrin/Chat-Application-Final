const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
  },
  {
    collection: "users"
  }
);

module.exports = mongoose.model("User", userSchema);
