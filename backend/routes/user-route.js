const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get User
router.route('/login').post((req, res) => {
    User.find({ username: req.body.username, password: req.body.password}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;