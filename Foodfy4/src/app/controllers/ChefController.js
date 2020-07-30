const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    let results = await Chef.all();
    const chefs = results.rows;

    return res.render("user/chefs", { chefs });
  },
};
