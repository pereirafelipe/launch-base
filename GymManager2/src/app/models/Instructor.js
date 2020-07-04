const db = require("../../config/db");

module.exports = {
  all(callback) {
    const query = `
      SELECT instructors.*, count(members) AS total_students 
      FROM instructors 
      LEFT JOIN members ON (members.instructor_id = instructors.id)
      GROUP BY instructors.id
      ORDER BY total_students DESC
    `;
    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

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
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT * FROM instructors WHERE id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    let { avatar_url, name, birth, gender, services, id } = data;

    const query = `
      UPDATE instructors SET
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      services=($5)
      WHERE id = $6
    `;

    const values = [avatar_url, name, birth, gender, services, id];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
};
