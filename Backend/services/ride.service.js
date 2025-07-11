const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {

        throw new Error("Pickup and destinations are required");
    }

    const distanceTime = await mapService.getDistanceAndTime(
        pickup,
        destination
    );

    // Example fare calculation logic
    const baseFare = {
        auto: 10,
        car: 20,
        moto: 15,
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8,
    };
    const perMinRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
    };

    // Calculate fares for each vehicle type
    const fare = {
        auto:
            (baseFare.auto +
            (distanceTime.distance.value / 1000) * perKmRate.auto +
            (distanceTime.duration.value / 60) * perMinRate.auto).toFixed(2),
        car:
            (baseFare.car +
            (distanceTime.distance.value / 1000) * perKmRate.car +
            (distanceTime.duration.value / 60) * perMinRate.car).toFixed(2),
        moto:
            (baseFare.moto +
            (distanceTime.distance.value / 1000) * perKmRate.moto +
            (distanceTime.duration.value / 60) * perMinRate.moto).toFixed(2),
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType,
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);


    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    return ride;
};
