const express = require("express");
const nunjucks = require("nunjucks");

const courses = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
});

server.get("/", (req, res) => {
  return res.render("about");
});

server.get("/courses", (req, res) => {
  return res.render("courses", { courses });
});

server.use(function (req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, () => {
  console.log("🚀 Server is running...");
});
