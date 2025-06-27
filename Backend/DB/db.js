const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
    } catch (err) {
        console.log("ERROR : " + err);
    }
};

module.exports = connectToDb;
