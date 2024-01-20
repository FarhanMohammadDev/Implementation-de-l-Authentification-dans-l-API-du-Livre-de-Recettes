const express =require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {User,validateRegisterUser,validateLoginUser} = require("../models/User")
const dotenv = require("dotenv");
dotenv.config();
/**
 * @desc Register new user  
 * @route /api/auth/register
 * @method POST
 * @access public
*/
// router.post("/register",userController.user_store_post)
router.post("/register",asyncHandler(async(req,res)=>{
    const {error} = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    let newUser = await User.findOne({email:req.body.email});
    if (newUser) {
        return res.status(400).json({message: "this user already registred"});
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt)
    newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    const result = await newUser.save();
    const token = jwt.sign({
        id: newUser._id,
         username:newUser.username,
         isAmin: newUser.isAdmin
        },process.env.JWT_SECRET_KEY,{
        expiresIn:"1h"
        // expiresIn:"1d"
        // expiresIn:"1m"
        }
    );

    const {password,  ...other} = result._doc;
    res.status(201).json({...other , token});
}))

/**
 * @desc Login user  
 * @route /api/auth/login
 * @method POST
 * @access public
*/
// router.post("/login",userController.user_store_post)
router.post("/login",asyncHandler(async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }

    let user = await User.findOne({email:req.body.email});
    if (!user) {
        return res.status(400).json({message: "Invalid Email Or Password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({message: "Invalid Email Or Password"});
    }

    const token = jwt.sign({
        id: user._id,
         username:user.username,
         isAmin: user.isAdmin
        },process.env.JWT_SECRET_KEY,{
        expiresIn:"1h"
        // expiresIn:"1d"
        // expiresIn:"1m"
        }
    );
    const {password,  ...other} = user._doc;
    res.status(200).json({...other , token});
}))

module.exports = router;