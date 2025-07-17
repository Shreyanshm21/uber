const axios = require("axios");
const { response } = require("express");
const captainModel = require("../models/captain.model")

module.exports.getAddressCoordinate = async (address) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${address}`,
            {
                params: {
                    format: "json",
                    limit: 5,
                },
            }
        );

        if (response.data || response.data.length !== 0) {
            const location = response.data[0];
            return {
                lat: location.lat,
                lng: location.lon,
            };
        } else {
            throw new Error("Unable to fetch co-ordinates");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and Destinations are requried");
    }

    const apiKey = process.env.DISTANCE_MATRIX_API;
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
                throw new Error("No routes Found");
            }

            return response.data.rows[0].elements[0];
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Query is Required");
    }

    const apiKey = process.env.AUTO_COMPLETE;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        input
    )}&format=json&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.status == 200){
            const formatedData = response.data.results.map((i)=>i.formatted);
            return formatedData;
        }
        else{
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};


module.exports.getCaptainsInTheRadius = async(lat,lng,radius)=>{

    try{
        const captains = await captainModel.find({
            location:{
                // provided by the mongoDb and the 6371km is the radius of the earth
                $geoWithin:{
                    $centerSphere:[[lat,lng],radius/6371]
                }
            }}
        )

        return captains;


    }catch(err){

    }
}