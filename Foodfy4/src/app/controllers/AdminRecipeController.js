const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    const recipes = results.rows;

    if (!recipes) return res.send("Recipes not found!");

    return res.render("admin/recipes/index", { recipes });
  },
  async show(req, res) {
    const { id } = req.params;

    let results = await Recipe.find(id);
    const recipe = results.rows[0];

    results = await Chef.find(recipe.chef_id);
    const chef = results.rows[0];

    return res.render("admin/recipes/show", { recipe, chef });
  },
  async create(req, res) {
    let results = await Chef.all();
    const chefs = results.rows;

    return res.render("admin/recipes/create", { chefs });
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0];

    return res.redirect(`/admin/recipes/${recipeId}`);
  },
  edit(req, res) {
    const recipeIndex = req.params.index;
    const tIndex = Number(recipeIndex) - 1;
    const recipe = data.recipes[tIndex];

    if (!recipe) return res.send("Recipe not found!");

    return res.render("admin/recipes/edit", { recipe });
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
      if (recipe.id == id) {
        index = foundIndex;
        return true;
      }
    });

    if (!foundRecipe) return res.send("Recipe not found!");

    const recipe = {
      ...foundRecipe,
      ...req.body,
      id: Number(req.body.id),
    };

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");

      return res.redirect(`/admin/recipes/${index}`);
    });
  },
  delete(req, res) {
    const { id } = req.body;

    const filteredRecipes = data.recipes.filter((recipe) => {
      return recipe.id != id;
    });

    data.recipes = filteredRecipes;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");

      return res.redirect(`/admin/recipes`);
    });
  },
};
