const express = require("express");

const {
  index,
  create,
  show,
  showEdit,
  update,
  deleteUser,
} = require("./instructors");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", index);

routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});

routes.post("/instructors", create);

routes.get("/instructors/:id", show);

routes.get("/instructors/:id/edit", showEdit);

routes.put("/instructors", update);

routes.delete("/instructors", deleteUser);

routes.get("/members", (req, res) => {
  return res.send("Members route is ok!");
});

module.exports = routes;
