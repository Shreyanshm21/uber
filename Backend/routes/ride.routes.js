const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const { route } = require('./maps.routes');
const rideControl = require('../controller/ride.controller');
const authMiddleware = require("../middlewares/authmiddleware");

router.post('/create',authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Vehicle Type'),
    rideControl.createRide
)

router.get('/get-fare',authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid Destination'),
    
    
    rideControl.getFare)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideControl.confirmRide
)

module.exports = router;