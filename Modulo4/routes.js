const express = require("express");

const { create, show, update } = require("./teachers");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/teachers");
});

routes.get("/teachers", (req, res) => {
  return res.render("teachers/index");
});

routes.get("/teachers/create", (req, res) => {
  return res.render("teachers/create");
});

routes.post("/teachers", create);

routes.get("/teachers/:id", show);

routes.get("/teachers/:id/edit", update);

routes.get("/students", (req, res) => {
  return res.render("students");
});

module.exports = routes;
