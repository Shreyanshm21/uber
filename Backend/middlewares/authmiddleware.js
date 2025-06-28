const userModel = require("../models/user.model")
const blackListModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const isBlackListed = await blackListModel.findOne({token : token});

        if(isBlackListed){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const user= await userModel.findById(decoded._id);

        req.user = user;
        return next(); 


    } catch (error) {
        res.status(400).send("ERROR "+error.message)
    }
};
