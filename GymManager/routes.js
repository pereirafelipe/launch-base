const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", (req, res) => {
  return res.render("instructors/index");
});

routes.get("/members", (req, res) => {
  return res.send("Members route is ok!");
});

routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});

routes.post("/instructors", (req, res) => {
  const keys = Object.keys(req.body);
  const { avatar_url, name, birth, gender, services } = req.body;

  keys.map((key) => {
    if (req.body[key] !== "") res.send("Please, fill all fields!");
  });

  return res.send("Data received!");
});

module.exports = routes;
