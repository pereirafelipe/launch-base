const express = require("express");

const routes = express.Router();

const recipes = require("./data");

// user routes
routes.get("/", (req, res) => {
  return res.render("home", { recipes });
});
routes.get("/about", (req, res) => {
  return res.render("about");
});
routes.get("/recipes", (req, res) => {
  return res.render("recipes", { recipes });
});
routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = recipes[recipeIndex];

  return res.render("detail", { recipe });
});

// admin routes
routes.get("/admin/recipes", (req, res) => {
  return res.render("admin/index", { recipes });
});
routes.get("/admin/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = recipes[recipeIndex];

  return res.render("admin/show", { recipe });
});

module.exports = routes;
