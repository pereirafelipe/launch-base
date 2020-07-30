const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    const recipes = results.rows;

    if (!recipes) return res.send("Recipes not found!");

    return res.render("user/home", { recipes });
  },
  about(req, res) {
    return res.render("user/about");
  },
};
