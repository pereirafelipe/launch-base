const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`SELECT * FROM recipes ORDER BY created_at`);
  },
  find(id) {
    return db.query(`SELECT * FROM recipes WHERE id = $1`, [id]);
  },
};
