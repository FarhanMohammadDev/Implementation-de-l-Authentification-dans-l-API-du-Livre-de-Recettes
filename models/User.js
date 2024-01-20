const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * @desc function validate Register User
 * @access public
 * 
 */
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    username: Joi.string().trim().alphanum().min(3).max(200).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
    isAdmin: Joi.bool(),
  });

  return schema.validate(obj);
}

/**
 * @desc function validate Update User
 * @access public
 */
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    username: Joi.string().trim().alphanum().min(3).max(200).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
    isAdmin: Joi.bool(),
  });

  return schema.validate(obj);
}

/**
 * @desc function validate Login user
 * @access public
 */
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
  });

  return schema.validate(obj);
}
const User = mongoose.model("User", UserSchema);
module.exports = {
  User,
  validateRegisterUser,
  validateUpdateUser,
  validateLoginUser,
};
