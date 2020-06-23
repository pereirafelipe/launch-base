const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", (req, res) => {
  return res.send("Instructor route is ok!");
});

routes.get("/members", (req, res) => {
  return res.send("Members route is ok!");
});

module.exports = routes;
