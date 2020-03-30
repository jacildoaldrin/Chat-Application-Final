const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    roomname: String,
    created: Date,
    edited: Date,
    status: String
  },
  {
    collection: 'rooms'
  }
);

module.exports = mongoose.model("Room", roomSchema);
