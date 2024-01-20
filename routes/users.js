// usersRoute.js

const express =require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const {User,validateUpdateUser} = require("../models/User")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken")


/**
 * @desc Get all Users 
 * @route /api/users
 * @method GET
 * @access private (only admin)
*/
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users (private, only for admins)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: user1_id
 *                 username: user1
 *                 email: user1@example.com
 *               - id: user2_id
 *                 username: user2
 *                 email: user2@example.com
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Admin access required"
 *       '500':
 *         description: Internal server error
 */

router.get("/",verifyTokenAndAdmin, asyncHandler(async(req,res)=>{
  const users = await User.find().select("-password")
  res.status(200).json(users);
}))


/**
 * @desc Get User by id 
 * @route /api/users/:id
 * @method GET
 * @access private (only user himself & admin)
*/
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Get details of a specific user by their ID (private, only for the user himself and admins)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: user_id
 *               username: user1
 *               email: user1@example.com
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Access denied"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *       '500':
 *         description: Internal server error
 */

router.get("/:id",verifyTokenAndAuthorization, asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id).select("-password");
  if(user){
    res.status(200).json(user);
  }else{
    res.status(404).json({message : "user not found"});
  }
}))

/**
 * @desc Delete User 
 * @route /api/users/:id
 * @method DELETE
 * @access private (only user himself & admin)
*/
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID (private, only for the user himself and admins)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User has been deleted successfully"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Access denied"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id",verifyTokenAndAuthorization, asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id).select("-password");
  if(user){
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "user has been deleted successfully"});
  }else{
    res.status(404).json({message : "user not found"});
  }
}))

/**
 * @desc update the User 
 * @route /api/users/:id
 * @method PUT
 * @access private
*/
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update a user by their ID (private)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
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
 *               username:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *           example:
 *             email: updateduser@example.com
 *             password: newPassword
 *             username: UpdatedUser
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: user_id
 *               email: updateduser@example.com
 *               username: UpdatedUser
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Email is required"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Access denied"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *       '500':
 *         description: Internal server error
 */

router.put("/:id",verifyTokenAndAuthorization, asyncHandler(async(req,res)=>{
    const {error} = validateUpdateUser(req.body);

    if(error){
      return res.status(400).json({message:error.details[0].message});
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password,salt)
    }
    console.log(req.headers);
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
      $set :{
        email : req.body.email,
        password : req.body.password,
        username: req.body.username
      }
    }, {new : true}).select("-password").exec();
    res.status(200).json(updateUser);
    // updateUser ? res.status(200).json(updateUser) : res.status(404).json('user not found');
}))

module.exports = router;