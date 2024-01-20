const express =require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController")
/**
 * @desc Get all recipes
 * @route /api/recipes
 * @method GET
 * @access public
*/
  router.get("/",recipeController.recipe_index_get);
/**
 * @desc Get recipe by id
 * @route /api/recipes/:id
 * @method GET
 * @access public
*/
  router.get("/:id",recipeController.recipe_show_get);

  /**
 * @desc post the recipe 
 * @route /api/recipes
 * @method POST
 * @access public
*/
  router.post("/",recipeController.recipe_store_post)
  
/**
 * @desc Update a recipe 
 * @route /api/recipes/:id
 * @method PUT
 * @access public
*/
  router.put("/:id",recipeController.recipe_update_put)
  
/**
 * @desc Delete a recipe 
 * @route /api/recipes/:id
 * @method DELETE
 * @access public
*/
  router.delete("/:id",recipeController.recipe_destroy_delete)

module.exports = router;
