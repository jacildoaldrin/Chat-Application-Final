const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Records an event
router.route('/create-event').post((req, res, next) => {
    Event.create(req.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

// Get All Events
router.route('/event-history').get((req, res) => {
    Event.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;