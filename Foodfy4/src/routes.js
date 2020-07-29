const express = require("express");

const HomeController = require("./app/controllers/HomeController");
const RecipeController = require("./app/controllers/RecipeController");
const AdminRecipeController = require("./app/controllers/AdminRecipeController");

const routes = express.Router();

routes.get("/", HomeController.index);
routes.get("/about", HomeController.about);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:index", RecipeController.show);

routes.get("/admin/recipes", AdminRecipeController.index);
routes.get("/admin/recipes/create", AdminRecipeController.create);
routes.post("/admin/recipes", AdminRecipeController.post);
routes.get("/admin/recipes/:index", AdminRecipeController.show);
routes.get("/admin/recipes/:index/edit", AdminRecipeController.edit);
routes.put("/admin/recipes", AdminRecipeController.put);
routes.delete("/admin/recipes", AdminRecipeController.delete);

routes.get("/chefs", (req, res) => {
  return res.render("user/chefs");
});
routes.get("/admin/chefs", (req, res) => {
  return res.render("admin/chefs/index");
});
routes.get("/admin/chefs/create", (req, res) => {
  return res.render("admin/chefs/create");
});
routes.get("/admin/chefs/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = data.recipes[recipeIndex];

  return res.render("admin/recipes/show", { recipe });
});
routes.get("/admin/chefs/:index/edit", (req, res) => {
  const recipeIndex = req.params.index;
  const tIndex = Number(recipeIndex) - 1;
  const recipe = data.recipes[tIndex];

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/recipes/edit", { recipe });
});
routes.post("/admin/chefs", (req, res) => {
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
routes.put("/admin/chefs", (req, res) => {
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
routes.delete("/admin/chefs", (req, res) => {
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

routes.get("/results", (req, res) => {
  return res.render("user/results");
});

module.exports = routes;
