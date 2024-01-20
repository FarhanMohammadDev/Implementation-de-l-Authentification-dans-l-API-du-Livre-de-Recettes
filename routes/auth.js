// authRoute.js

const express =require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User,validateRegisterUser,validateLoginUser} = require("../models/User")
const dotenv = require("dotenv");
dotenv.config();
/**
 * @desc Register new user  
 * @route /api/auth/register
 * @method POST
 * @access public
*/
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user (public)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *           example:
 *             email: user@example.com
 *             username: newUser
 *             password: newPassword
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: user_id
 *               email: user@example.com
 *               username: newUser
 *               token: eyJhbGciOiJIUzI1NiIsIn...
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Email is required"
 *       '409':
 *         description: Conflict - User already registered
 *         content:
 *           application/json:
 *             example:
 *               message: "This user already registered"
 *       '500':
 *         description: Internal server error
 */

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
    })
    const result = await newUser.save();
    const token = jwt.sign({
        id: newUser._id,
         username:newUser.username,
         isAdmin: newUser.isAdmin
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login an existing user (public)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: user@example.com
 *             password: userPassword
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               id: user_id
 *               email: user@example.com
 *               username: existingUser
 *               token: eyJhbGciOiJIUzI1NiIsIn...
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Email is required"
 *       '401':
 *         description: Unauthorized - Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid Email Or Password"
 *       '500':
 *         description: Internal server error
 */

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
         isAdmin: user.isAdmin
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