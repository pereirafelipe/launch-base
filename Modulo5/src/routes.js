const express = require("express");

const teachers = require("./app/controllers/teachers");
const students = require("./controllers/students");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.redirect("/teachers");
});

routes.get("/teachers", teachers.index);
routes.get("/teachers/create", teachers.create);
routes.post("/teachers", teachers.post);
routes.get("/teachers/:id", teachers.show);
routes.get("/teachers/:id/edit", teachers.update);
routes.put("/teachers", teachers.put);
routes.delete("/teachers", teachers.delete);

routes.get("/students", students.index);
routes.get("/students/create", (req, res) => {
  return res.render("students/create");
});
routes.post("/students", students.create);
routes.get("/students/:id", students.show);
routes.get("/students/:id/edit", students.showEdit);
routes.put("/students", students.update);
routes.delete("/students", students.deleteUser);

module.exports = routes;
