const express =require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const {User,validateUpdateUser} = require("../models/User")
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken")

  /**
 * @desc post the recipe 
 * @route /api/users/:id
 * @method PUT
 * @access private
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