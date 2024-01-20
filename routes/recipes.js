const express =require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")

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
 * @access private (only admin) 
*/
  router.post("/",verifyTokenAndAdmin,recipeController.recipe_store_post)
  
/**
 * @desc Update a recipe 
 * @route /api/recipes/:id
 * @method PUT
 * @access private (only admin)
*/
  router.put("/:id",verifyTokenAndAdmin,recipeController.recipe_update_put)
  
/**
 * @desc Delete a recipe 
 * @route /api/recipes/:id
 * @method DELETE
 * @access private (only admin)
*/
  router.delete("/:id",verifyTokenAndAdmin,recipeController.recipe_destroy_delete)

module.exports = router;
