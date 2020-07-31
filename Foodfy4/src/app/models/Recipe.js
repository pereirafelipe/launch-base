const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`SELECT * FROM recipes ORDER BY created_at`);
  },
  find(id) {
    return db.query(`SELECT * FROM recipes WHERE id = $1`, [id]);
  },
  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      Number(data.author),
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
    ];

    return db.query(query, values);
  },
  search(filter) {
    const query = `
      SELECT * FROM recipes 
      WHERE recipes.title ILIKE '%${filter}%'
    `;

    return db.query(query);
  },
};
