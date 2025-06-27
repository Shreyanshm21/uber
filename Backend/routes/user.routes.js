const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user.controller");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage("FirstName Must be atleast 3 characters long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be atleast 6 charcters long"),
    ],
    userController.registerUser
);

module.exports = router;
