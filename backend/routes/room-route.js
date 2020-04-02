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

//update room status
router.route('/room-status-update/:id').put((req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        //console.log(error)
      } else {
        console.log('User successfully updated!')
        //log event
        res.json(data)
      }
    })
  })

module.exports = router;