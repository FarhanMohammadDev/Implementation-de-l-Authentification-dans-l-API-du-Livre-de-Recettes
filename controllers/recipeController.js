const asyncHandler = require('express-async-handler')
// npm i joi 
const {Recipe,validateCreateRecipe, validateUpdateRecipe} = require("../models/Recipe");

/**
 * @desc Get all recipes
 * @route /api/recipes
 * @method GET
 * @access public
*/
const recipe_index_get = asyncHandler(async (req, res) => {
    const recipesList = await Recipe.find();
    res.status(200).json(recipesList);
})

/**
 * @desc Get recipe by id
 * @route /api/recipes/:id
 * @method GET
 * @access public
*/
const recipe_show_get = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe)
    } else {
      res.status(404).json({message:"recipe not found"})
    }
})

/**
 * @desc post the recipe 
 * @route /api/recipes
 * @method POST
 * @access public
*/
const recipe_store_post = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {error} = validateCreateRecipe(req.body);
    if (error) {
     return res.status(400).json({message : error.details[0].message})
    }
    const recipe = new Recipe( {
      title: req.body.title,
      category: req.body.category,
      author:req.body.author,
      origin: req.body.origin,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      image: req.body.image
    });
      
    const result = await recipe.save();
    res.status(201).json(result);
})

/**
 * @desc Update a recipe 
 * @route /api/recipes/:id
 * @method PUT
 * @access public
*/
const recipe_update_put = asyncHandler(async (req,res)=>{
    const {error} = validateUpdateRecipe(req.body);
    if (error) {
      return res.status(400).json({message : error.details[0].message})
    } 
    
    const recipe = await Recipe.findByIdAndUpdate(req.params.id,{
      $set:{
          title:req.body.title,
          category: req.body.category,
          author: req.body.author,
          origin: req.body.origin,
          ingredients: req.body.ingredients,
          steps:req.body.steps,
          image: req.body.image
      }
    },{new:true})
    res.status(200).json(recipe)
    
})

/**
 * @desc Delete a recipe 
 * @route /api/recipes/:id
 * @method DELETE
 * @access public
*/
const recipe_destroy_delete =asyncHandler(async (req,res)=>{
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      await Recipe.findByIdAndDelete(req.params.id)
      return res.status(200).json({message:"recipe has been deleted successfuly "})
    } else {
      res.status(404).json({message:"recipe not found"})
    }
})

module.exports = {
    recipe_index_get,
    recipe_store_post,
    recipe_show_get,
    recipe_update_put,
    recipe_destroy_delete
};