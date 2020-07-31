const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let results = await Chef.all();
    const chefs = results.rows;

    if (!chefs) return res.send("Recipes not found!");

    return res.render("admin/chefs/index", { chefs });
  },
  async show(req, res) {
    const { id } = req.params;

    let results = await Chef.find(id);
    const chef = results.rows[0];

    if (!chef) return res.send("Chef not found!");

    results = await Recipe.find(chef.id);
    const recipes = results.rows;

    return res.render("admin/chefs/show", { chef, recipes });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  post(req, res) {
    return res.redirect("/admin/recipes");
  },
  edit(req, res) {
    return res.render("admin/chefs/edit");
  },
  put(req, res) {
    return res.redirect(`/admin/chefs/${index}`);
  },
  delete(req, res) {
    return res.redirect(`/admin/recipes`);
  },
};
