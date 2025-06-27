const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

//writing the logic

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
