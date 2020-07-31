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

    if (!recipe) return res.send("Recipe not found!");

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
    const recipeId = results.rows[0].id;

    return res.redirect(`/admin/recipes/${recipeId}`);
  },
  async edit(req, res) {
    const { id } = req.params;

    let results = await Recipe.find(id);
    const recipe = results.rows[0];

    results = await Chef.all();
    const chefs = results.rows;

    return res.render("admin/recipes/edit", { recipe, chefs });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  async delete(req, res) {
    await Recipe.delete(req.body.id);

    return res.redirect(`/admin/recipes`);
  },
};
