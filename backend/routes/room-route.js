const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create Room
router.route('/create-room').post((req, res, next) => {
    Room.create(req.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

// Get All Rooms
router.route('/room-list').get((req, res) => {
    Room.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

//getMessageBasedRoom
router.route('/room-history').post((req, res) => {
    Message.find({ room: req.body.roomname }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data)
        }
    });
});

module.exports = router;