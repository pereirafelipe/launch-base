const data = require("../../data.json");

module.exports = {
  index(req, res) {
    return res.render("user/chefs");
  },
};
