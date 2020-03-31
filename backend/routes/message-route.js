const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Add Message
router.route('/create-message').post((req, res, next) => {
    Message.create(req.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

// Get All Messages
router.route('/message-history').get((req, res) => {
    Message.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

//getMessageBasedRoom
router.route('/roomhistory').post((req, res) => {
    Message.find({ room: req.body.roomname }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data)
        }
    });
});

module.exports = router;