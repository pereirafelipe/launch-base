const express = require("express");
const fs = require("fs");

const data = require("./data.json");

const routes = express.Router();

const recipes = require("./data");

// user routes
routes.get("/", (req, res) => {
  return res.render("user/home", { recipes });
});
routes.get("/about", (req, res) => {
  return res.render("user/about");
});
routes.get("/recipes", (req, res) => {
  return res.render("user/recipes", { recipes });
});
routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = recipes[recipeIndex];

  return res.render("user/detail", { recipe });
});

// admin routes
routes.get("/admin/recipes", (req, res) => {
  return res.render("admin/index", { recipes });
});
routes.get("/admin/recipes/create", (req, res) => {
  return res.render("admin/create");
});
routes.get("/admin/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = recipes[recipeIndex];

  return res.render("admin/show", { recipe });
});
routes.post("/admin/recipes", (req, res) => {
  const keys = Object.keys(req.body);
  let {
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/admin/recipes");
  });
});

module.exports = routes;
