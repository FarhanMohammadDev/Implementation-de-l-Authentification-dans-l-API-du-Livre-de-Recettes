// recipesRoute.js
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
/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Get a list of all recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: d5fE_asz
 *                 title: Delicious Pasta
 *                 category: Italian
 *                 author: Chef John
 *                 origin: Italy
 *                 ingredients: ["Pasta", "Tomato Sauce", "Cheese"]
 *                 steps: ["Boil pasta", "Mix with sauce", "Sprinkle cheese"]
 *                 image: "https://example.com/delicious-pasta.jpg"
 *                 createdAt: "2024-01-19T12:34:56.789Z"
 *               - id: another_id
 *                 title: Tasty Salad
 *                 category: Salad
 *                 author: Chef Mary
 *                 origin: USA
 *                 ingredients: ["Lettuce", "Tomato", "Cucumber"]
 *                 steps: ["Chop vegetables", "Mix in bowl", "Add dressing"]
 *                 image: "https://example.com/tasty-salad.jpg"
 *                 createdAt: "2024-01-20T09:45:00.123Z"
 *       '500':
 *         description: Internal server error
 */

router.get("/",recipeController.recipe_index_get);

/**
 * @desc Get recipe by id
 * @route /api/recipes/:id
 * @method GET
 * @access public
 */
/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     description: Get details of a specific recipe by its ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: d5fE_asz
 *               title: Delicious Pasta
 *               category: Italian
 *               author: Chef John
 *               origin: Italy
 *               ingredients: ["Pasta", "Tomato Sauce", "Cheese"]
 *               steps: ["Boil pasta", "Mix with sauce", "Sprinkle cheese"]
 *               image: "https://example.com/delicious-pasta.jpg"
 *               createdAt: "2024-01-19T12:34:56.789Z"
 *       '404':
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Recipe not found"
 *       '500':
 *         description: Internal server error
 */
 router.get("/:id",recipeController.recipe_show_get);

/**
 * @desc post the recipe 
 * @route /api/recipes
 * @method POST
 * @access private (only admin) 
*/
/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     description: Create a new recipe (private, only for admins)
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               author:
 *                 type: string
 *               origin:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - category
 *               - author
 *               - origin
 *               - ingredients
 *               - steps
 *               - image
 *     responses:
 *       '201':
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: d5fE_asz
 *               title: New Recipe
 *               category: General
 *               author: Admin User
 *               origin: Unknown
 *               ingredients: ["Ingredient 1", "Ingredient 2"]
 *               steps: ["Step 1", "Step 2"]
 *               image: "https://example.com/new-recipe.jpg"
 *               createdAt: "2024-01-21T08:45:00.123Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Title is required"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Admin access required"
 *       '500':
 *         description: Internal server error
 */
  router.post("/",verifyTokenAndAdmin,recipeController.recipe_store_post)
  
/**
 * @desc Update a recipe 
 * @route /api/recipes/:id
 * @method PUT
 * @access private (only admin)
*/
/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     description: Update a recipe by its ID (private, only for admins)
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               author:
 *                 type: string
 *               origin:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - category
 *               - author
 *               - origin
 *               - ingredients
 *               - steps
 *               - image
 *     responses:
 *       '200':
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: d5fE_asz
 *               title: Updated Recipe
 *               category: Modified
 *               author: Admin User
 *               origin: Unknown
 *               ingredients: ["Modified Ingredient 1", "Modified Ingredient 2"]
 *               steps: ["Modified Step 1", "Modified Step 2"]
 *               image: "https://example.com/updated-recipe.jpg"
 *               createdAt: "2024-01-21T08:45:00.123Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Title is required"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Admin access required"
 *       '404':
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Recipe not found"
 *       '500':
 *         description: Internal server error
 */

  router.put("/:id",verifyTokenAndAdmin,recipeController.recipe_update_put)
  
/**
 * @desc Delete a recipe 
 * @route /api/recipes/:id
 * @method DELETE
 * @access private (only admin)
*/

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     description: Delete a recipe by its ID (private, only for admins)
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Recipe has been deleted successfully"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized: Admin access required"
 *       '404':
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Recipe not found"
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id",verifyTokenAndAdmin,recipeController.recipe_destroy_delete)

module.exports = router;


