const data = require("../../data.json");

module.exports = {
  index(req, res) {
    return res.render("user/home", { recipes: data.recipes });
  },
  about(req, res) {
    return res.render("user/about");
  },
};
