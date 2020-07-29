const data = require("../../data.json");

module.exports = {
  index(req, res) {
    return res.render("user/recipes", { recipes: data.recipes });
  },
  show(req, res) {
    const recipeIndex = req.params.index;
    const recipe = data.recipes[recipeIndex];

    return res.render("user/detail", { recipe });
  },
};
