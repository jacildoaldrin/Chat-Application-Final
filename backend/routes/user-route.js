const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get User
router.route('/login').post((req, res) => {
    User.find({ username: req.body.username, password: req.body.password}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            let payload = {
                name: data.username
              }
            //let token = jwt.sign(payload, 'mySecret');
            //data.token = token;
            //res.status(200).send({token});
            res.json(data);
            //console.log(data);
        }
    });
});

module.exports = router;