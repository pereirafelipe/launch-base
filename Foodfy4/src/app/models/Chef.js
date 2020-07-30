const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`SELECT * FROM chefs`);
  },
  find(id) {
    return db.query(`SELECT * FROM chefs WHERE id = $1`, [id]);
  },
};
