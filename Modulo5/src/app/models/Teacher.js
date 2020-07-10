const db = require("../../config/db");

module.exports = {
  all(callback) {
    const query = `
      SELECT * FROM teachers
    `;

    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  create(data, callback) {
    let { avatar_url, name, birth, schooling, type_class, services } = data;

    const query = `
    INSERT INTO teachers (
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

    created_at = new Date(Date.now());

    const values = [
      avatar_url,
      name,
      birth,
      schooling,
      type_class,
      services,
      created_at,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    let { avatar_url, name, birth, schooling, type_class, services, id } = data;

    const query = `
      UPDATE teachers SET
      avatar_url=($1),
      name=($2),
      birth_date=($3),
      education_level=($4),
      class_type=($5),
      subjects_taught=($6)
      WHERE id = $7
    `;

    const values = [
      avatar_url,
      name,
      birth,
      schooling,
      type_class,
      services,
      id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
};
