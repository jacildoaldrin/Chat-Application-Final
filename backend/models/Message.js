const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sender: String,
    message: String,
    room: String,
    type: String,
    date: Date
  },
  {
      collection: 'messages'
  }
);


module.exports = mongoose.model('Message', messageSchema);