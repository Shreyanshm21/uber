const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { route } = require('./maps.routes');
const rideControl = require('../controller/ride.controller');
const authMiddleware = require("../middlewares/authmiddleware");

router.post('/create',authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Vehicle Type'),
    rideControl.createRide
)


module.exports = router;