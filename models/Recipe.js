const mongoose = require("mongoose");
const Joi = require('joi');


const RecipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    } ,
    category: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    },
    author:{
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    } ,
    origin: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    },
    ingredients: {
        type: Array,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    },
    steps: {
        type: Array,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 200
    },
    image:{
        type: String,
        default: "default-image.png",
        trim: true,
        minlength:3,
        maxlength: 200
    }
},{timestamps:true});

/**
 * @desc function validate Create Recipe
 * @access public
 */
function validateCreateRecipe(obj){
    const schema = Joi.object({
        title: Joi.string().trim().alphanum().min(3).max(200).required(),
        category: Joi.string().trim().alphanum().min(3).max(200).required(),
        author: Joi.string().trim().alphanum().min(3).max(200).required(),
        origin: Joi.string().trim().alphanum().min(3).max(200).required(),
        ingredients: Joi.array().items(Joi.string()).min(1).required(),
        steps: Joi.array().items(Joi.string()).min(1).required(),
        image: Joi.string(),
      })
    
      return schema.validate(obj)
  }

  /**
 * @desc function validate Update Recipe
 * @access public
 */
  function validateUpdateRecipe(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        category: Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(3).max(200),
        origin: Joi.string().trim().min(3).max(200),
        ingredients: Joi.array().items(Joi.string()).min(1),
        steps: Joi.array().items(Joi.string()).min(1),
        image: Joi.string(),
    
      })
    
      return schema.validate(obj)
  }

const Recipe = mongoose.model("Recipe" , RecipeSchema);
module.exports = {
    Recipe , validateCreateRecipe ,validateUpdateRecipe
}