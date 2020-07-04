const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, (err, results) => {
      if (err) {
        console.log(err);
        return res.send("Database Error");
      }

      callback(results.rows);
    });
  },
  create(data, callback) {
    let { avatar_url, name, birth, gender, services } = data;

    const query = `
    INSERT INTO instructors (
      avatar_url,
      name,
      birth,
      gender,
      services,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

    created_at = new Date(Date.now());

    const values = [avatar_url, name, birth, gender, services, created_at];

    db.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.send("Database Error");
      }

      callback(results.rows[0]);
    });
  },
};
