const { formatPrice } = require("../../lib/utils");

const Category = require("../models/Category");
const Product = require("../models/Product");
const { put } = require("../../routes");

module.exports = {
  create(req, res) {
    // Promises
    Category.all()
      .then((results) => {
        const categories = results.rows;

        return res.render("products/create.njk", { categories });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  async post(req, res) {
    // Async Await
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    }

    let results = await Product.create(req.body);
    const productId = results.rows[0];

    return res.redirect(`/products/${productId}`);
  },
  async edit(req, res) {
    let results = await Product.find(req.params.id);
    const product = results.rows[0];

    if (!product) return res.send("Product not found!");

    product.price = formatPrice(product.price);
    product.old_price = formatPrice(product.old_price);

    results = await Category.all();
    const categories = results.rows;

    return res.render("products/edit.njk", { product, categories });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    }

    req.body.price = req.body.price.replace(/\D/g, "");

    if (req.body.old_price != req.body.price) {
      const old_product = await Product.find(req.body.id);

      req.body.old_price = old_product.rows[0].price;
    }

    await Product.update(req.body);

    return res.redirect(`/products/${req.body.id}/edit`);
  },
};