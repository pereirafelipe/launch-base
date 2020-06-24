const express = require("express");

const { create, show } = require("./instructors");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", (req, res) => {
  return res.render("instructors/index");
});

routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});

routes.post("/instructors", create);

routes.get("/instructors/:id", show);

routes.get("/members", (req, res) => {
  return res.send("Members route is ok!");
});

module.exports = routes;
