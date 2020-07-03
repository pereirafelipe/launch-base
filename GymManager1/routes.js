const express = require("express");

const instructors = require("./controllers/instructors");

const members = require("./controllers/members");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", instructors.index);
routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});
routes.post("/instructors", instructors.create);
routes.get("/instructors/:id", instructors.show);
routes.get("/instructors/:id/edit", instructors.showEdit);
routes.put("/instructors", instructors.update);
routes.delete("/instructors", instructors.deleteUser);

routes.get("/members", members.index);
routes.get("/members/create", (req, res) => {
  return res.render("members/create");
});
routes.post("/members", members.create);
routes.get("/members/:id", members.show);
routes.get("/members/:id/edit", members.showEdit);
routes.put("/members", members.update);
routes.delete("/members", members.deleteUser);

module.exports = routes;
