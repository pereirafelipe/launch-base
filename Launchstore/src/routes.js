const express = require("express");

const ProductController = require("./app/controllers/ProductController");
const multer = require("./app/middlewares/multer");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.render("layout.njk");
});

routes.get("/products/create", ProductController.create);
routes.get("/products/:id/edit", ProductController.edit);
routes.get("/products/:id", ProductController.show);

routes.post("/products", multer.array("photos", 6), ProductController.post);
routes.put("/products", multer.array("photos", 6), ProductController.put);
routes.delete("/products", ProductController.delete);

routes.get("/ads/create", (req, res) => {
  return res.redirect("/products/create");
});

module.exports = routes;
