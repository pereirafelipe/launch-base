module.exports = {
  index(req, res) {
    return res.render("admin/chefs/index");
  },
  show(req, res) {
    return res.render("admin/chefs/show");
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  post(req, res) {
    return res.redirect("/admin/recipes");
  },
  edit(req, res) {
    return res.render("admin/chefs/edit");
  },
  put(req, res) {
    return res.redirect(`/admin/chefs/${index}`);
  },
  delete(req, res) {
    return res.redirect(`/admin/recipes`);
  },
};
