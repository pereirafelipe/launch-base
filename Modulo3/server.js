const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

server.use(express.static("public"));

server.use((req, res) => {
  res.status(404).render("not-found");
});

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
});

server.get("/", (req, res) => {
  return res.render("about");
});

server.get("/courses", (req, res) => {
  return res.render("courses");
});

server.listen(5000, () => {
  console.log("🚀 Server is running...");
});
