const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    room: String,
    event: String,
    timestamp: Date
},
{
    collection: 'logs'
});

module.exports = mongoose.model('Log', logSchema);