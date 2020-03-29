const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get User
router.route('/login').post((req, res) => {
    User.find({ username: req.body.username}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data)
        }
    });
});

module.exports = router;