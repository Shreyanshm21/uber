const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    try {
        //routes pai validation lagaye thai , woh sirf waha check kar raha h
        //agr kuch galat hotha h toh yaha action perform karengai

        const errors = validationResult(req); // agr kuch bhi galat hoga toh req mai aajayega

        if (!errors.isEmpty()) {
            //error will be present in errors.array
            return res.status(400).json({ errors: errors.array() });
        }


        const { fullname, email, password } = req.body;

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });


        const token = await user.generateAuthToken();

        res.status(201).json({token,user})

        // create a logic to create to user
    } catch (error) {
        res.status(400).send("ERROR "+error.message)
    }
};

module.exports.loginUser = async(req,res,next) =>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:"Invalid email or password"})
    }
    
    const isMatch = await user.comparePassword(password);
    
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token)

    res.status(200).json({token,user});

    } catch (error) {
        res.status(400).send("ERROR "+error.message)
    }
}

module.exports.getUserProfile = async (req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        await blackListTokenModel.create({token});
        res.clearCookie('token');

        res.status(200).json({message : "Logged out"})

    }
    catch(error){
        res.status(400).send("ERROR "+error.message)
    }

    
}
