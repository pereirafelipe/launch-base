const express = require("express");
const nunjucks = require("nunjucks");

const courses = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", (req, res) => {
  const about = {
    avatar: "logo",
    name: "Rocketseat",
    role: "Instituição educacional | RS",
    strong:
      "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
    description:
      "No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.",
    techs: ["NodeJS", "ReactJS", "React Native"],
    links: [
      {
        name: "Facebook",
        url: "http://fb.com/rocketseat",
      },
      {
        name: "Instagram",
        url: "http://instagram.com/rocketseat_oficial",
      },
      {
        name: "Twitter",
        url: "http://twitter.com/rocketseat",
      },
      {
        name: "Youtube",
        url: "http://youtube.com/rocketseat",
      },
    ],
  };

  return res.render("about", { about });
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
