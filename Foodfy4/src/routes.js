const express = require("express");
const fs = require("fs");

const data = require("./data.json");

const routes = express.Router();

const recipes = require("./data");

// user routes
routes.get("/", (req, res) => {
  return res.render("user/home", { recipes: data.recipes });
});
routes.get("/about", (req, res) => {
  return res.render("user/about");
});
routes.get("/recipes", (req, res) => {
  return res.render("user/recipes", { recipes: data.recipes });
});
routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = data.recipes[recipeIndex];

  return res.render("user/detail", { recipe });
});
routes.get("/chefs", (req, res) => {
  return res.render("user/chefs");
});
routes.get("/results", (req, res) => {
  return res.render("user/results");
});

// admin routes

// recipes
routes.get("/admin/recipes", (req, res) => {
  return res.render("admin/recipes/index", { recipes: data.recipes });
});
routes.get("/admin/recipes/create", (req, res) => {
  return res.render("admin/recipes/create");
});
routes.get("/admin/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = data.recipes[recipeIndex];

  return res.render("admin/recipes/show", { recipe });
});
routes.get("/admin/recipes/:index/edit", (req, res) => {
  const recipeIndex = req.params.index;
  const tIndex = Number(recipeIndex) - 1;
  const recipe = data.recipes[tIndex];

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/recipes/edit", { recipe });
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
routes.put("/admin/recipes", (req, res) => {
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
});
routes.delete("/admin/recipes", (req, res) => {
  const { id } = req.body;

  const filteredRecipes = data.recipes.filter((recipe) => {
    return recipe.id != id;
  });

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/admin/recipes`);
  });
});

// chefs
routes.get("/admin/chefs", (req, res) => {
  return res.render("admin/chefs/index");
});
routes.get("/admin/chefs/create", (req, res) => {
  return res.render("admin/chefs/create");
});

module.exports = routes;