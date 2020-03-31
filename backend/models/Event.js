const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    user: String,
    room: String,
    type: String,
    description: String,
    date: Date
},
{
    collection: 'events'
});

module.exports = mongoose.model('Event', eventSchema);